import Image from "next/image";
import React from "react";
import Modal from "@/utils/modal";
import { MockUpModalProps } from "./projectMockUps";

function DeskMockUpModal({
   handleClose,
   show,
   photoUrl,
   link,
}: MockUpModalProps) {
   return (
      <Modal handleClose={() => handleClose()} show={show}>
         {/* eslint-disable-next-line react/jsx-no-target-blank */}
         <a href={link} target="_blank">
            <span className="drop-shadow-[.1rem_.1rem_.1rem_#222] hover:scale-[1.01] aspect-[5/3] w-[90vmin]  flex">
               <Image
                  src={photoUrl}
                  alt="monitor preview"
                  priority
                  objectFit="contain"
                  layout="fill"
               />
            </span>
         </a>
      </Modal>
   );
}

export default DeskMockUpModal;
