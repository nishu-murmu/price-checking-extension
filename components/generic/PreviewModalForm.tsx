import { useGlobalContext } from "@/context/GlobalContext";
import useStreamedCompletion from "@/hooks/use-stream-completion";
import { fields } from "@/utils/constants";
import { translate } from "@/utils/translations";
import { validationSchema } from "@/utils/validation-schemas";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { FormField } from "./FormField";

export const PreviewModalForm = () => {
  const {
    result,
    loading,
    submitLoading,
    setSubmitLoading,
    setTogglePreviewModal,
  } = useGlobalContext();
  const {
    store,
    title,
    slug,
    image,
    offer_price: offerPrice,
    retail_price: retailPrice,
    code,
    link,
    discount,
    description,
    categories,
  } = result;
  const { getWithoutStreamResponse } = useStreamedCompletion();

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setSubmitLoading(true);
    const currentStore = await getCurrentStore();
    const updatedDeal = {
      title: values.title,
      description: values.description,
      discount: values.discount || {},
      link: values.link || location.href,
      code: values.code,
      slug: values.slug,
      image: values.image,
      store: currentStore?.name,
      store_id: currentStore?.id,
      offer_price: values.offerPrice,
      retail_price: values.retailPrice,
      cats: values.categories.map((r: any) => r.id).map(Number),
    };
    const response = await insertDeal(updatedDeal);
    setSubmitLoading(false);
    const id = response?.data?.id;
    if (id) {
      resetForm();
      alert(`Deal created`);
      setTogglePreviewModal(false);
      window.open(`${config.admin_panel_edit_link(id)}`, "_blank");
      return;
    }
    if (response?.error && response?.msg && response?.msg !== "exception") {
      const errorMessage = Object.entries(response?.msg)
        .map((r) => r[1])
        .flat(Infinity)
        .join("");
      alert(errorMessage);
    }
    if (response?.msg === "exception") {
      alert(response?.data?.message);
    }
  };

  const initializeMultilangField = (value: any) => {
    if (!value) return { en: "", de: "" };
    if (typeof value === "object") return value;
    return { en: value, de: value };
  };

  const [initialValues, setInitialValues] = useState({
    store: store || "",
    title: initializeMultilangField(title),
    slug: slug || "",
    image: image || "",
    offerPrice: offerPrice || "",
    retailPrice: retailPrice || "",
    code: code || "",
    link: link || "",
    discount: initializeMultilangField(discount),
    description: initializeMultilangField(description),
    categories: categories || [],
  });

  useEffect(() => {
    setInitialValues({
      store: store || "",
      title: initializeMultilangField(title),
      slug: slug || "",
      image: image || "",
      offerPrice: offerPrice || "",
      retailPrice: retailPrice || "",
      code: code || "",
      link: link || "",
      discount: initializeMultilangField(discount),
      description: initializeMultilangField(description),
      categories: categories || [],
    });
  }, [
    store,
    title,
    slug,
    image,
    offerPrice,
    retailPrice,
    code,
    link,
    discount,
    description,
    categories,
  ]);

  return (
    <div className="p-6 bg-white text-black rounded-lg drop-shadow-2xl shadow-xl w-full max-w-2xl right-0 top-4 border border-black border-opacity-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {translate("preview_details")}
      </h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values }) => {
          return (
            <Form className="space-y-4">
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  values={values}
                  errors={errors}
                  touched={touched}
                  disabled={loading}
                  handleChange={handleChange}
                />
              ))}

              <div className="mt-6 flex gap-x-2">
                <button
                  type="button"
                  disabled={loading}
                  className={`w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    loading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={() => generateDealCallback(getWithoutStreamResponse)}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <img
                        src={chrome.runtime.getURL("images/dots.svg")}
                        alt="loading"
                        className="w-4 h-4"
                      />
                      {translate("generating")}
                    </span>
                  ) : (
                    translate("re_generate")
                  )}
                </button>
                <button
                  type="submit"
                  className={`w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    loading || submitLoading
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {translate("submit")}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
