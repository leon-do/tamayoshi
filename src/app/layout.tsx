import type { Metadata } from "next";
import { Rubik_Mono_One} from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

const font = Rubik_Mono_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tamayoshi",
  description:
    "On Chain Click to Play Game",
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
