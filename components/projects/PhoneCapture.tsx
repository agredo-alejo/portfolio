import Image from "next/image";

/** Hide the browser chrome at the capture's right edge without changing the website image. */
export default function PhoneCapture({
  src,
  alt,
  expanded = false,
}: {
  src: string;
  alt: string;
  expanded?: boolean;
}) {
  return (
    <span
      className={"phone-capture" + (expanded ? " expanded-phone-capture" : "")}
    >
      <Image
        src={src}
        alt={alt}
        width={390}
        height={844}
        sizes={expanded ? "45vh" : "(max-width: 680px) 24vw, 12vw"}
        unoptimized={expanded}
      />
    </span>
  );
}
