import type { ReactNode } from "react";
export default function ContactLink({
  link,
  label,
  children,
}: {
  link: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={link}
      target={link.startsWith("https:") || link.endsWith(".pdf") ? "_blank" : undefined}
      rel={link.startsWith("https:") || link.endsWith(".pdf") ? "noopener noreferrer" : undefined}
      className="icon-link"
      aria-label={label}
      title={label}
    >
      {children}
    </a>
  );
}
