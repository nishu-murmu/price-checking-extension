import { useGlobalContext } from "@/context/GlobalContext";
import CloseModal from "../generic/CloseModal";
import ModalToggle from "../generic/ModalToggle";
import { PreviewModalForm } from "../generic/PreviewModalForm";

function PreviewModal() {
  const { togglePreviewModal, isMinimized } = useGlobalContext();
  if (!togglePreviewModal) return null;
  return (
    <>
      <ModalToggle />
      <CloseModal />
      {isMinimized ? (
        <div className="p-2 bg-white text-black rounded-lg shadow-xl w-full">
          <h2 className="text-xl font-bold text-gray-800 pl-8">
            Preview Details (Minimized)
          </h2>
        </div>
      ) : (
        <PreviewModalForm />
      )}
    </>
  );
}

export default PreviewModal;
