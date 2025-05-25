import { NextResponse } from 'next/server';

/**
 * Utility function to format content for LLM consumption and respond appropriately
 * @param content - The markdown content to serve when llm=true
 * @param searchParams - The search params from the request
 * @param regularContent - The React component/content to serve for normal requests
 */
export function handleLLMFormat(
  content: string
) {
  // Check if the llm parameter is true
    // Return the content as plain text with markdown formatting
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
}