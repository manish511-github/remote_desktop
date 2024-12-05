import type { Metadata } from "next";
import {Manrope} from "next/font/google";
import {ClerkProvider} from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "next-themes"
import { Providers } from './providers'

const manrope = Manrope({
  subsets:["latin"]
});

export const metadata: Metadata = {
  title: "Remote Desktop",
  description: "Screen sharing and control application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={manrope.className} suppressHydrationWarning>
          <Providers>
            <ThemeProvider 
              attribute="class" 
              defaultTheme="dark" 
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
