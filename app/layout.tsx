import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "../utils/providers/ReactQueryProvider";
import Head from "next/head";

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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
        <body className={montserrat.className}>
            <ReactQueryProvider>  
              <link rel="icon" href="/favicon.ico" sizes="any" />
              {children}
            </ReactQueryProvider>
        </body>
    </html>
  );
}
