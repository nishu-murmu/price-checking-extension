//@ts-nocheck
import PreviewModal from "@/components/injects/PreviewModal";
import ScrapperButton from "@/components/injects/ScrapperButton";
import GlobalContextProvider from "@/context/GlobalContext";
import { shadowUiWrapper } from "@/utils";
import "~/assets/tailwind.css";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const { apiKey } = await chrome.storage.local.get(["apiKey"]);
    const currentStore = await getCurrentStore();
    if (!apiKey || !currentStore) return;
    const scrapperButtonUi = await shadowUiWrapper({
      name: config.scrapper_button_ui_name,
      ctx,
      anchor: "body",
      position: "inline",
      component: (
        <GlobalContextProvider>
          <div className="relative h-full">
            <ScrapperButton />
            <PreviewModal />
          </div>
        </GlobalContextProvider>
      ),
    });
    scrapperButtonUi.uiContainer.id = config.scrapper_button_ui_id;
    Object.assign(scrapperButtonUi.uiContainer.style, {
      position: "fixed",
      top: "10px",
      right: "10px",
      maxHeight: "700px",
      width: "400px",
      overflowY: "scroll",
      zIndex: "999999999999",
    });
    scrapperButtonUi.mount();
  },
});
