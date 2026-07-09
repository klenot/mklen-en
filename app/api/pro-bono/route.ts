import { NextResponse } from "next/server";

const AREA_VALUES = [
  "ai",
  "applications",
  "business",
  "dev",
  "events",
  "marketing",
  "startup",
  "websites",
] as const;

type ProBonoPayload = {
  firstName: string;
  lastName: string;
  email: string;
  industry: string;
  helpWith: string;
  area: (typeof AREA_VALUES)[number];
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parsePayload(body: unknown): ProBonoPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;
  const firstName = typeof data.firstName === "string" ? data.firstName.trim() : "";
  const lastName = typeof data.lastName === "string" ? data.lastName.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const industry = typeof data.industry === "string" ? data.industry.trim() : "";
  const helpWith = typeof data.helpWith === "string" ? data.helpWith.trim() : "";
  const area = typeof data.area === "string" ? data.area.trim() : "";

  if (
    !firstName ||
    !lastName ||
    !email ||
    !industry ||
    !helpWith ||
    !AREA_VALUES.includes(area as (typeof AREA_VALUES)[number])
  ) {
    return null;
  }

  if (!isValidEmail(email)) return null;

  return {
    firstName,
    lastName,
    email,
    industry,
    helpWith,
    area: area as (typeof AREA_VALUES)[number],
  };
}

async function sendViaResend(payload: ProBonoPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.PRO_BONO_TO_EMAIL ?? "marek@mklenotic.com";
  const from = process.env.PRO_BONO_FROM_EMAIL ?? "Pro Bono <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Pro bono inquiry — ${payload.firstName} ${payload.lastName}`,
      text: [
        `Name: ${payload.firstName} ${payload.lastName}`,
        `Email: ${payload.email}`,
        `Industry: ${payload.industry}`,
        `Area: ${payload.area}`,
        "",
        "What they need help with:",
        payload.helpWith,
      ].join("\n"),
    }),
  });

  return response.ok;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = parsePayload(body);
  if (!payload) {
    return NextResponse.json({ error: "Please fill in all fields correctly." }, { status: 400 });
  }

  const sent = await sendViaResend(payload);

  if (!sent) {
    if (process.env.NODE_ENV === "development") {
      console.info("[pro-bono]", payload);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { error: "Form is temporarily unavailable. Please email marek@mklenotic.com." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
