import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};
