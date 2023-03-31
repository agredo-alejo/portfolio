import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Canvas from "@/components/home/canvas";
import Header from "@/components/home/header";
import Projects from "@/components/home/projects";
import WebSection from "@/components/home/webSection";
import Skills from "@/components/home/skills";
import Footer from "@/components/home/footer";

const Home: NextPage = () => {
   const router = useRouter();

   useEffect(() => {
      const urlParams = Object.keys(router.query).length;
      if (urlParams === 0) return;

      router.replace("/");
   }, [router]);

   const scrollRef = useRef<HTMLElement>(null);
   const scroll = () => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   const description =
      "A web developer fascinated by problem-solving and creating interactive graphic interfaces";

   return (
      <div className="h-full">
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

         <Header scroll={scroll} />
         <Projects />
         <WebSection scrollRef={scrollRef} />
         <Skills />
         <Footer />
      </div>
   );
};

export default Home;
