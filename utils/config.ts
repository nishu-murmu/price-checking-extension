export const config = {
  openai_key: import.meta.env.VITE_OPENAI_API_KEY as string,
  api_url: import.meta.env.VITE_API_URL as string,
  app_url: import.meta.env.VITE_APP_URL as string,
  openai_endpoint: import.meta.env.VITE_OPENAI_API_ENDPOINT as string,
  scrapper_button_ui_name: "sparissimo-scrapper-button",
  scrapper_button_ui_id: "sparissimo-scrapper-button",
  preview_modal_ui_name: "sparissimo-preview-modal",
  preview_modal_ui_id: "sparissimo-preview-modal",
  default_lang: "English",
  german_categories: "https://cb-api.sparissimo.world/public/categories/deal",
  english_categories:
    "https://cb-api.sparissimo.world/public/categories/deal?locale=en",
  deal_create_api_endpoint: "https://cb-api.sparissimo.world/ext/create-deal",
  all_stores_api_endpoint:
    "https://cb-api.sparissimo.world/public/exStores?all=1",
  gpt_model: "gpt-4o-mini",
  admin_panel_edit_link: (link: string) =>
    `https://cbadmin.sparissimo.world/manage/daily-deals/${link}/edit`,
};

export const ROUTES = {
  HOME: "/home",
  SETTINGS: "/settings",
  GENERATE: "/generate",
  REPHRASE: "/rephrase",
  NAVIGATION: "/navigation",
};
