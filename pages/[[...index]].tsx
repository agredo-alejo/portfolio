import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Canvas from "@/components/canvas";
import Header from "@/components/home/header";
import Projects from "@/components/home/projects";
import WebSection from "@/components/home/webSection";
import Skills from "@/components/home/skills";
import Footer from "@/components/home/footer";
import Navbar from "@/components/navbar/navbar";
import Solutions from "@/components/home/solutions/solutions";
import Experiments from "@/components/home/experiments/experiments";

function Home() {
   const description =
      "A web developer fascinated by problem-solving and creating interactive graphic interfaces";

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
         <Solutions />
         {/* <Projects /> */}
         <Experiments />
         {/* <WebSection  /> */}
         <Skills />
         <Footer />
      </div>
   );
}

export default Home;
