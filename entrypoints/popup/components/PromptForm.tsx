import Popup from "@/components/Popup";
import { translate } from "@/utils/translations";
import { Field, Form, Formik } from "formik";
import { promptValidationSchema } from "@/utils/validation-schemas";
import { useEffect, useState, useRef } from "react";

interface FormValues {
  systemPrompt: string;
  userPrompt: string;
  apiKey: string;
  userToken: string;
}

function PromptForm() {
  const [initialValues, setInitialValues] = useState<FormValues>({
    systemPrompt: "",
    userPrompt: "",
    apiKey: "",
    userToken: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { successMessage } = useToast();
  const formikRef = useRef(null);

  useEffect(() => {
    chrome.storage.local.get(
      ["systemPrompt", "userPrompt", "apiKey", "userToken"],
      (result) => {
        const values = {
          systemPrompt: result.systemPrompt || "",
          userPrompt: result.userPrompt || "",
          apiKey: result.apiKey || "",
          userToken: result.userToken || "",
        };
        setInitialValues(values);
        setIsLoading(false);
      }
    );
  }, []);

  const handlePromptSubmit = async (values: FormValues, { resetForm }: any) => {
    try {
      setIsLoading(true);
      await chrome.storage.local.set({
        systemPrompt: values.systemPrompt,
        userPrompt: values.userPrompt,
        apiKey: values?.apiKey || "",
        userToken: values.userToken,
      });
      setInitialValues(values);
      resetForm({ values });
      successMessage(translate("prompt_form_submitted"));
      setIsLoading(false);
    } catch (error) {
      console.error("🚀 ~ handlePromptSubmit ~ error:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={promptValidationSchema}
      onSubmit={handlePromptSubmit}
      enableReinitialize={true}
      innerRef={formikRef}
    >
      {({ errors, touched, values, dirty }) => (
        <Form className="">
          <Popup
            title={translate("prompt_form_title")}
            action={
              <div
                key="submit-container"
                className="flex justify-center w-full"
              >
                <button
                  key="confirm"
                  type="submit"
                  className={`px-5 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-lg font-medium disabled:bg-gray-400 ${
                    !!errors.systemPrompt ||
                    !!errors.userPrompt ||
                    !!errors.apiKey ||
                    isLoading ||
                    !dirty
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  disabled={
                    !!errors.systemPrompt ||
                    !!errors.userPrompt ||
                    !!errors.apiKey ||
                    isLoading ||
                    !dirty
                  }
                >
                  {translate("submit")}
                </button>
              </div>
            }
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  {translate("system_prompt_label")}
                </label>
                <Field
                  as="textarea"
                  name="systemPrompt"
                  rows={4}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.systemPrompt && touched.systemPrompt
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder={translate("system_prompt_placeholder")}
                />
                {errors.systemPrompt && touched.systemPrompt && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.systemPrompt}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  {translate("user_prompt_label")}
                </label>
                <Field
                  as="textarea"
                  name="userPrompt"
                  rows={14}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.userPrompt && touched.userPrompt
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder={translate("user_prompt_placeholder")}
                />
                {errors.userPrompt && touched.userPrompt && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.userPrompt}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  {translate("api_key_label")}
                </label>
                <Field
                  type="text"
                  name="apiKey"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.apiKey && touched.apiKey
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder={translate("api_key_placeholder")}
                />
                {errors.apiKey && touched.apiKey && (
                  <p className="mt-2 text-sm text-red-600">{errors.apiKey}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  {translate("user_token_label")}
                </label>
                <Field
                  type="text"
                  name="userToken"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.userToken && touched.userToken
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder={translate("user_token_placeholder")}
                />
                {errors.userToken && touched.userToken && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.userToken}
                  </p>
                )}
              </div>
            </div>
          </Popup>
        </Form>
      )}
    </Formik>
  );
}

export default PromptForm;
