type RetryOptions = {
  retries?: number;
  delayMs?: number;
};

export async function withRetry<T>(
  fn: () => Promise<T>,
  { retries = 3, delayMs = 750 }: RetryOptions = {},
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * (attempt + 1)));
      }
    }
  }

  throw lastError;
}
