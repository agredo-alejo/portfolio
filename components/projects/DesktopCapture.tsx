import Image from "next/image";

export default function DesktopCapture({
  src,
  alt,
  expanded = false,
}: {
  src: string;
  alt: string;
  expanded?: boolean;
}) {
  return (
    <span className={"desktop-capture" + (expanded ? " expanded-desktop-capture" : "")}>
      <Image
        src={src}
        alt={alt}
        width={1265}
        height={712}
        sizes={expanded ? "100vw" : "(max-width: 680px) 80vw, 43vw"}
        unoptimized={expanded}
      />
    </span>
  );
}
