import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, location, weather, disasters } = await req.json();

    const systemPrompt = `
      Bạn là trợ lý dự báo thời tiết và thiên tai, trả lời ngắn gọn, dễ hiểu.
      Dữ liệu hiện tại:
      - Địa điểm: ${location || "Không xác định"}
      - Thời tiết: ${JSON.stringify(weather || {})}
      - Sự kiện thiên tai: ${JSON.stringify(disasters || [])}
    `;

    const response = await fetch(process.env.OPENROUTER_API_URL as string, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
        "X-Title": "Weather Disaster Chatbot",
      },
      body: JSON.stringify({
        model: "gryphe/mythomax-l2-13b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ message: "API Error", detail: errorText }, { status: 500 });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "Xin lỗi, tôi chưa thể trả lời.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error( error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
