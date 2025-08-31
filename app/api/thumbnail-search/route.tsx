import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

import { inngest } from '@/inngest/client'
import {getRuns} from "@/app/api/ai-content-generator/route";
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        let query = searchParams.get("query");
        const thumbnailUrl = searchParams.get('thumbnailUrl')

        if (thumbnailUrl) {
            const result = await inngest.send({
                name: 'ai/thumbnail-search',
                data: {
                    query,
                    thumbnailUrl,
                },
            })
            const runId = result?.ids[0]

            // 2️⃣ Ждем завершения Inngest
            let finalData = null
            while (true) {
                const runs = await getRuns(runId)
                const run = runs?.data?.[0]

                if (run?.status === 'Completed') {
                    finalData = run?.output
                    break
                } else if (run?.status === 'Cancelled') {
                    break
                }

                // Подождать 2 секунды и повторить
                await new Promise(res => setTimeout(res, 2000))
            }

            query = finalData

        }


        if (!query) {
            return NextResponse.json({ error: "No query provided" }, { status: 400 });
        }

        // 1. Поиск по YouTube
        const result = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
                params: {
                    part: "snippet",
                    q: query,
                    type: "video",
                    maxResults: 10,
                    key: process.env.YOUTUBE_API_KEY
                }
            }
        );

        const searchData = result.data;
        const videoIds = searchData.items.map((item: any) => item.id.videoId).join(",");

        // 2. Получение деталей видео
        const videoResult = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos`,
            {
                params: {
                    part: "statistics,snippet",
                    id: videoIds,
                    key: process.env.YOUTUBE_API_KEY
                }
            }
        );

        const videoResultData = videoResult.data;

        const FinalResult = videoResultData.items.map((item: any) => ({
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url,
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount,
            commentCount: item.statistics.commentCount
        }));

        return NextResponse.json(FinalResult);





    } catch (error: any) {
        console.error("API error:", error?.response?.data || error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
