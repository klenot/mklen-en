"use client";

import { useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";

export function useNavigatingLink(href: string) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (e?: { preventDefault: () => void }) => {
      e?.preventDefault();
      startTransition(() => {
        router.push(href);
      });
    },
    [href, router],
  );

  const prefetch = useCallback(() => {
    router.prefetch(href);
  }, [href, router]);

  return { isPending, navigate, prefetch };
}
