'use client'
import React, { useEffect, useState } from 'react';
import {Loader2Icon, OctagonAlert, TriangleAlert} from "lucide-react";
import {toast} from "sonner";
import Link from "next/link";



const KeywordsPage = () => {
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchKeywords = async () => {
            try {
                const res = await fetch('/api/get-keywords'); // Адрес вашего API для получения данных
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();
                setKeywords(data);  // Сохранение данных в состоянии
            } catch (err) {
                toast.error('Ошибка при получении данных!')
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchKeywords();
    }, []);

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
    if (keywords.length === 0) {
        return  <div className='flex items-center flex-col gap-4'>
            <OctagonAlert className='size-20 text-green-600'/>
            <div className='text-3xl flex items-center justify-center font-semibold text-gray-600'>
                Ключевые слова не найдены!
            </div>
            <p className='text-gray-500 font-semibold text-sm'>Вы пока еще не создали ни одного ключевого слова </p>
        </div>
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Мои ключевые слова</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {keywords.map((item, index) => (
                    <Link href={`/ai-keywords/${item.keywordId}`}
                        key={index}
                        className="bg-white p-4 cursor-pointer rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        <h2 className="text-xl font-semibold">{item.userInput}</h2>
                        <p className="text-gray-500">Создано: {new Date(item.createdOn).toLocaleDateString()}</p>

                    </Link>
                ))}
            </div>
        </div>
    );
};

export default KeywordsPage;
