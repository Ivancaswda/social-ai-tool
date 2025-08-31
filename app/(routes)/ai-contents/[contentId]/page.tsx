'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import {Loader2Icon, TriangleAlert} from "lucide-react";
import Link from "next/link";
import {FaMagic, FaWizardsOfTheCoast} from "react-icons/fa";

const ContentDetailPage = () => {
    const params = useParams()
    const { contentId } = params
    const [content, setContent] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await axios.get(`/api/ai-contents/${contentId}`)
                setContent(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchContent()
    }, [contentId])

    if (loading) return <div className='flex items-center font-semibold text-green-600 justify-center w-full h-full flex-col gap-3'>
        <Loader2Icon className='animate-spin text-green-600'/>
        Загрузка...
    </div>
    if (!content) return <div className='flex items-center font-semibold text-green-600 justify-center w-full h-full flex-col gap-3'>
        <TriangleAlert className='text-green-600'/>
        У вас пока нету генерировнного контента...
    </div>
    console.log(content.content)

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">{content.content?.titles?.[0]?.title}</h2>
            <p className="text-gray-600">
                <span className='font-semibold text-lg'>Описание: </span>
                <br/>
                {content.content?.description}</p>

            <div>
                <h3 className="text-lg font-semibold text-gray-600">Хештеги:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                    {content.content?.tags?.map((tag: string, idx: number) => (
                        <Badge key={idx} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </div>
            {content.content.video_steps && content.content.video_steps.length > 0 && (
                <div className="border rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Этапы видео</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {content.content.video_steps.map((step, index) => (
                            <div
                                key={index}
                                className="border-l-4 border-green-500 bg-gray-50 p-4 rounded shadow-sm hover:shadow-md transition flex flex-col"
                            >
                                <h3 className="font-semibold mb-1">Этап {index + 1}</h3>
                                <p className="text-gray-700 text-sm">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Промпты для генерации изображений</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.content.image_prompts.map((item, index) => (
                        <div key={index} className="border rounded p-4 flex flex-col gap-2">
                            <h3 className="font-semibold text-lg">{item.heading}</h3>
                            <p className="text-gray-600">{item.prompt}</p>
                            {/* Ссылка на генерацию изображения */}
                            <Link
                                href={`https://example.com/generate?prompt=${encodeURIComponent(item.prompt)}`}
                                target="_blank"
                                className="mt-2 inline-block text-white  flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-center"
                            >
                                <FaMagic/>
                                Сгенерировать изображение
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ContentDetailPage
