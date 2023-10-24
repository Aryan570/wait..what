import './globals.css'
import type { Metadata } from 'next'
import { Pompiere } from 'next/font/google'
import { Toaster } from './components/ui/toaster'
import { AuthProvider } from './Providers'
const pompiere = Pompiere({ subsets: ['latin'],weight:['400'] })
export const metadata: Metadata = {
  title: 'WW - Wait..What',
  description: 'Great app for personalized notes keeping.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" className='dark'>
      <body className={pompiere.className}>
        <Toaster/>
        <AuthProvider>{children}</AuthProvider>
        </body>
    </html>
  )
}
