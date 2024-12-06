import { ProjectProvider } from '../context/ProjectContext'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MagicBricks Project Listing',
  description: 'Real estate projects across different cities',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProjectProvider>
          {children}
        </ProjectProvider>
      </body>
    </html>
  )
}
