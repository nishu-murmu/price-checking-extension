import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  store: Yup.string().required("Store is required"),
  title: Yup.object()
    .shape({
      de: Yup.string().required("German title is required"),
      en: Yup.string().required("English title is required"),
    })
    .required("Title is required")
    .typeError("Title must be properly formatted with language values"),
  description: Yup.object()
    .shape({
      de: Yup.string().required("German description is required"),
      en: Yup.string().required("English description is required"),
    })
    .required("Description is required")
    .typeError("Description must be properly formatted with language values"),
  slug: Yup.string().required("Slug is required"),
  image: Yup.string().url("Invalid image URL").required("Image is required"),
  offerPrice: Yup.string(),
  retailPrice: Yup.string().required("Retail price is required"),
  discount: Yup.object()
    .shape({
      de: Yup.string().nullable(),
      en: Yup.string().nullable(),
    })
    .nullable()
    .default({})
    .typeError("Discount must be properly formatted with language values"),
  code: Yup.string().nullable(),
  link: Yup.string().url("Invalid link").required("Link is required"),
  categories: Yup.array().min(0, ""),
});

export const promptValidationSchema = Yup.object().shape({
  systemPrompt: Yup.string().required("System prompt is required."),
  userPrompt: Yup.string().required("User prompt is required."),
  apiKey: Yup.string(),
  userToken: Yup.string().required("User Token is required."),
});
