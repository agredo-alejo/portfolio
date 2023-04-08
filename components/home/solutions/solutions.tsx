import React from "react";
import SolutionCard from "./solutionCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

const IconsSx = {
   fontSize: "3.5rem",
};
// drop-shadow-[0_0_0.1rem_gray]
function Solutions() {
   return (
      <div className="flex flex-col items-center  rounded-lg sm:items-start bg-black/20 justify-evenly drop-shadow sm:flex-row max-w-[90vw] sm:text-sm md:text-base  mb-8">
         <SolutionCard text="Crea una tienda virtual personalizada para tu negocio con mi ayuda. Juntos, podemos desarrollar una plataforma eficiente, fácil de usar y optimizada para aumentar tus ventas en línea. ¡Hablemos y empecemos a vender juntos!">
            <ShoppingCartIcon sx={IconsSx} />
         </SolutionCard>
         <SolutionCard
            text="Crea una presencia en línea que refleje tu imagen y llegue a una audiencia global. Con mi experiencia en diseño y desarrollo web, podemos crear un sitio web personalizado o un portafolio virtual que muestre tus habilidades y logros. Contáctame para conocer más.
"
         >
            <ImportantDevicesIcon sx={IconsSx} />
         </SolutionCard>
         <SolutionCard text="¿Tienes una idea para un proyecto en línea? Permíteme ayudarte a convertirla en una realidad. Con mi experiencia en desarrollo web y programación, podemos crear una solución en línea que satisfaga tus necesidades y cumpla con tus expectativas. ¡Hablemos y hagamos realidad tu proyecto en línea!">
            <TipsAndUpdatesIcon sx={IconsSx} />
         </SolutionCard>
      </div>
   );
}

export default Solutions;
