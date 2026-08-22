import Header from "../components/Header";
import Footer from "../components/Footer";
import { site } from "../content/site";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Computational Architecture`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — Computational Architecture`,
    description: site.description,
    type: "website",
    url: "/",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: `${site.name}, Computational Architecture` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Computational Architecture`,
    description: site.description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
