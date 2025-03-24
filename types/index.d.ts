interface DealProps {
  store?: string;
  title?: string;
  slug?: string;
  image?: string;
  offerPrice?: string;
  retailPrice?: string;
  code?: string;
  link?: string;
  discount?: string;
  description?: string;
  categories?: Array<{ key: string; label: string }>;
}

interface FieldConfig {
  name: string;
  label: string;
  type?:
    | "text"
    | "textarea"
    | "image"
    | "select"
    | "multilang"
    | "textarea_multilang";
  rows?: number;
  required?: boolean;
}

interface SelectItem {
  key: string;
  label: string;
}

interface FormValues {
  systemPrompt: string;
  userPrompt: string;
  apiKey?: string;
  userToken: string;
}
