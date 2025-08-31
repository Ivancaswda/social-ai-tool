import { NextRequest, NextResponse } from 'next/server'
import getServerUser from "@/lib/auth-server"
import { inngest } from "@/inngest/client"
import axios from "axios";
import {AiContentTable, AiThumbnailTable, usersTable} from "@/configs/schema";
import {db} from "@/configs/db";
import {eq} from "drizzle-orm";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const userInput = searchParams.get('query')
    const user = await getServerUser()

    if (!user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const dbUser = await db.select()
        .from(usersTable)
        .where(eq(usersTable.email, user.email))
        .then(r => r[0])

    if (!dbUser) return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 })

    // Лимит для обычных пользователей
    if (!dbUser.isPro) {
        const contentCount = await db.select()
            .from(AiThumbnailTable)
            .where(eq(AiThumbnailTable.userEmail, user.email))
            .then(r => r.length)

        if (contentCount >= 5) {
            return NextResponse.json({ error: "limit_reached" }, { status: 403 })
        }
    }




    const result = await inngest.send({
        name: 'ai/trending-keywords',
        data: {
            userInput: userInput,
            userEmail: user?.email
        }
    })

    const runId = result?.ids[0]

    // 2️⃣ Ждем завершения Inngest
    let finalData = null
    while (true) {
        const runs = await getRuns(runId)
        const run = runs?.data?.[0]

        if (run?.status === 'Completed') {
            finalData = run?.output?.[0] ?? run?.output
            break
        } else if (run?.status === 'Cancelled') {
            break
        }

        // Подождать 2 секунды и повторить
        await new Promise(res => setTimeout(res, 2000))
    }
    console.log(finalData)

    return NextResponse.json(finalData)
}
export async function getRuns(runId: string) {
    const result = await axios.get(
        `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
        { headers: { Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}` } }
    )
    return result.data
}