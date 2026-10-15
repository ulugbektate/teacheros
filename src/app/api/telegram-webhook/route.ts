import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = "8787909516:AAFpho1G-GYg1UW87lTIEjR1Ir0z6QjmN78";
const APP_URL = "https://teacher-os-beryl.vercel.app";

async function sendTelegramMessage(chatId: number | string, text: string, replyMarkup?: any) {
  try {
    const payload: any = {
      chat_id: chatId,
      text: text,
      parse_mode: "HTML",
      disable_web_page_preview: false,
    };
    if (replyMarkup) payload.reply_markup = replyMarkup;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("TG Send Error:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();

    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text.trim();
      const firstName = update.message.from?.first_name || "Ustoz";

      // /start command
      if (text.startsWith("/start")) {
        await sendTelegramMessage(
          chatId,
          `Salom, ${firstName} 👋\n\n` +
          `TeacherOS ta'limni osonlashtiradi:\n` +
          `⚡ <b>16:9 Interaktiv doska</b> — darsni jonli tushuntirish uchun\n` +
          `📚 <b>AI Darslik & Slaydlar</b> — 1 daqiqada tayyor\n` +
          `🎯 <b>Mashqlar & Testlar</b> — o'quvchilar darajasini oshirish uchun\n\n` +
          `Boshlash uchun ilovani oching 👇`,
          {
            inline_keyboard: [
              [
                {
                  text: "🚀 TeacherOS Ilovasini Ochish",
                  web_app: { url: `${APP_URL}` },
                },
              ],
              [
                {
                  text: "🎓 O'quvchilar uchun (Talaba)",
                  web_app: { url: `${APP_URL}?role=student` },
                },
              ],
            ],
          }
        );
        return NextResponse.json({ ok: true });
      }

      // Help / Any other message
      await sendTelegramMessage(
        chatId,
        `💡 <b>TeacherOS Buyruqlari:</b>\n\n` +
        `/start — Bosh menyu va ilovani ochish\n\n` +
        `Platformaga kirish uchun quyidagi tugmani bosing:`,
        {
          inline_keyboard: [
            [
              {
                text: "🚀 TeacherOS Ilovasini Ochish",
                web_app: { url: `${APP_URL}` },
              },
            ],
            [
              {
                text: "🎓 O'quvchilar uchun",
                web_app: { url: `${APP_URL}?role=student` },
              },
            ],
          ],
        }
      );
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "TeacherOS Webhook Active", bot: "TeacherOS_official_bot" });
}
