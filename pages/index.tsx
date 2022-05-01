import type { NextPage } from 'next'
import Head from 'next/head'
import Canvas from '../components/canvas'


const Home: NextPage = () => {
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

     
    </div>
  )
}

export default Home
