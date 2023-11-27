import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import React from "react"
import Head from "next/head"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>PetriLab · your dish scanner</title>        
        <meta name="description" content="Analyse your dishes everywhere at anytime with PetriLab." />
        <link rel="icon" href="/favicon.ico" />
        </Head>

    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    </>
  )
}