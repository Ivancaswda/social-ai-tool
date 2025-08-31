import React from 'react'
import CoinsProgress from "@/app/(routes)/dashboard/_components/CoinProgress";

const WelcomeBanner = () => {
    return (
        <div className='p-5 rounded-xl border bg-gradient-to-r from-green-500 via-green-600 to-green-300' >

            <h1 className='text-3xl font-bold text-white'>AI-TUBE</h1>
            <p className='text-gray-200'>ИИ инструмент который поможет вам стать знаменитым на весь интернет.</p>

            <div className="mt-10 mb-4">
                <h2 className="text-xl font-bold mb-2">Осталось попыток: </h2>
                <CoinsProgress />
            </div>
        </div>
    )
}
export default WelcomeBanner
