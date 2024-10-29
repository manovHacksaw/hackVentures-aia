import localFont from "next/font/local";
import "./globals.css";
import { HackVenturesProvider } from "@/context/HackVenturesContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Hack Ventures",
  description: "Redefining economic opportunities for builders with fellowships",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-800 dark:selection:text-blue-50`}
      >
        <HackVenturesProvider>
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
        </HackVenturesProvider>
        
      </body>
    </html>
  );
}