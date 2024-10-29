import type { Metadata } from "next";
import { Afacad} from 'next/font/google';
import "./globals.css";

const afacad = Afacad({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "CPS file uploader",
  description: "CPS website user file uploading module",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={afacad.className}>
        {children}
      </body>
    </html>
  );
}
