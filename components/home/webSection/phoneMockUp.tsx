import Image from "next/image";
import React from "react";
import Modal from "@/utils/modal";
import { MockUpModalProps } from "./projectMockUps";

function PhoneMockUpModal({
   handleClose,
   show,
   photoUrl,
   link,
}: MockUpModalProps) {
   return (
      <Modal handleClose={() => handleClose()} show={show}>
         <a href={link} target="_blank">
            <span className="drop-shadow-[.1rem_.1rem_.1rem_#222] hover:scale-[1.01] flex aspect-[13/25] h-[70vmin]">
               <Image
                  src={photoUrl}
                  alt="mobile preview"
                  priority
                  fill
                  className="!relative"
               />
            </span>
         </a>
      </Modal>
   );
}

export default PhoneMockUpModal;
