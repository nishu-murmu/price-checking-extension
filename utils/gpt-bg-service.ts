import OpenAI from "openai";

export async function getGPTResponse({
  options,
  sender,
  shouldStream,
}: {
  options: any;
  sender: any;
  shouldStream: boolean;
}) {
  try {
    const client = new OpenAI({
      apiKey: options?.apiKey,
    });

    const response = await client.chat.completions.create({
      model: config.gpt_model,
      messages: [
        {
          role: "system",
          content: options?.systemPrompt,
        },
        { role: "user", content: options?.userPrompt },
      ],
      store: true,
      ...(shouldStream ? { stream: true } : {}),
      response_format: {
        type: "json_schema",
        json_schema: jsonSchemaFormat,
      },
    });

    return JSON.parse(
      (response as OpenAI.Chat.Completions.ChatCompletion)?.choices?.[0].message
        ?.content || "{}"
    );
  } catch (error: any) {
    chrome.tabs.sendMessage(sender.tab.id, {
      type: "STREAM_ERROR",
      error: error.message,
    });
  }
}
