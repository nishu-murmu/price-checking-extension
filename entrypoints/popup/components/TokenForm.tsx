import Popup from "@/components/Popup";
import api from "@/utils/api-service";
import { translate } from "@/utils/translations";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

// Yup validation schema for Token Form
const tokenValidationSchema = Yup.object().shape({
  inputValue: Yup.string().required("This field is required."),
});

interface TokenFormProps {
  onSuccess: () => void;
}

function TokenForm({ onSuccess }: TokenFormProps) {
  // Handle Token Form Submission
  const handleTokenSubmit = async (values: { inputValue: string }) => {
    try {
      const response = await api
        .get("https://jsonplaceholder.typicode.com/posts/1")
        .then((r) => r.json());
      if (response) {
        // Save token to chrome storage
      }
    } catch (error) {
      console.error("🚀 ~ handleTokenSubmit ~ error:", error);
    }
  };

  return (
    <Formik
      initialValues={{ inputValue: "" }}
      validationSchema={tokenValidationSchema}
      onSubmit={handleTokenSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Popup
            title={translate("popup_title")}
            actions={[
              <button
                key="confirm"
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded disabled:bg-gray-400"
                disabled={!!errors.inputValue}
              >
                {translate("submit")}
              </button>,
            ]}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {translate("token_input_label")}
                </label>
                <Field
                  type="text"
                  name="inputValue"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.inputValue && touched.inputValue
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder={translate("token_input_placeholder")}
                />
                {errors.inputValue && touched.inputValue && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.inputValue}
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

export default TokenForm;
