import { useGlobalContext } from "@/context/GlobalContext";

const ModalToggle = () => {
  const { setIsMinimized, isMinimized } = useGlobalContext();

  const handleToggle = (minimized: any) => {
    setIsMinimized(!isMinimized);
    const previewModalElem = document
      .querySelector(`sparissimo-preview-modal`)
      ?.shadowRoot?.children?.[0].querySelector(`body`);
    if (previewModalElem) {
      if (minimized) {
        previewModalElem.style.height = "50px";
        previewModalElem.style.overflowY = "hidden";
      } else {
        previewModalElem.style.height = "700px";
        previewModalElem.style.overflowY = "scroll";
      }
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed z-[9999999999] cursor-pointer top-[20px] right-[60px] p-2 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
      aria-label={isMinimized ? "Maximize" : "Minimize"}
      title={isMinimized ? "Maximize" : "Minimize"}
      style={{ zIndex: 999999999 }}
    >
      {isMinimized ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
      )}
    </button>
  );
};

export default ModalToggle;
