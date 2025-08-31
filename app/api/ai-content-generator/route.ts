import { NextRequest, NextResponse } from 'next/server'
import { inngest } from '@/inngest/client'
import getServerUser from "@/lib/auth-server"
import axios from "axios"
import {db} from "@/configs/db";
import {AiContentTable, usersTable} from "@/configs/schema";
import {eq} from 'drizzle-orm'
export async function POST(req: NextRequest) {
    const { userInput } = await req.json()
    const user = await getServerUser()


    if (!user) {
        return NextResponse.json({ error: "Не авторизован" }, { status: 401 })
    }
    console.log(user.email)

    const dbUser = await db.select()
        .from(usersTable)
        .where(eq(usersTable.email, user.email))
        .then(r => r[0])

    if (!dbUser) {
        return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 })
    }


    if (!dbUser.isPro) {
        const contentCount = await db.select()
            .from(AiContentTable)
            .where(eq(AiContentTable.userEmail, user.email))
            .then(r => r.length)

        if (contentCount >= 5) {
            return NextResponse.json({ error: "limit_reached" }, { status: 403 })
        }
    }




    const result = await inngest.send({
        name: 'ai/generateContent',
        data: {
            userInput,
            userEmail: user?.email
        },
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

    return NextResponse.json(finalData)
}

export async function getRuns(runId: string) {
    const result = await axios.get(
        `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
        { headers: { Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}` } }
    )
    return result.data
}