export function BentoGrid({ className = "", children }) {
  return <div className={`bento-grid ${className}`}>{children}</div>;
}

export function BentoCard({ className = "", children }) {
  return <article className={`bento-card ${className}`}>{children}</article>;
}
