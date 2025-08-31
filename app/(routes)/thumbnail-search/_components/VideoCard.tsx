import React from 'react'
import {VideoInfo} from "@/app/(routes)/thumbnail-search/page";
import Image from "next/image";
import {Eye, ThumbsUp} from "lucide-react";

type props = {
    videoInfo: VideoInfo
}

const VideoCard = ({videoInfo}: props) => {




    return (
        <div className='p-3 border rounded-2xl cursor-pointer hover:scale-105 transition-all'>
            <Image className='rounded-xl object-cover aspect-video'
                   src={videoInfo.thumbnail} alt={videoInfo.title} width={300} height={300}
            />
            <h2>{videoInfo.title}</h2>
            <h2 className='text-xs text-gray-400'>{videoInfo.description.slice(0, 60)}...</h2>
            <div className='flex justify-between items-center mt-1'>
                <h2 className='flex gap-2 items-center text-xs text-gray-400'><Eye
                    className='w-4 h-4'/> {videoInfo.viewCount}</h2>
                <h2 className='flex gap-2 items-center text-xs text-gray-400'><ThumbsUp
                    className='w-4 h-4'/> {videoInfo.likeCount}</h2>
            </div>
        </div>
    )
}
export default VideoCard
