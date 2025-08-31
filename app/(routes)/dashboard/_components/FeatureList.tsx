import React from 'react'
import Link from "next/link";
import Image from "next/image";

const FeatureList = () => {
    const Features = [
        {
            id: 1,
            title: 'Искать по превью',
            image: '/feature1.png',
            path: '/thumbnail-search'
        },
        {
            id: 2,
            title: 'Аутлаер ИИ',
            image: '/ai-outlier.png',
            path: '/outlier'
        },
        {
            id: 3,
            title: 'ИИ генератор контента',
            image: '/ai-content-generator.png',
            path: '/ai-content-generator'
        },
        {
            id: 4,
            title: 'Ключевые слова ИИ',
            image: '/ai-keywords.png',
            path: '/trending-keywords'
        }
    ]

    return (
        <section className="mt-10">
            <h2 className="font-bold text-3xl text-center text-green-600 mb-8">
                AI-инструменты
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Features.map((item) => (
                    <Link
                        key={item.id}
                        href={item.path}
                        className="group block rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
                    >
                        <div className="relative w-full aspect-video">
                            <Image
                                fill
                                src={item.image}
                                alt={item.title}
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-green-600">
                                {item.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default FeatureList
