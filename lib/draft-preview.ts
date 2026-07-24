import { timingSafeEqual } from "crypto";

export function isValidDraftPreviewToken(token: string | undefined | null): boolean {
  const secret = process.env.DRAFT_PREVIEW_SECRET;
  if (!secret || !token) return false;

  try {
    const provided = Buffer.from(token);
    const expected = Buffer.from(secret);
    if (provided.length !== expected.length) return false;
    return timingSafeEqual(provided, expected);
  } catch {
    return false;
  }
}
