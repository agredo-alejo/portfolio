import {
   collection,
   DocumentData,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import React, { RefObject, useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";
import WebProject from "./webProject";

interface WebSectionProps {
   scrollRef: RefObject<HTMLElement>;
}

export interface WebProject extends DocumentData {
   desk: string;
   phone: string;
   link: string;
   github: string;
   title: string;
   techs: string[];
   show: boolean;
   id: string;
   position: number;
}

function WebSection({ scrollRef }: WebSectionProps) {
   const [webProjects, setWebProjects] = useState<WebProject[]>([]);
   useEffect(() => {
      const projectRef = collection(db, "web_projects");
      const q = query(
         projectRef,
         where("show", "==", true),
         orderBy("position")
      );

      const unSubscribe = onSnapshot(q, (snapshot) => {
         if (snapshot.empty) return console.log("No matching documents");
         const projects = snapshot.docs.map((doc) => doc.data() as WebProject);
         setWebProjects(projects);
      });

      return unSubscribe;
   }, []);
   return (
      <section
         ref={scrollRef}
         className="flex flex-col items-center pt-4 gap-y-12"
      >
         {webProjects.map((project) => (
            <WebProject key={project.id} project={project} />
         ))}
      </section>
   );
}

export default WebSection;
