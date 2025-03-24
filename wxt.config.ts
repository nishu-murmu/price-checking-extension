import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  runner: {
    disabled: true,
  },
  manifest: {
    name: "Price Checker",
    short_name: "Price Checker",
    description:
      "extension to scrape data from websites for you to check the prices of the deals and offers.",
    permissions: ["storage", "tabs", "activeTab", "scripting"],
    action: {
      default_icon: "icon/128.png",
    },
    web_accessible_resources: [
      {
        resources: ["icon/*.png", "images/*.png", "images/*.svg", "assets/*"],
        matches: ["<all_urls>"],
      },
    ],
    host_permissions: ["<all_urls>"],
  },
  outDir: "build",
  modules: ["@wxt-dev/module-react"],
});
