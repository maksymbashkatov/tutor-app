'use client';

import { SessionProvider } from "next-auth/react";
import Footer from "./footer";
import Header from "./header";

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="container">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  );
}