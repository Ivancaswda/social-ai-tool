
import axios from "axios";
import {NextRequest, NextResponse} from 'next/server'

function calculateIQR(values: number[]) {
    const sorted = [...values].sort((a, b) => a - b)
    const q1 = sorted[Math.floor(sorted.length / 4)]
    const q3 = sorted[Math.floor((sorted.length * 3) /4)]
    const iqr = q3 - q1
    const lowerBound = q1 -1.5 * iqr

    const upperBound = q3 + 1.5 * iqr

    return {q1, q3, iqr, lowerBound, upperBound}
}
export async function GET(req: NextRequest) {
    try {
        const {searchParams} = new URL(req.url)
        const query = searchParams.get('query')

        if (!query) {
            return NextResponse.json({ error: "Query is required" }, { status: 400 });
        }

        // 1. Поиск по YouTube
        const result = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: "snippet",
                q: query,
                type: "video",
                maxResults: 10,
                key: process.env.YOUTUBE_API_KEY
            }
        });

        const searchData = result.data;
        const videoIds = searchData.items.map((item: any) => item.id.videoId).join(",");

        if (!videoIds) {
            return NextResponse.json({ error: "No videos found" }, { status: 404 });
        }

        // 2. Получение деталей видео
        const videoResult = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
            params: {
                part: "statistics,snippet",
                id: videoIds,
                key: process.env.YOUTUBE_API_KEY
            }
        });

        const videoResultData = videoResult.data;

        const videos = videoResultData.items.map((item: any) => {
            const viewCount = parseInt(item.statistics.viewCount || '0')
            const likeCount = parseInt(item.statistics.likeCount || '0')
            const commentCount = parseInt(item.statistics.commentCount || '0')

            const publishDate = new Date(item.snippet.publishedAt)
            const today = new Date()
            const daysSincePublished = Math.max((today.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24), 1)

            const viewsPerDay = viewCount / daysSincePublished
            const engagementRate = ((likeCount + commentCount) / Math.max(viewCount, 1)) * 100

            return {
                id: item.id,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.high.url,
                channelTitle: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                viewCount,
                likeCount,
                commentCount,
                viewsPerDay,
                engagementRate
            }
        });

        const viewCounts = videos.map(v => v.viewCount);
        const {iqr, lowerBound, upperBound} = calculateIQR(viewCounts);
        const avgViews = viewCounts.reduce((a, b) => a + b, 0) / viewCounts.length;
        const maxViewsPerDay = Math.max(...videos.map(v => v.viewsPerDay));
        const maxEngagementRate = Math.max(...videos.map(v => v.engagementRate));

        const finalResult = videos.map(v => {
            const isOutlier = v.viewCount < lowerBound || v.viewCount > upperBound;
            let outlierScore = 0;

            if (isOutlier && iqr > 0) {
                if (v.viewCount > upperBound) {
                    outlierScore = (v.viewCount - upperBound) / iqr;
                } else {
                    outlierScore = (lowerBound - v.viewCount) / iqr;
                }
            }

            const smartScore = (v.viewCount / avgViews) * 0.3 +
                (v.viewsPerDay / maxViewsPerDay) * 0.5 +
                (v.engagementRate / maxEngagementRate) * 0.2;

            return {
                ...v,
                smartScore: Number(smartScore.toFixed(3)),
                engagementRate: Number(v.engagementRate.toFixed(2)),
                viewsPerDay: Math.round(v.viewsPerDay),
                isOutlier,
                outlierScore: Number(outlierScore.toFixed(2))
            };
        });

        return NextResponse.json(finalResult);

    } catch (error: any) {
        console.error("Outlier API error:", error?.response?.data || error.message || error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
