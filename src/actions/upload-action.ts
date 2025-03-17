"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummary } from "@/lib/gemini-ai";

interface ServerFileData {
  userId: string;
  fileUrl: string;
  fileName: string;
}

interface PdfSummaryRequest {
  serverData: ServerFileData;
}

interface PdfSummaryResponse {
  success: boolean;
  message?: string;
  data?: string;
}

export async function generatePdfSummary(
  requests: PdfSummaryRequest[]
): Promise<PdfSummaryResponse> {
  if (!requests || requests.length === 0) {
    return {
      success: false,
      message: "No file upload data provided",
    };
  }

  const {
    serverData: { fileUrl },
  } = requests[0];

  try {
    const pdfText = await fetchAndExtractPdfText({ fileUrl });
    const summary = await generateSummary({ text: pdfText });

    return {
      success: true,
      message: "Generated PDF summary successfully!",
      data: summary,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message ?? "Failed to generate PDF summary!",
    };
  }
}
