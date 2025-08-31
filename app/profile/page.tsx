'use client'
import React, { useEffect, useState } from 'react'
import { Loader2Icon, OctagonAlert, TriangleAlert, UserCircle2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import {useAuth} from "@/context/useAuth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Sidebar from "@/app/_components/Sidebar";


const ProfilePage = () => {
    const { user, loading: authLoading } = useAuth()

    const [contents, setContents] = useState<any[]>([])
    const [keywords, setKeywords] = useState<any[]>([])
    const [loadingContents, setLoadingContents] = useState(true)
    const [loadingKeywords, setLoadingKeywords] = useState(true)
    const [errorContents, setErrorContents] = useState<string | null>(null)
    const [errorKeywords, setErrorKeywords] = useState<string | null>(null)

    // fetch contents
    useEffect(() => {
        const fetchContents = async () => {
            try {
                const res = await fetch('/api/ai-contents')
                if (!res.ok) throw new Error('Не удалось загрузить контент')
                const data = await res.json()
                setContents(data)
            } catch (err: any) {
                setErrorContents(err.message)
            } finally {
                setLoadingContents(false)
            }
        }
        fetchContents()
    }, [])

    // fetch keywords
    useEffect(() => {
        const fetchKeywords = async () => {
            try {
                const res = await fetch('/api/get-keywords')
                if (!res.ok) throw new Error('Не удалось загрузить ключевые слова')
                const data = await res.json()
                setKeywords(data)
            } catch (err: any) {
                setErrorKeywords(err.message)
                toast.error("Ошибка при получении ключевых слов!")
            } finally {
                setLoadingKeywords(false)
            }
        }
        fetchKeywords()
    }, [])
    console.log(user)
    if (authLoading) {
        return <div className="flex items-center mt-20 justify-center w-full h-full flex-col gap-3 font-semibold text-green-600">
            <Loader2Icon className="animate-spin text-green-600"/>
            Загрузка профиля...
        </div>
    }

    return (



        <div className="container mx-auto p-6">
            <Sidebar/>
            {/* Профиль */}
            <div className="bg-white mt-20 dark:bg-neutral-900 rounded-xl shadow-md p-6 flex items-center gap-4 mb-10">

                <Avatar>
                    <AvatarImage src={user?.avatarUrl}/>
                    <AvatarFallback className='bg-green-600 text-white '>
                        {user?.userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl font-bold">{user?.userName || "Имя пользователя"}</h1>
                    <p className="text-gray-500">{user?.email}</p>
                </div>
                {user?.isPro && <div className='px-4 py-2 bg-green-50 text-green-500 border-green-500 rounded-xl '>
                    Pro
                </div> }

            </div>

            {/* Контент */}
            <section className="mb-10">
                <h2 className="text-xl font-bold mb-4">Мои генерации контента</h2>
                {loadingContents ? (
                    <div className="flex items-center justify-center flex-col gap-3 text-green-600 font-semibold">
                        <Loader2Icon className="animate-spin"/>
                        Загрузка...
                    </div>
                ) : errorContents ? (
                    <div className="flex items-center justify-center text-red-600 flex-col gap-3">
                        <TriangleAlert className="w-8 h-8"/>
                        Ошибка: {errorContents}
                    </div>
                ) : contents.length === 0 ? (
                    <div className="flex items-center flex-col gap-4">
                        <OctagonAlert className="text-green-600 size-20"/>
                        <div className="text-2xl font-semibold text-green-600">
                            Генерации не найдены
                        </div>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {contents.map(item => (
                            <li key={item.id} className="p-4 border rounded hover:shadow transition">
                                <Link href={`/ai-contents/${item.contentId}`}>
                                    <h3 className="text-lg font-semibold">{item.content?.titles?.[0]?.title}</h3>
                                    <p className="text-gray-500">{new Date(item.createdOn).toLocaleDateString()}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Ключевые слова */}
            <section>
                <h2 className="text-xl font-bold mb-4">Мои ключевые слова</h2>
                {loadingKeywords ? (
                    <div className="flex items-center justify-center flex-col gap-3 text-green-600 font-semibold">
                        <Loader2Icon className="animate-spin"/>
                        Загрузка...
                    </div>
                ) : errorKeywords ? (
                    <div className="flex items-center justify-center text-red-600 flex-col gap-3">
                        <TriangleAlert className="w-8 h-8"/>
                        Ошибка: {errorKeywords}
                    </div>
                ) : keywords.length === 0 ? (
                    <div className="flex items-center flex-col gap-4">
                        <OctagonAlert className="size-20 text-green-600"/>
                        <div className="text-2xl font-semibold text-green-600">
                            Ключевые слова не найдены
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {keywords.map((item: any, index: number) => (
                            <Link
                                key={index}
                                href={`/ai-keywords/${item.keywordId}`}
                                className="bg-white dark:bg-neutral-900 p-4 cursor-pointer rounded-lg shadow-md hover:shadow-lg transition"
                            >
                                <h2 className="text-xl font-semibold">{item.userInput}</h2>
                                <p className="text-gray-500">Создано: {new Date(item.createdOn).toLocaleDateString()}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>

    )
}

export default ProfilePage
