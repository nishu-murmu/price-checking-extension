import { translate } from "@/utils/translations";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "./MultiSelect";

export const FormField = ({
  field,
  values,
  errors,
  touched,
  disabled,
  handleChange,
}: {
  field: FieldConfig;
  values: any;
  errors: any;
  touched: any;
  disabled: boolean;
  handleChange: (e: React.ChangeEvent<any>) => void;
}) => {
  const hasError = errors[field.name] && touched[field.name];
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<SelectItem[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<SelectItem[]>(
    []
  );
  const [activeLang, setActiveLang] = useState("en");

  const handleLangToggle = (lang: string) => {
    setActiveLang(lang);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (e.target.value) {
      setImagePreview(e.target.value);
    } else {
      setImagePreview(null);
    }
  };

  const handleSelectChange = (selectedOptions: SelectItem[]) => {
    //@ts-ignore
    const simulatedEvent = {
      target: {
        name: field.name,
        value: selectedOptions,
        type: "select-multiple",
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    handleChange(simulatedEvent);
    setSelectedCategories(selectedOptions);
  };

  const fetchCategories = async () => {
    try {
      const { englishCategories } = await chrome.storage.local.get([
        "englishCategories",
      ]);
      const categoryList = englishCategories;
      if (categoryList && Array.isArray(categoryList)) {
        const formattedCategories = categoryList.map(
          (item: any, index: number) => ({
            key: (item.id || index).toString(),
            label: item.name || item.toString(),
            ...(typeof item === "object" ? item : {}),
          })
        );
        setCategories(formattedCategories);
        if (values[field.name] && values[field.name].length > 0) {
          const preselectedCategories = formattedCategories.filter((cat) =>
            values[field.name].some(
              (selectedCat: any) =>
                (
                  selectedCat.key ||
                  selectedCat.id ||
                  selectedCat
                ).toString() === cat.key
            )
          );
          setSelectedCategories(preselectedCategories);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    if (field.type === "select") {
      fetchCategories();
    }
  }, [field.type, field.name, values]);

  useEffect(() => {
    if (field.type === "image" && values[field.name]) {
      setImagePreview(values[field.name]);
    }
  }, [field.type, values, field.name]);

  const renderMultilangField = () => (
    <div className="space-y-3">
      <div className="flex items-center mb-2">
        <button
          type="button"
          onClick={() => handleLangToggle("en")}
          className={`px-3 py-1 mr-2 rounded cursor-pointer  ${
            activeLang === "en" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => handleLangToggle("de")}
          className={`px-3 py-1 rounded  cursor-pointer ${
            activeLang === "de" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          DE
        </button>
      </div>
      <input
        type="text"
        name={`${field.name}[${activeLang}]`}
        value={values[field.name]?.[activeLang] || ""}
        disabled={disabled}
        style={{
          border: hasError ? "red 1px solid" : "black 1px solid",
        }}
        className={`w-full px-3 text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          disabled ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
        onChange={handleChange}
      />
    </div>
  );

  const renderMultilangTextarea = () => (
    <div className="space-y-3">
      <div className="flex items-center mb-2">
        <button
          type="button"
          className={`px-3 py-1 mr-2 rounded cursor-pointer ${
            activeLang === "en" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleLangToggle("en")}
        >
          EN
        </button>
        <button
          type="button"
          className={`px-3 py-1 rounded cursor-pointer ${
            activeLang === "de" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleLangToggle("de")}
        >
          DE
        </button>
      </div>
      <textarea
        name={`${field.name}[${activeLang}]`}
        value={values[field.name]?.[activeLang] || ""}
        disabled={disabled}
        rows={field.rows || 4}
        style={{
          border: hasError ? "red 1px solid" : "black 1px solid",
        }}
        className={`w-full px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          disabled ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
        onChange={handleChange}
      />
    </div>
  );

  // Helper function to format error messages
  const formatErrorMessage = (error: any) => {
    if (typeof error === "string") return error;
    if (error && typeof error === "object") {
      // If it's an object (like multilang errors), return first available error
      if (error.en) return error.en;
      if (error.de) return error.de;
      // If we have generic keys, try to join them
      return Object.values(error)
        .filter((v) => typeof v === "string")
        .join(", ");
    }
    return "Invalid input";
  };

  return (
    <div className="border border-black rounded-md shadow-sm p-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {translate(field.label)}{" "}
        {field.required && <span className="text-red-500">*</span>}
      </label>

      {field.type === "textarea" ? (
        <textarea
          name={field.name}
          value={values[field.name]}
          disabled={disabled}
          rows={field.rows || 4}
          style={{
            border: hasError ? "red 1px solid" : "black 1px solid",
          }}
          className={`w-full px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            disabled ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
          onChange={handleChange}
        />
      ) : field.type === "image" ? (
        <div className="space-y-3">
          <input
            type="text"
            name={field.name}
            value={values[field.name]}
            disabled={disabled}
            style={{
              border: hasError ? "red 1px solid" : "black 1px solid",
            }}
            className={`w-full px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              disabled ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
            onChange={handleImageChange}
            placeholder="Enter image URL"
          />

          {imagePreview && (
            <div className="mt-2">
              <div className="border border-gray-300 rounded-md p-2 bg-gray-50">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-40 max-w-full mx-auto"
                  onError={() => setImagePreview(null)}
                />
              </div>
            </div>
          )}
        </div>
      ) : field.type === "select" ? (
        <MultiSelect
          options={categories}
          value={selectedCategories}
          onChange={handleSelectChange}
          disabled={disabled}
        />
      ) : field.type === "multilang" ? (
        renderMultilangField()
      ) : field.type === "textarea_multilang" ? (
        renderMultilangTextarea()
      ) : (
        <input
          type="text"
          name={field.name}
          value={values[field.name]}
          disabled={disabled}
          style={{
            border: hasError ? "red 1px solid" : "black 1px solid",
          }}
          className={`w-full px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            disabled ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
          onChange={handleChange}
        />
      )}

      {hasError && (
        <p className="mt-1 text-sm text-red-600">
          {formatErrorMessage(errors[field.name])}
        </p>
      )}
    </div>
  );
};
