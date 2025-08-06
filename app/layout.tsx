import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Nunito } from 'next/font/google'
import "./globals.css"

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: "Benevolus",
  description: "Created by Benevolus, a community-driven platform for sharing and discovering open-source projects.",
  generator: "Benevolus",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
  --font-nunito: ${nunito.variable};
}
        `}</style>
      </head>
      <body className={`${nunito.variable}`}>{children}</body>
    </html>
  )
}
