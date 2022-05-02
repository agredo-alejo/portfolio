import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef } from 'react'
import Canvas from '../components/canvas'
import Footer from '../components/footer'
import Header from '../components/header'
import WebSection from '../components/webSection'


const Home: NextPage = () => {
  const scrollRef = useRef<HTMLElement>(null)
  const scroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <div>
      <Head>
        <title>Alejandro Agredo | Web Developer</title>
        <meta name="description" content="A web developer fascinated by problem-solving and creating interactive graphic interfaces" />
        <meta name="keywords" content="Portfolio, Web Developer, Tyescript, Node, Front-end, developer, React, NextJS, HTML, CSS, JavaScript" />
        <meta name="author" content="Alejandro Agredo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Canvas />

      <Header scroll={scroll} />
      <WebSection scrollRef={scrollRef} />

      <Footer />
    </div>
  )
}

export default Home
