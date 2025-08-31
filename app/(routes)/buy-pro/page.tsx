'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {useAuth} from "@/context/useAuth"; // твоя функция для получения user на клиенте

const BuyPro = () => {
    const {user} = useAuth()


    const proLink = 'https://ai-tube.lemonsqueezy.com/buy/b7d2d4b8-6aef-4cc0-b5f3-8267f8f605df'



    const handleBuy = () => {
        if (user?.isPro) {
            toast.success('У вас уже есть Pro подписка!')
            return
        }
        window.open(proLink, '_blank')
    }



    return (
        <div className="min-h-screen flex flex-col items-center justify-start mt-20  p-6">
            <h1 className="text-4xl font-bold text-green-600 mb-10">Выберите тариф</h1>
            <div className="flex flex-col md:flex-row gap-8">

                {/* Бесплатный тариф */}
                <div className="bg-white shadow-xl rounded-3xl p-8 w-80 flex flex-col items-center text-center hover:scale-105 transition-transform">
                    <h2 className="text-2xl text-gray-500 font-semibold mb-4">Бесплатный тариф</h2>
                    <p className="text-gray-500 mb-6">Доступно: 5 генераций + 5 ключевых слов</p>
                    <div className="text-green-600 font-bold text-xl mb-6">0 ₽</div>
                    <button
                        disabled
                        className="bg-gray-300 cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl w-full"
                    >
                        Уже выбран
                    </button>
                </div>

                {/* Pro Sub */}
                <div className="bg-green-600 shadow-xl rounded-3xl p-8 w-80 flex flex-col items-center text-center text-white hover:scale-105 transition-transform">
                    <h2 className="text-2xl font-semibold mb-4">Pro Sub</h2>
                    <p className="text-green-100 mb-6">Безлимитный доступ ко всем генерациям и ключевым словам</p>
                    <div className="text-white font-bold text-xl mb-6">299 ₽ / месяц</div>
                    <button
                        onClick={handleBuy}
                        className={`bg-white text-green-600 font-semibold py-3 px-6 rounded-xl w-full hover:bg-gray-100 transition`}
                    >
                        {user?.isPro ? 'У вас уже Pro' : 'Купить Pro'}
                    </button>
                </div>

            </div>
            <p className="mt-10 text-gray-500 text-sm max-w-md text-center">
                Оплата производится через безопасный сервис LemonSqueezy. После покупки Pro вы получите полный доступ ко всем функциям AI-инструментов.
            </p>
        </div>
    )
}

export default BuyPro
