'use client'
import React, {useState} from 'react'
import {Button} from "@/components/ui/button";
import {Loader2Icon, Search} from "lucide-react";
import axios from "axios";
import VideoOutlierCard from "@/app/(routes)/outlier/_components/VideoOutlierCard";
import VideoListSkeleton from "@/app/_components/VideoListSkeleton";
export type VideoInfoOutlier = {
    id: string,
    title: string,
    description: string,
    thumbnail: string,
    channelTitle: string,
    viewCount: number,
    publishedAt: string,
    commentCount: number,
    likeCount: number,
    smartScore: number,
    viewsPerDay: number,
    isOutlier: boolean,
    engagementRate: number,
    outlierScore: number

}
const Outlier = () => {
    const [userInput, setUserInput] = useState<string>()
    const [loading, setLoading] = useState<boolean>()
    const [videoList, setVideoList] = useState<VideoInfoOutlier[]>()


    const onSearch = async () => {
        try {
            setLoading(true);
            const result = await axios.get('/api/outlier?query=' + userInput);
            setVideoList(result.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            } else {
                console.error('Unexpected error:', error);
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <div className='px-10 md:px-20 lg:px-40 flex items-center justify-center flex-col gap-4'>
                <div className='flex items-center justify-center mt-20 flex-col gap-2'>
                    <h2 className='font-semibold text-3xl text-green-600'>Выбросы данных</h2>
                    <p className='text-gray-400 text-center'>Здесь можно найти видео, которые выделяются по различным меткам и показателям, как смарт-оценка или рейтинг вовлеченности.</p>
                </div>
                <div className='max-w-2xl p-2 rounded-xl bg-gray-200 flex gap-2 items-center mt-5 mb-5'>
                    <input value={userInput} onChange={(e) => setUserInput(e.target.value)} type="text"
                           placeholder='Введите запрос для поиска' className='outline-none bg-gray-200 w-full p-2'/>
                    <Button disabled={loading || !userInput} onClick={onSearch}>{loading ?
                        <Loader2Icon className='animate-spin'/> : <Search/>} Поиск</Button>
                </div>
            </div>

            {!loading ? <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
                {videoList?.map((item, index) => (
                    <div key={index}>
                        <VideoOutlierCard videoInfo={item}/>
                    </div>
                ))}
            </div> : <VideoListSkeleton/>}
        </div>
    )
}
export default Outlier
