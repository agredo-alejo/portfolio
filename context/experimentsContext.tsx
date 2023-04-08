import React, { createContext, useContext, useState, useEffect } from "react";

interface ExperimentsContextProps {
   activeCategory: number;
   setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
   project: number;
   setProject: React.Dispatch<React.SetStateAction<number>>;
}

const ExperimentsContext = createContext<ExperimentsContextProps | null>(null);

export function useExperiments() {
   return useContext(
      ExperimentsContext as React.Context<ExperimentsContextProps>
   );
}

export function ExperimentsProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const [activeCategory, setActiveCategory] = useState(0);
   const [project, setProject] = useState(0);

   useEffect(() => {}, []);

   const value = {
      activeCategory,
      setActiveCategory,
      project,
      setProject,
   };

   return (
      <ExperimentsContext.Provider value={value}>
         {children}
      </ExperimentsContext.Provider>
   );
}
