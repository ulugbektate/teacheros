import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.BOT_TOKEN || "8979510433:AAGd4TEZb_rx4b8lZrFFfJfAz-dAI2ZRzMw";

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

      // /start deep link
      if (text.startsWith("/start")) {
        const parts = text.split(" ");
        if (parts.length > 1) {
          const roomKey = parts[1].replace(/_/g, "-");
          await sendTelegramMessage(
            chatId,
            `👋 <b>Assalomu alaykum, ${firstName}!</b>\n\nSiz <code>${roomKey}</code> sinfiga taklif qilindingiz!\n\nDars va vazifalaringizni hoziroq boshlash uchun quyidagi tugmani bosing:`,
            {
              inline_keyboard: [
                [
                  {
                    text: "🚀 Darslik & Vazifani Ochish",
                    url: `https://teacheros-0l68.onrender.com/index.html#class=${roomKey}&role=student`,
                  },
                ],
              ],
            }
          );
          return NextResponse.json({ ok: true });
        }

        // Standard /start welcome
        await sendTelegramMessage(
          chatId,
          `✨ <b>TeacherOS 2.0 Raqamli Ta'lim Tizimiga xush kelibsiz!</b>\n\nUstozingiz yuborgan havola orqali sinfga qo'shiling yoki faol vazifalarni ko'rish uchun /vazifa deb yozing.`
        );
        return NextResponse.json({ ok: true });
      }

      // /vazifa or /hw command
      if (/^\/(vazifa|hw|homework)/i.test(text)) {
        await sendTelegramMessage(
          chatId,
          `📚 <b>FAOL UYGA VAZIFANGIZ</b>\n\nTopshirish havolasini ochish uchun quyidagi tugmani bosing:`,
          {
            inline_keyboard: [
              [
                {
                  text: "🚀 Vazifani Ochish",
                  url: `https://teacheros-0l68.onrender.com/index.html#class=TOS-2PCX-WY6C-SPV7&role=student`,
                },
              ],
            ],
          }
        );
        return NextResponse.json({ ok: true });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
