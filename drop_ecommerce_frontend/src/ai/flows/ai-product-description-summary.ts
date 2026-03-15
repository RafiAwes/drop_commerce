'use server';
/**
 * @fileOverview This file provides an AI-powered tool to summarize product descriptions into concise bullet points.
 *
 * - aiProductDescriptionSummary - A function that generates a bullet-point summary of a product description.
 * - AiProductDescriptionSummaryInput - The input type for the aiProductDescriptionSummary function.
 * - AiProductDescriptionSummaryOutput - The return type for the aiProductDescriptionSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiProductDescriptionSummaryInputSchema = z.object({
  productDescription: z.string().describe('The detailed product description to be summarized.'),
});
export type AiProductDescriptionSummaryInput = z.infer<typeof AiProductDescriptionSummaryInputSchema>;

const AiProductDescriptionSummaryOutputSchema = z.object({
  summary: z.array(z.string()).describe('A concise bullet-point summary of the product description.'),
});
export type AiProductDescriptionSummaryOutput = z.infer<typeof AiProductDescriptionSummaryOutputSchema>;

const productDescriptionSummaryPrompt = ai.definePrompt({
  name: 'productDescriptionSummaryPrompt',
  input: { schema: AiProductDescriptionSummaryInputSchema },
  output: { schema: AiProductDescriptionSummaryOutputSchema },
  prompt: `You are an AI assistant specialized in summarizing product descriptions.
Please read the following product description carefully and extract the most important features and benefits.
Your task is to provide a concise summary in a bullet-point format. Each bullet point should be clear and highlight a key aspect of the product.

Product Description:
{{{productDescription}}}

Please provide the summary in a JSON array of strings. Example:
{
  "summary": [
    "Key feature 1",
    "Key benefit 2",
    "Important detail 3"
  ]
}`,
});

const aiProductDescriptionSummaryFlow = ai.defineFlow(
  {
    name: 'aiProductDescriptionSummaryFlow',
    inputSchema: AiProductDescriptionSummaryInputSchema,
    outputSchema: AiProductDescriptionSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await productDescriptionSummaryPrompt(input);
    return output!;
  }
);

export async function aiProductDescriptionSummary(input: AiProductDescriptionSummaryInput): Promise<AiProductDescriptionSummaryOutput> {
  return aiProductDescriptionSummaryFlow(input);
}
