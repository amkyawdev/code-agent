export async function GET() {
  return Response.json({
    gemini: process.env.GEMINI_API_KEY || '',
    deepseek: process.env.DEEPSEEK_API_KEY || '',
  });
}
