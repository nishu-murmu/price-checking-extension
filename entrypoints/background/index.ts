import "./on-message";
import "./on-install";
import "./on-startup";

export default defineBackground({
  type: "module",
  main() {
    chrome.action.onClicked.addListener(() => {
      chrome.runtime.openOptionsPage();
    });
  },
});
