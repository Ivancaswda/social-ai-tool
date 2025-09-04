'use client'

import axios from 'axios'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2Icon, Search } from "lucide-react"
import YoutubeSearchList from "@/app/(routes)/thumbnail-search/_components/YoutubeSearchList"
import { Skeleton } from "@/components/ui/skeleton"
import VideoListSkeleton from "@/app/_components/VideoListSkeleton"
import {toast} from "sonner";

export type VideoInfo = {
    id: string,
    title: string,
    description: string,
    thumbnail: string,
    channelTitle: string,
    viewCount: string,
    publishedAt: string,
    commentCount: string,
    likeCount: string,
}

const ThumbnailSearch = () => {

    const [userInput, setUserInput] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [videoList, setVideoList] = useState<VideoInfo[]>()

    const onSearch = async () => {
       try {
           setLoading(true)
           const result = await axios.get('/api/thumbnail-search?query=' + userInput)
           console.log(result.data)
           setVideoList(result.data)
       } catch (error) {
           console.log(error)
           toast.error('Серверная ошибка!')
           setLoading(false)
       }
          setLoading(false)
    }

    const SearchSimilarThumbnail = async (url: string) => {

       try {
           setLoading(true)

        const result = await axios.get('/api/thumbnail-search?thumbnailUrl=' + url)

        setVideoList(result.data)

       } catch (error) {
           toast.error('Серверная ошибка!')
           setLoading(false)
       }
        setLoading(false)
    }

    return (
        <div className=" min-h-screen py-8">
            <div className="container mx-auto px-4 sm:px-10 lg:px-24">
                <div className="flex flex-col items-center gap-4 mb-10">
                    <h2 className="text-3xl font-bold text-green-600">Поиск по превью AI</h2>
                    <p className="text-lg text-gray-600 text-center max-w-xl">
                        Используйте мощь ИИ для поиска видео по изображению миниатюры. Просто введите запрос для поиска по видео.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-md flex items-center gap-4 mb-6">
                    <input
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        type="text"
                        placeholder="Введите запрос для поиска"
                        className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <Button
                        disabled={loading || !userInput}
                        onClick={onSearch}
                        className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-lg transition duration-200"
                    >
                        {loading ? <Loader2Icon className="animate-spin" /> : <Search />}
                        Поиск
                    </Button>
                </div>

                {loading && (
                    <div className="flex flex-col items-center justify-center mt-16 gap-3 animate-pulse">
                        <Loader2Icon className="text-green-600 text-4xl animate-spin" />
                        <h1 className="text-green-600 font-semibold text-2xl">Идет поиск...</h1>
                        <p className="text-gray-500 text-sm">
                            Подождите, ИИ ищет подходящие видео ✨
                        </p>
                    </div>
                )}

                <div className="mt-6">
                    {loading ? (
                        <VideoListSkeleton />
                    ) : (
                        <YoutubeSearchList
                            SearchSimilarThumbnail={SearchSimilarThumbnail}
                            videoList={videoList}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ThumbnailSearch
