'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Loader2Icon, Sparkles } from "lucide-react";
import { FaMagic } from "react-icons/fa";
import ContentDisplay from "@/app/(routes)/ai-content-generator/_components/ContentDisplay";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

export type ContentType = {
    id: number,
    userInput: string,
    content: subContent,
    thumbnailUrl: string,
    createdOn: string
}

export type subContent = {
    description: string,
    image_prompts: any,
    tags: string[],
    titles: { seo_score: number; title: string }[],
    video_steps: string[]
}

const suggestions = [
    "Как стать популярным в TikTok",
    "Идеи для YouTube Shorts",
    "Топ мемы 2025",
    "Советы по личному бренду",
    "AI тренды"
]

const AiContentGenerator = () => {
    const [userInput, setUserInput] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState<ContentType>()
    const router =useRouter()
    const onGenerate = async (query?: string) => {
        const finalQuery = query || userInput
        if (!finalQuery) return
        try {
            setLoading(true)
            setContent(undefined)

            const { data } = await axios.post('/api/ai-content-generator', { userInput: finalQuery })

            if (data.error === "limit_reached") {
                toast.error('У вас закончились монеты')
                router.push("/buy-pro")
                return
            }

            setContent(data)
            setLoading(false)
        } catch (err) {
            if (err.response?.status === 403 && err.response.data?.error === "limit_reached") {
                toast.error('У вас закончились монеты')
                setLoading(false)
                router.push("/buy-pro")
            } else {
                toast.error('Серверная ошибка!')
                console.error("Ошибка генерации:", err)
            }

        } finally {
            setUserInput("")
        }
    }

    return (
        <div className="px-6 md:px-20 lg:px-40">

            <div className="flex flex-col items-center justify-center mt-16 gap-2">
                <h2 className="font-bold text-3xl md:text-4xl text-center">
                    🚀 ИИ генератор контента
                </h2>
                <p className="text-gray-500 text-center max-w-2xl">
                    Превратите любую идею в готовый контент для соцсетей —
                    заголовки, описание, теги и даже план для видео!
                </p>
            </div>


            <div className="max-w-3xl mx-auto mt-8 relative">
                <div className="flex items-center border border-gray-300 bg-white rounded-2xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                    <input
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        type="text"
                        placeholder="Введите тему для генерации..."
                        className="w-full p-4 outline-none bg-transparent text-gray-700 text-lg"
                    />
                    <Button
                        disabled={loading || !userInput}
                        onClick={() => onGenerate()}
                        className="rounded-none rounded-r-2xl text-xl flex h-[100%] items-center text-white gap-3 bg-green-600 hover:bg-green-700  px-6"
                    >
                        {loading ? <Loader2Icon className="animate-spin"/> : <Sparkles className='size-[60px]' />}
                        <span className="ml-2 ">Сгенерировать</span>
                    </Button>
                </div>


                <div className="flex flex-wrap gap-2 mt-4">
                    {suggestions.map((s, i) => (
                        <Button disabled={loading}
                            key={i}
                            onClick={() => onGenerate(s)}
                            className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition"
                        >
                            {s}
                        </Button>
                    ))}
                </div>
            </div>


            {loading && (
                <div className="flex flex-col items-center justify-center mt-16 gap-3 animate-pulse">
                    <FaMagic className="text-green-600 size-20 animate-bounce"/>
                    <h1 className="text-green-600 font-semibold text-2xl">Идет генерация...</h1>
                    <p className="text-gray-500 text-sm">
                        Подождите, ИИ уже создает для вас уникальный контент ✨
                    </p>
                </div>
            )}

            {/* результаты */}
            {!loading && content && (
                <div className="mt-12">
                    <ContentDisplay loading={loading} content={content}/>
                </div>
            )}
        </div>
    )
}
export default AiContentGenerator
