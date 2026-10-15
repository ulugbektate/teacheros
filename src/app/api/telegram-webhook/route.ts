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
          `⚡ <b>TeacherOS 2.0</b> interaktiv ta'lim platformasiga xush kelibsiz!\n\n` +
          `Quyidagi tugmalar orqali platformani to'g'ridan-to'g'ri Telegram ichida ochishingiz yoki testlarni yechishingiz mumkin:`,
          {
            inline_keyboard: [
              [
                {
                  text: "🚀 TeacherOS Platformasini Ochish",
                  web_app: { url: `${APP_URL}` },
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
                  text: "🏆 Natijalar & Reyting",
                  web_app: { url: `${APP_URL}/dashboard` },
                },
              ],
            ],
          }
        );
        return NextResponse.json({ ok: true });
      }

      // Help / Info
      await sendTelegramMessage(
        chatId,
        `💡 <b>TeacherOS Buyruqlari:</b>\n\n` +
        `/start — Platformani ochish va asosiy menyu\n` +
        `Quyidagi tugmani bosib istalgan vaqt platformaga kirishingiz mumkin:`,
        {
          inline_keyboard: [
            [
              {
                text: "🚀 TeacherOS Ochish",
                web_app: { url: `${APP_URL}` },
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
