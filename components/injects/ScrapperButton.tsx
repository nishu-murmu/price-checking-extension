import useStreamedCompletion from "@/hooks/use-stream-completion";
import Button from "../core/Button";
import { useGlobalContext } from "@/context/GlobalContext";

const ScrapperButton = () => {
  const { togglePreviewModal } = useGlobalContext();
  const { loading, getWithoutStreamResponse } = useStreamedCompletion();

  if (togglePreviewModal) {
    return null;
  }
  return (
    <div className="p-4 relative flex items-center justify-end">
      <Button
        onClick={() => generateDealCallback(getWithoutStreamResponse)}
        disabled={loading}
        className="w-1/2 "
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
          translate("generate_deal")
        )}
      </Button>
    </div>
  );
};

export default ScrapperButton;
