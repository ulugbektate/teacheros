import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_AUTH_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || "8787909516:AAFpho1G-GYg1UW87lTIEjR1Ir0z6QjmN78";
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
      const firstName = update.message.from?.first_name || "O'quvchi";

      // /start command
      if (text.startsWith("/start")) {
        await sendTelegramMessage(
          chatId,
          `👋 <b>Assalomu alaykum, ${firstName}!</b>\n\n` +
          `⚡ <b>TeacherOS 2.0</b> — ta'lim platformasiga xush kelibsiz!\n\n` +
          `Bu bot orqali platformaga <b>avtomatik, bir zumda</b> kiring va barcha imkoniyatlardan foydalaning:\n\n` +
          `🔹 <b>Ustozlar uchun:</b> 16:9 interaktiv AI doska, jonli slaydlar va mashqlar generatori.\n` +
          `🔹 <b>Talabalar uchun:</b> A1 va B1 darajadagi 1,290 ta grammatik savol, interaktiv darslar va xatolar ustida ishlash.\n\n` +
          `<i>Quyidagi tugmalardan birini bosing:</i>`,
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
                  text: "👨‍🏫 Ustoz Studiyasi (Cockpit)",
                  web_app: { url: `${APP_URL}?role=teacher` },
                },
                {
                  text: "🎓 Talaba Portali (Hub)",
                  web_app: { url: `${APP_URL}?role=student` },
                },
              ],
              [
                {
                  text: "📘 A1 Grammar Trainer (365 Qs)",
                  web_app: { url: `${APP_URL}/homework/A1/a1-grammar-mastery.html` },
                },
                {
                  text: "🚀 B1 Grammar Trainer (925 Qs)",
                  web_app: { url: `${APP_URL}/homework/B1/b1-grammar-mastery.html` },
                },
              ],
              [
                {
                  text: "🏆 Natijalarim & Reyting",
                  web_app: { url: `${APP_URL}/dashboard` },
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
                text: "👨‍🏫 Ustoz Rejimi",
                web_app: { url: `${APP_URL}?role=teacher` },
              },
              {
                text: "🎓 Talaba Rejimi",
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
