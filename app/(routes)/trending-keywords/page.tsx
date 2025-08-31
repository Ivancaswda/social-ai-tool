'use client'
import React, {useState} from 'react'
import {Button} from "@/components/ui/button";
import {Loader2Icon, Search} from "lucide-react";
import axios from 'axios'
import KeywordsList from "@/app/(routes)/trending-keywords/_components/KeywordsList";
import {RunStatus} from "@/services/GlobalApi";
import {FaMagic} from "react-icons/fa";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export type Keywords = {
    keyword: string;
    score: number,
    relatedQueries: string
}

export type SEOKeywordData = {
    mainKeyword: string;
    keywordsList: Keywords[],
    loading: boolean
}





const TrendingKeywords = () => {
    const router = useRouter()
    const [userInput, setUserInput] = useState<string>()
    const [loading, setLoading] = useState<boolean>()
    const [keywordsList, setKeywordsList] = useState<SEOKeywordData>()
    const onFind = async (query?: string) => {
        const searchTerm = query || userInput
        if (!searchTerm) return

        setLoading(true)
        setKeywordsList(undefined)

        try {
            const result = await axios.get('/api/trending-keywords?query=' + searchTerm)
            setKeywordsList(result.data)
        } catch (err) {
            if (err.response?.status === 403 && err.response.data?.error === "limit_reached") {
                toast.error('У вас закончились монеты')
                setLoading(false)
                router.push("/buy-pro")
            } else {
                toast.error('Server error! 400')
                console.error("Error fetching keywords:", err)
            }

        }
        setLoading(false)
    }
    const suggestions = ["YouTube Shorts", "AI Music", "Jokes 2025", "Подкасты", "VR видео"]


    return (
        <div>
            <div className="px-10 md:px-20 lg:px-40">
                <div className="flex items-center justify-center mt-20 flex-col gap-2">
                    <h2 className="font-semibold text-3xl">ИИ ключевые слова</h2>
                    <p className="text-gray-400 text-center">
                        Посмотрите самые популярные ключевые слова, связанные с вашим запросом.
                    </p>
                </div>


                <div className="max-w-3xl mt-6 mx-auto relative">
                    <div className="flex items-center border border-gray-300 bg-white rounded-xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                        <Search className="text-gray-400 ml-3 h-5 w-5"/>
                        <input
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            type="text"
                            placeholder="Введите ключевое слово..."
                            className="w-full p-3 outline-none bg-transparent text-gray-700"
                        />
                        <Button
                            disabled={loading || !userInput}
                            onClick={() => onFind()}
                            className="rounded-none rounded-r-xl bg-green-600 hover:bg-green-700"
                        >
                            {loading ? <Loader2Icon className="animate-spin"/> : "Искать"}
                        </Button>
                    </div>


                    <div className="flex flex-wrap gap-2 mt-4">
                        {suggestions.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => { setUserInput(s); onFind(s) }}
                                className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            {loading && (
                <div className="flex items-center justify-center flex-col gap-3 mt-14">
                    <FaMagic className="animate-bounce text-green-600 size-24"/>
                    <h1 className="text-green-600 font-semibold text-2xl">Идет генерация...</h1>
                    <p className="text-gray-600 font-semibold text-sm">
                        Подождите, пока ИИ сделает свою работу...
                    </p>
                </div>
            )}

            {/* Результаты */}
            <KeywordsList loading={loading} keywordsList={keywordsList?.keywordsList}/>
        </div>
    )
}
export default TrendingKeywords
