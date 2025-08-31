'use client'
import React from 'react'
import CoinsProgress from "@/app/(routes)/dashboard/_components/CoinProgress"
import { useAuth } from "@/context/useAuth"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

const WelcomeBanner = () => {
    const { user } = useAuth()

    return (
        <div className="p-5 rounded-xl border bg-gradient-to-r from-green-500 via-green-600 to-green-300 shadow-xl">
            <h1 className="text-3xl font-bold text-white">AI-TUBE</h1>
            <p className="text-gray-200">
                ИИ инструмент который поможет вам стать знаменитым на весь интернет.
            </p>

            <div className="mt-10 mb-4">
                {user?.isPro ? (
                    <motion.div
                        className="flex flex-col items-center justify-center bg-white/10 p-6 rounded-2xl shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Sparkles className="w-12 h-12 text-green-300 animate-pulse mb-2" />
                        <h2 className="text-2xl font-bold text-green-300 drop-shadow">
                            У вас активна Pro подписка!
                        </h2>
                        <p className="text-green-100 mt-1 text-sm">
                            Доступ к безлимитным генерациям и функциям открыт 🎉
                        </p>
                    </motion.div>
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-2 text-white">Осталось попыток:</h2>
                        <CoinsProgress />
                    </>
                )}
            </div>
        </div>
    )
}

export default WelcomeBanner