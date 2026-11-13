// Default image for Article / WebPage schema when a page has no image of its
// own: the site's 1200x630 share card (public/og-default.png, a static copy of
// the home page Open Graph image). Google recommends an image on Article
// structured data; this keeps every Article node eligible.
export const DEFAULT_SCHEMA_IMAGE = {
  "@type": "ImageObject",
  url: "https://www.topweightloss.us/og-default.png",
  width: 1200,
  height: 630,
} as const;

export const DEFAULT_OG_IMAGE = {
  url: "https://www.topweightloss.us/og-default.png",
  width: 1200,
  height: 630,
  alt: "Top Weight Loss: independent comparisons of online GLP-1 weight loss providers",
};
