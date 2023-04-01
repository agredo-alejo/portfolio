import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import DeskMockUpModal from "./deskMockUp";
import PhoneMockUpModal from "./phoneMockUp";

export interface MockUpModalProps {
   handleClose: () => void;
   show: boolean;
   photoUrl: string;
   link: string;
}

interface ProjectMockUpsProps {
   desk: string;
   phone: string;
   link: string;
}

function ProjectMockUps({ desk, phone, link }: ProjectMockUpsProps) {
   const [showDesk, setShowDesk] = useState(false);
   const [showPhone, setShowPhone] = useState(false);
   const [photoUrl, setPhotoUrl] = useState<string>(desk);

   const handleOpenModal = (
      otherState: boolean,
      setOtherState: Dispatch<SetStateAction<boolean>>,
      setState: Dispatch<SetStateAction<boolean>>
   ) => {
      if (otherState) {
         setOtherState(false);
      }
      setState(true);
   };
   const openDeskModal = () => {
      handleOpenModal(showPhone, setShowPhone, setShowDesk);
   };
   const openPhoneModal = () => {
      handleOpenModal(showDesk, setShowDesk, setShowPhone);
   };

   return (
      <>
         <DeskMockUpModal
            handleClose={() => {
               setShowDesk(false);
            }}
            show={showDesk}
            photoUrl={photoUrl}
            link={link}
         />

         <PhoneMockUpModal
            handleClose={() => {
               setShowPhone(false);
            }}
            show={showPhone}
            photoUrl={photoUrl}
            link={link}
         />
         <div className="relative pr-[3vw] mb-8 sm:mb-0 ">
            <span
               onClick={() => {
                  setPhotoUrl(desk);
                  openDeskModal();
               }}
               className="drop-shadow-[.1rem_.1rem_.1rem_#222] hover:scale-[1.01] w-[50vw] sm:w-[21vw] h-[30vw] sm:h-[13vw] flex relative"
            >
               <Image src={desk} alt="monitor preview" priority fill />
            </span>
            <span
               onClick={() => {
                  setPhotoUrl(phone);
                  openPhoneModal();
               }}
               className="drop-shadow-[.1rem_.1rem_.1rem_#222] hover:scale-[1.01] absolute  right-0 bottom-[-5vw] aspect-[13/25] w-[13vw] sm:w-[7vw]"
            >
               <Image
                  src={phone}
                  alt="mobile preview"
                  priority
                  fill
                  className="!relative"
               />
            </span>
         </div>
      </>
   );
}

export default ProjectMockUps;
