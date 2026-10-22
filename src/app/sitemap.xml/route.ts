import { siteSitemap, urlsetXml, XML_HEADERS } from "@/lib/sitemaps";

export const revalidate = 3600;

export async function GET() {
  return new Response(urlsetXml(await siteSitemap()), { headers: XML_HEADERS });
}
