import './globals.css'

export const metadata = {
  title: 'Blog de desarrollo de EliteasDev',
  description: 'Blog creado moviendo las manitas.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-slate-900 text-white max-w-3xl mx-auto py-20 px-4 '>
      <body>{children}</body>
    </html>
  )
}
