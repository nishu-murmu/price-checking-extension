export const fields: FieldConfig[] = [
  { name: "store", label: "store", required: true },
  { name: "title", label: "title", type: "multilang", required: true },
  { name: "slug", label: "slug", required: true },
  { name: "image", label: "image", type: "image", required: true },
  { name: "categories", label: "categories", type: "select", required: false },
  { name: "offerPrice", label: "offer_price", required: false },
  { name: "retailPrice", label: "retail_price", required: true },
  { name: "code", label: "code", required: false },
  { name: "link", label: "link", required: true },
  { name: "discount", label: "discount", type: "multilang", required: false },
  {
    name: "description",
    label: "description",
    type: "textarea_multilang",
    rows: 4,
    required: true,
  },
];

export const jsonSchemaFormat = {
  name: "deal_response",
  schema: {
    type: "object",
    properties: {
      title: {
        type: "object",
        properties: {
          en: { type: "string" },
          de: { type: "string" },
        },
        required: ["en", "de"],
        additionalProperties: false,
      },
      image: { type: "string" },
      slug: { type: "string" },
      store: { type: "string" },
      retail_price: { type: "number" },
      offer_price: { type: "number" },
      code: { type: "string" },
      link: { type: "string" },
      expiry_date: { type: "string" },
      discount: {
        type: "object",
        properties: {
          en: { type: "string" },
          de: { type: "string" },
        },
        required: ["en", "de"],
        additionalProperties: false,
      },
      categories: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            id: { type: "number" },
          },
          required: ["name", "id"],
          additionalProperties: false,
          items: { type: "number" },
        },
      },
      description: {
        type: "object",
        properties: {
          en: { type: "string" },
          de: { type: "string" },
        },
        required: ["en", "de"],
        additionalProperties: false,
      },
    },
    required: [
      "title",
      "image",
      "retail_price",
      "offer_price",
      "code",
      "link",
      "expiry_date",
      "discount",
      "categories",
      "description",
      "store",
      "slug",
    ],
    additionalProperties: false,
  },
  strict: true,
};
