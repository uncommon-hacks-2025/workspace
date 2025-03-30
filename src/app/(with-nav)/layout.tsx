import Navbar from "@/components/layout/navbar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main>
     <SessionProvider>
          <Navbar />
        </SessionProvider>

        { children }
   </main>
    
  );
}
