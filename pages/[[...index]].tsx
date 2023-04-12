import Head from "next/head";
import Canvas from "@/components/canvas";
import Header from "@/components/header/header";
import Skills from "@/components/skills";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import Solutions from "@/components/solutions/solutions";
import Experiments from "@/components/experiments/experiments";
import Projects from "@/components/projects/projects";

function Home() {
   const description =
      "My passion for web development is fueled by my love of problem-solving and the constant opportunity to learn and improve my skills.";

   return (
      <div className="flex flex-col items-center w-full h-full">
         <Head>
            <title> Alejandro Agredo | Web Developer </title>
            <meta name="description" content={description} />
            <meta
               name="keywords"
               content="Portfolio, Web Developer, Web, Developer, Tyescript, Node, Front-end, developer, React, NextJS, HTML, CSS, Alejandro Agredo, Alejandro, Agredo, JavaScript"
            />
            <meta itemProp="description" content={description} />
            <meta name="author" content="Alejandro Agredo" />
            <meta
               property="og:url"
               content="https://www.alejandroagredo.com/"
            />
            <meta
               property="og:title"
               content="Alejandro Agredo | Web Developer"
            />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <link rel="icon" href="/favicon.ico" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
         </Head>
         <Canvas />
         <Navbar />

         <Header />
         <Projects />
         <Experiments />
         <Skills />
         <Footer />
      </div>
   );
}

export default Home;
