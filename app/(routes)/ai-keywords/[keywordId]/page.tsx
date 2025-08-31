'use client'
import React, {useEffect, useState} from 'react'
import KeywordsList from "@/app/(routes)/trending-keywords/_components/KeywordsList";
import {useParams} from "next/navigation";
import {Loader2Icon, TriangleAlert} from "lucide-react";

const KeywordId = () => {
    const [keywordsList, setKeywordsList] = useState<any[]>([]); // Состояние для списка ключевых слов
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState<string | null>(null); // Состояние ошибки
    const {keywordId} = useParams()
    // Получение данных при монтировании компонента
    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const res = await fetch(`/api/get-keywords/${keywordId}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch content data');
                }
                const data = await res.json();
                setKeywordsList(data.keywordsData || []); // Убедитесь, что правильная структура данных
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContentData();
    }, [keywordId]);
    if (loading) {
        return <div className='flex items-center justify-center w-full h-full flex-col gap-3 font-semibold text-green-600'>
            <Loader2Icon className='animate-spin text-green-600'/>
            Загрузка...
        </div>;
    }

    if (error) {
        return <div className='flex items-center justify-center text-red-600  flex-col gap-3'>
            <TriangleAlert className='text-red-600'/>
            Ошибка: {error}
        </div>;
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Лист ключевых слов: <br/> <span className='text-sm font-semibold text-gray-500'>#{keywordId}</span> </h1>

            <KeywordsList keywordsList={keywordsList} loading={loading} />
        </div>
    )
}
export default KeywordId
