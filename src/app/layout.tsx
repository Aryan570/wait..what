import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from './components/ui/toaster'
import { AuthProvider } from './Providers'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'WW - Wait..What',
  description: 'Great app to share your stories with others.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <Toaster/>
        <AuthProvider>{children}</AuthProvider>
        </body>
    </html>
  )
}
