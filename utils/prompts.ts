export const systemPrompt =
  "You are an AI writing assistant that continues existing text based on context from prior text. Give more weight/priority to the later characters than the beginning ones.make sure to construct complete sentences.";

export function getUserPrompt({
  userPrompt,
  scrappedData,
}: {
  userPrompt: string;
  scrappedData: string;
}) {
  return `${userPrompt} 
  \n\n  
  Here is the scrapped md text:
  \n\n
  ${scrappedData}`;
}
