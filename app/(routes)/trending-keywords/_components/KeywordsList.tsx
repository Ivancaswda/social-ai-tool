import React, {useState} from 'react'

import {KeywordList, SEOKeywordData} from "@/app/(routes)/trending-keywords/page";
import {Skeleton} from "@/components/ui/skeleton";
import {Badge} from "@/components/ui/badge";


const KeywordsList = ({keywordsList, loading}: SEOKeywordData) => {

    console.log(keywordsList)


    return (
        <div className='mt-10'>
            {loading && <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                <Skeleton className='w-full rounded-lg h-10'/>
                <Skeleton className='w-full rounded-lg h-10'/>
                <Skeleton className='w-full rounded-lg h-10'/>
                <Skeleton className='w-full rounded-lg h-10'/>
                <Skeleton className='w-full rounded-lg h-10'/>
            </div>}
            {keywordsList && <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='p-5 border rounded-xl'>
                    <h2 className=' text-lg text-green-600 font-semibold
                        '>Популярные ключевые слова</h2>
                    {keywordsList?.map((item, index) => (
                        <h2 key={index} className='flex items-center mt-2 justify-between bg-secondary p-2 rounded-md'>
                            {item.keyword}
                            <span className='bg-green-600 text-white rounded-full px-2 py-1'>{item.score}</span>
                        </h2>
                    ))}
                </div>

                <div className='p-5 border rounded-xl'>
                    <h2 className=' text-lg text-green-600 font-semibold
                        '>Популярные запросы</h2>
                    {keywordsList?.map((item, index) => (
                        <Badge  variant='secondary' className='m-1 text-md font-normal'>{item.relatedQueries}</Badge>
                    ))}
                </div>
            </div>}


        </div>
    )
}
export default KeywordsList
