//@ts-nocheck
import OpenAI from "openai";
import { jsonSchemaFormat } from "src/utils/constants.js";

interface GetCompletionOptions {
  systemPrompt?: string;
  userPrompt?: string;
}

export async function getCompletion({
  options,
  shouldStream,
}: {
  options: GetCompletionOptions;
  shouldStream: boolean;
}): Promise<string | null> {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const _response = await client.chat.completions.create({
      model: "gpt-4o-mini",
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
    return (_response as OpenAI.Chat.Completions.ChatCompletion)?.choices?.[0]
      .message?.content;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
