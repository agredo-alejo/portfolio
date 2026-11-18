import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";
import Canvas from "@/components/canvas";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import Projects from "@/components/projects/projects";
import Experiments from "@/components/experiments/experiments";
import Skills from "@/components/skills";
import Footer from "@/components/footer/footer";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const destination =
      window.location.hash.slice(1) ||
      (Array.isArray(router.query.index) ? router.query.index[0] : "");
    if (["projects", "experiments", "contact"].includes(destination))
      document
        .getElementById(destination)
        ?.scrollIntoView({ behavior: "instant" });
  }, [router.query.index]);
  const description =
    "Websites, software, and interactive experiments by Alejandro Agredo, a developer based in South Florida.";
  return (
    <>
      <Head>
        <title>Alejandro Agredo | Web Developer</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Alejandro Agredo" />
        <link rel="canonical" href="https://www.alejandroagredo.com/" />
        <link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48" href="/brand/favicon-electric-blue.ico" />
        <link rel="icon" type="image/svg+xml" sizes="any" href="/brand/alejandro-symbol-blue.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png" />
        <meta property="og:title" content="Alejandro Agredo | Web Developer" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.alejandroagredo.com/" />
      </Head>
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <Canvas />
      <div className="first-screen">
        <Navbar />
        <Header />
      </div>
      <main>
        <Projects />
        <Experiments />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [
    { params: { index: [] } },
    { params: { index: ["projects"] } },
    { params: { index: ["experiments"] } },
    { params: { index: ["contact"] } },
  ],
  fallback: false,
});
export const getStaticProps: GetStaticProps = () => ({ props: {} });
