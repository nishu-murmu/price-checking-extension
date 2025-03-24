import { useGlobalContext } from "@/context/GlobalContext";

const CloseModal = () => {
  const { setTogglePreviewModal } = useGlobalContext();
  return (
    <button
      onClick={() => setTogglePreviewModal(false)}
      className="fixed z-[9999999999] cursor-pointer top-[20px] right-[20px] p-2 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
      aria-label="Close"
      title="Close"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  );
};

export default CloseModal;
