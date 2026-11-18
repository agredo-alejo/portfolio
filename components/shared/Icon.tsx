import Image from "next/image";
export type IconName =
  | "email"
  | "linkedin"
  | "github"
  | "resume"
  | "external"
  | "close"
  | "play"
  | "pause"
  | "reset"
  | "down"
  | "phone";
export default function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <Image
      className={"ui-icon " + className}
      src={"/icons/" + name + ".svg"}
      width={24}
      height={24}
      alt=""
      aria-hidden="true"
      unoptimized
    />
  );
}
