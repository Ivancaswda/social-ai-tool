'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {Loader2Icon, OctagonAlert} from "lucide-react";

const AiContentsPage = () => {
    const [contents, setContents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/ai-contents')
                setContents(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return <div className='flex items-center font-semibold text-green-600 justify-center w-full h-full flex-col gap-3'>
        <Loader2Icon className='animate-spin text-green-600'/>
        Загрузка...
    </div>

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Мои генерации контента</h2>
            <ul className="space-y-4">
                {!contents || contents.length === 0 && <div className='flex items-center flex-col gap-4 justify-center font-semibold text-2xl'>
                    <OctagonAlert className='text-green-600 size-20'/>
                    <div className='text-2xl  font-semibold text-green-600'>
                        Генериции не найдены
                    </div>
                </div>}

                {contents.map(item => (
                    <li key={item.id} className="p-4 border rounded hover:shadow">
                        <Link href={`/ai-contents//${item.contentId}`}>
                            <h3 className="text-lg font-semibold">{item.content?.titles?.[0]?.title}</h3>
                            <p className="text-gray-500">{item.createdOn}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AiContentsPage
