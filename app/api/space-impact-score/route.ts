import { NextResponse } from "next/server";

type ScorePayload = {
  email: string;
  score: number;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parsePayload(body: unknown): ScorePayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const score = typeof data.score === "number" ? data.score : Number(data.score);

  if (!email || !Number.isFinite(score) || score < 0) return null;
  if (!isValidEmail(email)) return null;

  return { email, score: Math.floor(score) };
}

async function sendViaResend(payload: ScorePayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.PRO_BONO_FROM_EMAIL ?? "Pro Bono <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: ["klenoticmarek@mklenotic.com"],
      reply_to: payload.email,
      subject: `${payload.email} just got ${payload.score} score in the space invaders`,
      text: `${payload.email} is bragging about their score on your website. Take a look!`,
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
    return NextResponse.json(
      { error: "Please enter a valid email and score." },
      { status: 400 },
    );
  }

  const sent = await sendViaResend(payload);

  if (!sent) {
    if (process.env.NODE_ENV === "development") {
      console.info("[space-impact-score]", payload);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      {
        error:
          "Could not send right now. Please email klenoticmarek@mklenotic.com.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
