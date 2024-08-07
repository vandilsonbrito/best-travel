import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "../../utils/providers/ReactQueryProvider";
import Head from "next/head";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best Travel",
  description: "The best travel for the best price.",
};

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${montserrat.className} bg-white`}>
          <NextIntlClientProvider messages={messages}>
            <ReactQueryProvider>
                  {children}
            </ReactQueryProvider>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
