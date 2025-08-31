import { NextResponse, NextRequest } from "next/server";
import getServerUser from "@/lib/auth-server";
import { db } from "@/configs/db";
import {TrendingKeywords} from "@/configs/schema";
import { eq, desc } from 'drizzle-orm'

export async function GET(req: NextRequest) {
    const user = await getServerUser()
    if (!user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const contents = await db.select()
        .from(TrendingKeywords)
        .where(eq(TrendingKeywords.userEmail, user.email))
        .orderBy(desc(TrendingKeywords.createdOn))

    return NextResponse.json(contents)
}
