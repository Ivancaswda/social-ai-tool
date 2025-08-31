'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaCircle, FaRegCircle } from 'react-icons/fa'

const MAX_CONTENT = 5
const MAX_KEYWORDS = 5
const MAX_COINS = MAX_CONTENT + MAX_KEYWORDS

const CoinsProgress = () => {
    const [usedContent, setUsedContent] = useState(0)
    const [usedKeywords, setUsedKeywords] = useState(0)

    useEffect(() => {
        const fetchUsage = async () => {
            try {
                const resContent = await axios.get('/api/ai-contents') // массив генераций
                const resKeywords = await axios.get('/api/get-keywords') // массив ключевых слов
                setUsedContent(resContent.data?.length || 0)
                setUsedKeywords(resKeywords.data?.length || 0)
            } catch (err) {
                console.error(err)
            }
        }
        fetchUsage()
    }, [])

    const totalUsed = usedContent + usedKeywords

    return (
        <div className="flex  items-center gap-2 ">
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
    )
}

export default CoinsProgress
