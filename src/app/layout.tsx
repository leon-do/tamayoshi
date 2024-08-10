import type { Metadata } from "next";
import { Silkscreen } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

const font = Silkscreen({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tamayoshi",
  description: "On Chain Click to Play Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
