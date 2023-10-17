import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'trUNews',
  description: 'trUNews is a news site',
}

export default function Layout({
    children,
}: {
  children: React.ReactNode
}) {
  return <div className='max-w-full w-full h-screen'>
  {children}
  
  </div>
}