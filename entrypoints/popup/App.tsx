import { ToastContainer } from "react-toastify";
import PromptForm from "./components/PromptForm";

function App() {
  return (
    <div className="p-4">
      <PromptForm />
      <ToastContainer newestOnTop position="top-right" />
    </div>
  );
}

export default App;
