import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "../utils/providers/ReactQueryProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best Travel",
  description: "The best travel for the best price.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={montserrat.className}>
            <ReactQueryProvider>  
              <link rel="icon" href="/favicon.ico" sizes="any" />
              {children}
            </ReactQueryProvider>
        </body>
    </html>
  );
}
