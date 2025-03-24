import ReactDOM from "react-dom/client";
import { ClientSocket } from "./client-websocket";
export const shadowUiWrapper = ({
  ctx,
  name,
  position,
  anchor,
  component,
}: {
  ctx: any;
  name: string;
  position: "inline" | "overlay" | "modal";
  anchor: string;
  component: any;
}) => {
  return createShadowRootUi(ctx, {
    name,
    position,
    anchor,
    onMount: (container) => {
      const app = document.createElement("div");
      container.append(app);
      const root = ReactDOM.createRoot(app);
      root.render(component);
      return root;
    },
    onRemove: (root) => {
      root?.unmount();
    },
  });
};

export function returnCleanDocumentBody() {
  const clonedDocument = document.cloneNode(true);

  //@ts-ignore
  (clonedDocument as Document)
    .querySelectorAll("script, style, iframe, svg, link, noscript")
    .forEach((el) => el.remove());

  function removeComments(node: Node) {
    for (let i = node.childNodes.length - 1; i >= 0; i--) {
      let child = node.childNodes[i];
      if (child.nodeType === Node.COMMENT_NODE) {
        child.remove();
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        removeComments(child);
      }
    }
  }

  removeComments(clonedDocument);

  (clonedDocument as Document)?.body
    ?.querySelectorAll("*")
    .forEach((el: Element) => {
      el.removeAttribute("class");
      el.removeAttribute("style");
      el.removeAttribute("href");

      [...el.attributes].forEach((attr) => {
        if (attr.name.startsWith("data-")) {
          el.removeAttribute(attr.name);
        }
      });
    });

  return (clonedDocument as Document)?.body.outerHTML
    .replace(/\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export const generateDealCallback = (getWithoutStreamResponse: any) => {
  const cleanBody = returnCleanDocumentBody();
  const response = getMarkdownFromHtml(cleanBody);
  getWithoutStreamResponse(response);
};

export const ws = new ClientSocket(config.websocket_url);
