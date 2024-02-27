import "~/styles/globals.css";

import { Bree_Serif  as FontSerif,} from "next/font/google";
import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";
import Header from "../components/header";

export const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: "400",

});
export const metadata = {
  title: "Anyone App",
  description: "Generated by Greg anyone app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          "bg-background min-h-svh  antialiased",
          fontSerif.className,
        )}
      >
        <TRPCReactProvider>
          <Header />
          <main className="mt-2 pt-16">{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
