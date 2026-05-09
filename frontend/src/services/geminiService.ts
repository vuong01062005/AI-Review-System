import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: 'AIzaSyAHCUkgpSUsuLDLLelhoLLVe98f2TbY1m8' });

export interface AnalysisResult {
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  score: number;
  confidence: number;
  tags: string[];
  explanation: string;
}

export async function analyzeReview(content: string): Promise<AnalysisResult> {
  if (!content.trim()) {
    throw new Error("Nội dung không được để trống");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Phân tích đánh giá khách sạn sau đây về cảm xúc, điểm (0 đến 1), độ tin cậy (0 đến 1), và trích xuất các chủ đề/chủ đề chính.
    
    Nội dung đánh giá: "${content}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sentiment: {
            type: Type.STRING,
            enum: ["Positive", "Neutral", "Negative"],
            description: "Cảm xúc tổng thể của đánh giá."
          },
          score: {
            type: Type.NUMBER,
            description: "Điểm cảm xúc từ 0 (rất tiêu cực) đến 1 (rất tích cực)."
          },
          confidence: {
            type: Type.NUMBER,
            description: "Độ tin cậy của mô hình trong phân tích này từ 0 đến 1."
          },
          tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Từ khóa hoặc chủ đề trích xuất (ví dụ: 'Thức ăn', 'Phòng', 'Nhân viên')."
          },
          explanation: {
            type: Type.STRING,
            description: "Một giải thích ngắn gọn trong một câu về lý do chọn cảm xúc này."
          }
        },
        required: ["sentiment", "score", "confidence", "tags", "explanation"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("Failed to get response from Gemini");
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse Gemini response:", text);
    throw new Error("Invalid response format from Gemini");
  }
}
