import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  runner: {
    disabled: true,
  },
  manifest: {
    name: "Sparissimo editor scrapper",
    short_name: "Sparissimo editor scrapper",
    description: "extension to scrape data from websites.",
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
