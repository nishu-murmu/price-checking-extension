import { getUserPrompt } from "@/utils/prompts";

const getCurrentTab = (
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void
) => {
  sendResponse(sender.tab);
};

const fetchStreamedCompletion = async (
  options: any,
  sender: chrome.runtime.MessageSender,
  shouldStream: boolean
) => {
  await getGPTResponse({ options, sender, shouldStream });
};

const fetchStreamlessCompletion = async (
  prompt: any,
  sender: chrome.runtime.MessageSender,
  shouldStream: boolean
) => {
  const { systemPrompt, userPrompt, apiKey } = await chrome.storage.local.get([
    "systemPrompt",
    "userPrompt",
    "apiKey",
  ]);

  const updatedUserPrompt = getUserPrompt({
    userPrompt: userPrompt,
    scrappedData: prompt,
  });

  const response = await getGPTResponse({
    options: {
      ...prompt,
      systemPrompt: systemPrompt || "",
      userPrompt: updatedUserPrompt,
      apiKey: apiKey || "",
    },
    sender,
    shouldStream,
  });

  return response;
};

// Main message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    try {
      switch (request.action) {
        case "GET_CURRENT_TAB":
          getCurrentTab(sender, sendResponse);
          break;

        case "FETCH_STREAMED_COMPLETION":
          await fetchStreamedCompletion(
            request.payload.options,
            sender,
            request.payload.shouldStream
          );
          sendResponse(true);
          break;

        case "FETCH_STREAMLESS_COMPLETION":
          const response = await fetchStreamlessCompletion(
            request.payload.prompt,
            sender,
            request.payload.shouldStream
          );
          sendResponse(response);
          break;

        default:
          console.warn(`Unknown action: ${request.action}`);
          break;
      }
    } catch (error) {
      console.error("Error in message listener:", error);
      sendResponse({
        error: "An error occurred while processing the request.",
      });
    }
  })();

  // Return true to indicate that the response will be sent asynchronously
  return true;
});
