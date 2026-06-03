import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Charenton Tennis de Table",
    template: "%s | Charenton TT",
  },
  description:
    "Site officiel du club de tennis de table de Charenton-le-Pont. Fondé en 1953, le club propose des activités pour tous les niveaux, de l'initiation à la compétition.",
  keywords: ["tennis de table", "ping pong", "Charenton", "club", "sport"],
  openGraph: {
    title: "Charenton Tennis de Table",
    description: "Club de tennis de table de Charenton-le-Pont depuis 1953",
    url: "https://www.charenton-tt.org",
    siteName: "Charenton Tennis de Table",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="font-sans antialiased bg-[#f8fafc] text-slate-900 min-h-screen flex flex-col">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              background: "#1a365d",
              color: "#fff",
              fontSize: "14px",
            },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
