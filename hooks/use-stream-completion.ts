import { useGlobalContext } from "@/context/GlobalContext";
import { useCallback } from "react";

const useStreamedCompletion = () => {
  const {
    error,
    loading,
    result,
    submitLoading,
    setError,
    setLoading,
    setResult,
    setSubmitLoading,
    setTogglePreviewModal,
  } = useGlobalContext();

  const getWithoutStreamResponse = useCallback((prompt: string) => {
    setLoading(true);
    setResult("");
    setError(null);
    chrome.runtime.sendMessage(
      {
        action: "FETCH_STREAMLESS_COMPLETION",
        payload: {
          prompt,
          shouldStream: false,
        },
      },
      (cbResponse) => {
        setResult(cbResponse);
        setTogglePreviewModal?.(true);
        setLoading(false);
        chrome.storage.local.set({
          currentDeal: cbResponse,
        });
      }
    );
  }, []);

  return {
    error,
    loading,
    submitLoading,
    result: result,
    setLoading,
    setSubmitLoading,
    getWithoutStreamResponse,
  };
};

export default useStreamedCompletion;
