import { storeCategories } from "@/utils";

chrome.runtime.onInstalled.addListener(async () => {
  storeCategories();
});
