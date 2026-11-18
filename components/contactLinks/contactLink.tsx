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
      target="_blank"
      rel="noopener noreferrer"
      className="icon-link"
      aria-label={label}
      title={label}
    >
      {children}
    </a>
  );
}
