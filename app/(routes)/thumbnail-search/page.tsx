'use client'

import axios from 'axios'
import React, {useState} from 'react'
import {Button} from "@/components/ui/button";
import {Loader2Icon, Search} from "lucide-react";
import YoutubeSearchList from "@/app/(routes)/thumbnail-search/_components/YoutubeSearchList";
import {Skeleton} from "@/components/ui/skeleton";
import VideoListSkeleton from "@/app/_components/VideoListSkeleton";

export type VideoInfo = {
    id: string,
    title: string,
    description: string,
    thumbnail: string,
    channelTitle: string,
    viewCount: string,
    publishedAt: string,
    commentCount: string,
    likeCount: string,

}



const ThumbnailSearch = () => {

    const [userInput, setUserInput] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [videoList, setVideoList] = useState<VideoInfo[]>()
    const onSearch = async () => {
        setLoading(true)
        const result = await axios.get('/api/thumbnail-search?query=' + userInput)
        console.log(result.data)
        setVideoList(result.data)
        setLoading(false)
    }


    const SearchSimilarThumbnail = async (url: string) => {
        setLoading(true)
        const result = await axios.get('/api/thumbnail-search?thumbnailUrl=' + url)
        console.log(result.data)
        setVideoList(result.data)
        setLoading(false)
    }

    return (
        <div>
            <div className='px-10 md:px-20 lg:px-40'>
                <div className='flex items-center justify-center mt-20 flex-col gap-2  '>
                    <h2 className='font-semibold text-3xl'>Ai thumbnail search ✝</h2>
                    <p className='text-gray-400 text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Dignissimos dolor eos magnam nam necessitatibus odio ratione rem tempora vitae voluptas.</p>
                </div>
                <div className='max-w-2xl p-2 rounded-xl flex gap-2 items-center mt-5 '>
                    <input value={userInput} onChange={(e) => setUserInput(e.target.value)} type="text" placeholder='Enter any value to search' className='outline-none w-full p-2'/>
                    <Button disabled={loading || !userInput} onClick={onSearch}>{loading ? <Loader2Icon className='animate-spin'/> : <Search/> }  Search</Button>
                </div>
            </div>

            <div>
                {loading ? <VideoListSkeleton/> : <YoutubeSearchList SearchSimilarThumbnail={(url) => SearchSimilarThumbnail(url)}
                                            videoList={videoList}/>
                }
            </div>
        </div>
    )
}
export default ThumbnailSearch
