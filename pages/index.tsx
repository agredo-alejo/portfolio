import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef } from 'react'
import Canvas from '../components/canvas'
import Footer from '../components/footer'
import Header from '../components/header'
import Projects from '../components/projects'
import Skills from '../components/skills'
import WebSection from '../components/webSection'


const Home: NextPage = () => {
  const scrollRef = useRef<HTMLElement>(null)
  const scroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const title = "Alejandro Agredo | Web Developer"
  const description = "A web developer fascinated by problem-solving and creating interactive graphic interfaces"
  const keywords = "Portfolio, Web Developer, Web, Developer, Tyescript, Node, Front-end, developer, React, NextJS, HTML, CSS, Alejandro Agredo, Alejandro, Agredo, JavaScript"
  return (
    <div className='h-full'>
      <Head>
        <title> {title} </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta itemProp='description' content={description} />
        <meta name="author" content="Alejandro Agredo" />
        <meta property='og:url' content="https://www.alejandroagredo.com/" />
        <meta property="og:title" content={title} />
        <meta property='og:description' content={description} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Canvas />

      <Header scroll={scroll} />
      <Projects />
      <WebSection scrollRef={scrollRef} />
      <Skills />
      <Footer />
    </div>
  )
}

export default Home
