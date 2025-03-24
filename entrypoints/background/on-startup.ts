import { storeCategories } from "@/utils";

chrome.runtime.onStartup.addListener(async () => {
  storeCategories();
});
