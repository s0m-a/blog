import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { Toaster } from 'react-hot-toast';



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const archivo = Archivo({
  subsets: ['latin'],
  weight: '700', // Bold = 700
})



export const metadata = {
  title: "Blolicious",
  description: "food blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link
      rel="icon"
      href="/icon?<generated>"
      type="image/<generated>"
      sizes="<generated>"
   />
   <link
    rel="apple-touch-icon"
     href="/apple-icon?<generated>"
     type="image/<generated>"
    sizes="<generated>"
    />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
        />
    </head>
      <body
      style={{backgroundColor: '#f7f2df'}}
        className={`${geistSans.variable} ${geistMono.variable} ${archivo.className} antialiased text-gray-600 bg-white`}>
        <Toaster />
         <Navbar />
         
        {children}
       
      </body>
    </html>
  );
}
