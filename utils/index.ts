import ReactDOM from "react-dom/client";
import api from "./api-service";
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

export function showPreviewModal() {
  //@ts-ignore
  const previewModalElem = document
    .querySelector(`sparissimo-preview-modal`)!
    .shadowRoot?.children?.[0].querySelector(`body`);
  const scrapperButton = document
    .querySelector(`sparissimo-scrapper-button`)!
    .shadowRoot?.children?.[0].querySelector(`body`);
  if (previewModalElem && scrapperButton) {
    //@ts-ignore
    previewModalElem.style.display = "block";
    scrapperButton.style.display = "none";
  }
  //@ts-ignore
  if ((previewModalElem.style.height = "40px")) {
    //@ts-ignore
    previewModalElem.style.height = "700px";
    //@ts-ignore
    previewModalElem.style.overflowY = "scroll";
  }
}

export function hidePreviewModal() {
  //@ts-ignore
  const previewModalElem = document
    .querySelector(`sparissimo-preview-modal`)!
    .shadowRoot?.children?.[0].querySelector(`body`);
  const scrapperButton = document
    .querySelector(`sparissimo-scrapper-button`)!
    .shadowRoot?.children?.[0].querySelector(`body`);
  if (previewModalElem && scrapperButton) {
    //@ts-ignore
    previewModalElem.style.display = "none";
    scrapperButton.style.display = "block";
  }
}

export function togglePreviewModal(minimize = false) {
  //@ts-ignore
  const previewModalElem = document
    .querySelector(`sparissimo-preview-modal`)!
    .shadowRoot?.children?.[0].querySelector(`body`);
  if (previewModalElem) {
    if (minimize) {
      previewModalElem.style.height = "40px";
      previewModalElem.style.overflowY = "hidden";
    } else {
      previewModalElem.style.height = "700px";
      previewModalElem.style.overflowY = "scroll";
    }
  }
}

export const generateDealCallback = (getWithoutStreamResponse: any) => {
  const cleanBody = returnCleanDocumentBody();
  const response = getMarkdownFromHtml(cleanBody);
  getWithoutStreamResponse(response);
};

export const storeCategories = async () => {
  const { germanCategories, englishCategories } =
    await chrome.storage.local.get(["germanCategories", "englishCategories"]);
  if (germanCategories && englishCategories) return;

  const [_germanCategories, _englishCategories, stores] = await Promise.all([
    fetch(config.german_categories).then((res) => res.json()),
    fetch(config.english_categories).then((res) => res.json()),
    fetch(config.all_stores_api_endpoint).then((res) => res.json()),
  ]);
  chrome.storage.local.set({
    germanCategories: _germanCategories?.data || [],
    englishCategories: _englishCategories?.data || [],
    stores: Object.entries(stores.data) || [],
  });
};

export const insertDeal = async (deal: DealProps) => {
  const { userToken } = await chrome.storage.local.get("userToken");

  const response = await api.post(
    config.deal_create_api_endpoint,
    deal,
    userToken
      ? {
          Authorization: `Bearer ${userToken}`,
        }
      : {}
  );
  return response;
};

export const getCurrentStore = async () => {
  const { stores } = await chrome.storage.local.get("stores");
  const currentDomain = new URL(location.href).hostname
    .replace("www.", "")
    .replace("https://www.", "");
  const currentStore = stores.find((r: any) => r[0] === currentDomain);
  return currentStore?.[1];
};
