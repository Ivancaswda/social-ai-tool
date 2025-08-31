// app/api/ai-contents/[contentId]/route.ts
import { NextRequest, NextResponse } from "next/server"
import getServerUser from "@/lib/auth-server"
import { db } from "@/configs/db"
import {TrendingKeywords} from "@/configs/schema";
import { eq } from 'drizzle-orm'

export async function GET(req: NextRequest, { params }: { params: { keywordId: string } }) {
    const user = await getServerUser()
    if (!user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const content = await db.select()
        .from(TrendingKeywords)
        .where(eq(TrendingKeywords.id, Number(params.keywordId)))
        .where(eq(TrendingKeywords.userEmail, user.email))
        .limit(1)
        .then(r => r[0])

    if (!content) return NextResponse.json({ error: 'TrendingKeyword not found' }, { status: 404 })

    return NextResponse.json(content)
}
