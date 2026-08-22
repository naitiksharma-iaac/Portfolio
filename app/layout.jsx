import Header from "../components/Header";
import Footer from "../components/Footer";
import { site } from "../content/site";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
    title: {
      default: `${site.name} — Computational Architecture`,
      template: `%s — ${site.name}`,
    },
    description: site.description,
    openGraph: {
      title: `${site.name} — Computational Architecture`,
      description: site.description,
      type: "website",
      images: [{ url: imageUrl, width: 1536, height: 1024, alt: `${site.name}, Computational Architecture` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — Computational Architecture`,
      description: site.description,
      images: [imageUrl],
    },
  };
}

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
