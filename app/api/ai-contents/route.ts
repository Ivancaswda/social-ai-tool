import { NextResponse, NextRequest } from "next/server";
import getServerUser from "@/lib/auth-server";
import { db } from "@/configs/db";
import {AiContentTable} from "@/configs/schema";
import { eq, desc } from 'drizzle-orm'

export async function GET(req: NextRequest) {
    const user = await getServerUser()
    if (!user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const contents = await db.select()
        .from(AiContentTable)
        .where(eq(AiContentTable.userEmail, user.email))
        .orderBy(desc(AiContentTable.createdOn))

    return NextResponse.json(contents)
}
