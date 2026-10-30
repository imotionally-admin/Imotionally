import { Nunito, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/context/ToastContext";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Imotionally | Personalized Storybooks",
    template: "%s | Imotionally",
  },
  description:
    "Beautifully crafted, deeply personalized storybooks for every age. Celebrate birthdays, milestones and the relationships that matter.",
  openGraph: {
    type: "website",
    siteName: "Imotionally",
    locale: "en_IN",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#cdb8f0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${nunito.variable}`}>
      <body>
  <a href="#main" className="skip-link">
    Skip to content
  </a>
  <ToastProvider>
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </ToastProvider>
</body>
    </html>
  );
}