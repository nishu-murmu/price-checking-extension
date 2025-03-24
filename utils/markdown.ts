//@ts-ignore
import Turndown from "turndown";

export function getMarkdownFromHtml(html: string) {
  const turndownService = new Turndown();
  const htmlString = html;
  const markdown = turndownService.turndown(htmlString);
  return markdown + `\n\nHere the website href link: ${location.href}`;
}
