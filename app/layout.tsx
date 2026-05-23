import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anjaniya Gram Portal",
  description: "अंजनिया गांव के लिए शिकायत और समुदाय पोर्टल"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

