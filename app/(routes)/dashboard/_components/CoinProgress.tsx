'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaCircle, FaRegCircle } from 'react-icons/fa'
import {Button} from "@/components/ui/button";
import {Loader2Icon} from "lucide-react";

const MAX_CONTENT = 5
const MAX_KEYWORDS = 5
const MAX_COINS = MAX_CONTENT + MAX_KEYWORDS

const CoinsProgress = () => {
    const [usedContent, setUsedContent] = useState(0)
    const [usedKeywords, setUsedKeywords] = useState(0)
    const [isLoading, setIsLoading] =  useState(false)
    useEffect(() => {
        const fetchUsage = async () => {
            try {
                setIsLoading(true)
                const resContent = await axios.get('/api/ai-contents') // массив генераций
                const resKeywords = await axios.get('/api/get-keywords') // массив ключевых слов
                setUsedContent(resContent.data?.length || 0)
                setUsedKeywords(resKeywords.data?.length || 0)
            } catch (err) {
                setIsLoading(false)
                console.error(err)
            }
            setIsLoading(false)
        }
        fetchUsage()
    }, [])

    const totalUsed = usedContent + usedKeywords
    const isExhausted = totalUsed >= MAX_COINS

    if (isLoading) {
        return <div className='flex items-center justify-start'>
            <Loader2Icon className='animate-spin size-6 text-white'/>
        </div>
    }

    return (
        <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
                {Array.from({ length: MAX_COINS }).map((_, i) => (
                    <div key={i}>
                        {i < totalUsed ? (
                            <FaCircle className="text-yellow-500 w-6 h-6" />
                        ) : (
                            <FaRegCircle className="text-gray-300 w-6 h-6" />
                        )}
                    </div>
                ))}
            </div>


            {isExhausted && (
                <div className="flex flex-col items-center gap-3">
                    <p className="text-red-500 font-semibold">Монеты закончились</p>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md">
                        <a href="/buy-pro">Купить PRO</a>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default CoinsProgress
