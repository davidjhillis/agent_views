import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShowPilot - LiveAvatar Demo',
  description: 'Interactive demo showcasing ShowPilot AI agent with HeyGen LiveAvatar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
