import type { Metadata } from 'next'
import { Inter , Space_Grotesk } from 'next/font/google'
import './globals.css' 
import Navbar from "../components/Navbar"

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({subsets:["latin"] , weight: ["300" , "400","500","600","700"]})
export const metadata: Metadata = {
  title: 'Amazon WatchDog',
  description: 'Track prices of products on Amazon effortlessly. ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><main className = "max-w-10xl mx-auto"><Navbar />{children}</main></body>
    </html>
  )
}
