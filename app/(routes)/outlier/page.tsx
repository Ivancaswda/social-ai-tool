'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2Icon, Search } from "lucide-react"
import axios from "axios"
import VideoOutlierCard from "@/app/(routes)/outlier/_components/VideoOutlierCard"
import VideoListSkeleton from "@/app/_components/VideoListSkeleton"
import { FaMagic, FaSearch } from "react-icons/fa"
import {toast} from "sonner";

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
    const [userInput, setUserInput] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [videoList, setVideoList] = useState<VideoInfoOutlier[]>([])

    // Предложенные каналы для быстрого поиска
    const suggestedChannels = [
        'MrBeast',
        'A4',
        'PewDiePie',
        'KingsAndGenerals'
    ]

    const onSearch = async (query: string) => {
        try {
            setLoading(true)
            const result = await axios.get('/api/outlier?query=' + query)
            setVideoList(result.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error('Серверная ошибка!')
                console.error('Axios error:', error.response?.data)
            } else {
                toast.error('Серверная ошибка!')
                console.error('Unexpected error:', error)
            }
        } finally {
            setLoading(false)
        }
    }

    // Обработчик клика по предложенному каналу
    const handleChannelClick = (channel: string) => {
        setUserInput(channel)  // Устанавливаем выбранный канал в поле ввода
        onSearch(channel)  // Запускаем поиск сразу
    }

    return (
        <div className="px-4 sm:px-10 lg:px-20 py-8">


            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-green-600 mb-3">Выбросы данных</h2>
                <p className="text-lg text-gray-500">
                    Здесь можно найти видео, которые выделяются по различным меткам и показателям, как смарт-оценка или рейтинг вовлеченности.
                </p>
            </div>


            <div className="flex justify-center mb-8">
                <div className="max-w-2xl w-full p-4 rounded-xl bg-gradient-to-r from-green-400 to-green-600 shadow-xl flex items-center gap-4">
                    <input
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        type="text"
                        placeholder="Введите запрос для поиска"
                        className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none shadow-md"
                    />
                    <Button
                        onClick={() => onSearch(userInput)}
                        disabled={loading || !userInput}
                        className="bg-white text-green-600 hover:bg-green-50 transition duration-200 rounded-lg flex items-center gap-2 px-5 py-2"
                    >
                        {loading ? <Loader2Icon className="animate-spin" /> : <Search />} Поиск
                    </Button>
                </div>
            </div>


            <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
                {suggestedChannels.map((channel) => (
                    <div
                        key={channel}
                        className="bg-green-50 text-green-500 px-4 py-2 rounded-xl border border-green-500 cursor-pointer hover:bg-green-200 transition-all"
                        onClick={() => handleChannelClick(channel)}
                    >
                        {channel}
                    </div>
                ))}
            </div>


            {loading && (
                <div className="flex flex-col items-center justify-center mt-16 gap-3 animate-pulse">
                    <FaSearch className="text-green-600 size-20 animate-bounce" />
                    <h1 className="text-green-600 font-semibold text-2xl">Идет Поиск...</h1>
                    <p className="text-gray-500 text-sm">
                        Подождите, ИИ уже ищет для вас подходящие видео ✨
                    </p>
                </div>
            )}


            {!loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {videoList?.map((item, index) => (
                        <div key={index} className="group hover:scale-105 transition-all duration-300">
                            <VideoOutlierCard videoInfo={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <VideoListSkeleton />
            )}
        </div>
    )
}

export default Outlier
