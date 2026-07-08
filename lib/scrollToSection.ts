export function getRevealHeight(firstPanel: HTMLElement): number {
  const spacer = firstPanel.nextElementSibling;
  if (spacer instanceof HTMLElement && spacer.hasAttribute("aria-hidden")) {
    return spacer.offsetHeight;
  }
  return firstPanel.offsetHeight;
}

export function getOffsetWithinAncestor(
  target: HTMLElement,
  ancestor: HTMLElement,
): number {
  let node: HTMLElement | null = target;
  let offset = 0;

  while (node && node !== ancestor) {
    offset += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
    if (node === null) break;
  }

  if (node === ancestor) return offset;

  return (
    target.getBoundingClientRect().top - ancestor.getBoundingClientRect().top
  );
}

export function getDocumentTop(element: HTMLElement): number {
  return element.getBoundingClientRect().top + window.scrollY;
}

export type ScrollTargetInput = {
  targetInFirstPanel: boolean;
  revealHeight: number;
  offsetInAncestor: number;
  fallbackDocTop: number;
  hasScrollDrivenSticky: boolean;
  offsetInPanel: number;
};

export function computeScrollTarget({
  targetInFirstPanel,
  revealHeight,
  offsetInAncestor,
  fallbackDocTop,
  hasScrollDrivenSticky,
  offsetInPanel,
}: ScrollTargetInput): number {
  if (targetInFirstPanel) {
    if (hasScrollDrivenSticky) {
      return revealHeight + offsetInPanel;
    }
    return fallbackDocTop;
  }

  return revealHeight + offsetInAncestor;
}

export function scrollToSection(id: string): void {
  if (id === "contact") {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  const firstPanel = document.getElementById("1st-panel");
  const fallbackDocTop = getDocumentTop(target);

  if (!firstPanel) {
    window.scrollTo({ top: fallbackDocTop, behavior: "smooth" });
    return;
  }

  const revealHeight = getRevealHeight(firstPanel);
  const targetInFirstPanel = firstPanel.contains(target);
  const stickyParent = target.closest<HTMLElement>('[class*="sticky"]');
  const hasScrollDrivenSticky = Boolean(
    stickyParent && target.contains(stickyParent),
  );
  const offsetInPanel =
    stickyParent && hasScrollDrivenSticky
      ? getOffsetWithinAncestor(target, stickyParent)
      : 0;
  const offsetInAncestor = stickyParent
    ? getOffsetWithinAncestor(target, stickyParent)
    : 0;

  const top = computeScrollTarget({
    targetInFirstPanel,
    revealHeight,
    offsetInAncestor,
    fallbackDocTop,
    hasScrollDrivenSticky,
    offsetInPanel,
  });

  window.scrollTo({ top, behavior: "smooth" });
}
