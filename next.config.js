const nextConfig = {
  // Creates a completely static `out` folder for Hostinger public_html.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
