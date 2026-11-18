import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ProjectPreview } from "./model";
import Icon from "../shared/Icon";
export default function ImageDialog({
  preview,
  onClose,
}: {
  preview: ProjectPreview | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !preview) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [preview]);
  return (
    <dialog
      className="image-dialog"
      ref={ref}
      aria-labelledby="image-dialog-title"
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {preview && (
        <div className="image-dialog-content">
          <div className="image-dialog-toolbar">
            <h2 id="image-dialog-title">
              {preview.title}{" "}
              <span>· {preview.device === "phone" ? "Phone" : "Desktop"}</span>
            </h2>
            <button
              className="icon-button"
              type="button"
              onClick={onClose}
              aria-label="Close image"
            >
              <Icon name="close" />
            </button>
          </div>
          <Image
            className={"expanded-project-image expanded-" + preview.device}
            src={preview.image}
            alt={preview.title + " " + preview.device + " website capture"}
            width={preview.device === "phone" ? 390 : 1280}
            height={preview.device === "phone" ? 844 : 800}
            unoptimized
          />
        </div>
      )}
    </dialog>
  );
}
