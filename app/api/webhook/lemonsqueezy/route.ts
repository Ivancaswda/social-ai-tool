import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const event = await req.json();

        // Пример структуры LemonSqueezy webhook
        // event.data.attributes.customer.email - email пользователя
        // event.data.attributes.type - тип события (purchase, subscription_created и т.д.)

        const email = event?.data?.attributes?.customer?.email;
        const type = event?.data?.attributes?.type;

        if (!email || !type) {
            return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
        }

        // Проверяем событие покупки или активации подписки
        if (type === "subscription_created" || type === "purchase_completed") {
            await db.update(usersTable)
                .set({ isPro: true })
                .where(eq(usersTable.email, email))
                .execute();
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
