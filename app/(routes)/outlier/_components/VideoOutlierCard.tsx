import React from 'react'
import {VideoInfo} from "@/app/(routes)/thumbnail-search/page";
import Image from "next/image";
import {Eye, ThumbsUp} from "lucide-react";
import {VideoInfoOutlier} from "@/app/(routes)/outlier/page";
import {
    Tooltip,
    TooltipContent, TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
type props = {
    videoInfo: VideoInfoOutlier
}

const VideoOutlierCard = ({videoInfo}: props) => {




    return (
        <TooltipProvider>
            <div className='p-3 border rounded-2xl relative cursor-pointer hover:scale-105 transition-all'>
            <Tooltip>
                <TooltipTrigger asChild><h2
                    className='absolute right-3 p-1 bg-green-600 text-white rounded'>{videoInfo.smartScore}x</h2>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Выброс и смарт-оценка</p>
                </TooltipContent>
            </Tooltip>

            <Image className='rounded-xl object-cover aspect-video'
                   src={videoInfo.thumbnail} alt={videoInfo.title} width={300} height={300}
            />
            <h2>{videoInfo.title}</h2>
            <h2 className='text-xs text-gray-400'>{videoInfo.description.slice(0, 60)}...</h2>
            <div className='flex justify-between items-center mt-1'>
                <h2 className='flex gap-2 items-center text-xs text-gray-400'><Eye
                    className='w-4 h-4'/> {videoInfo.viewCount}</h2>

                <Tooltip>
                    <TooltipTrigger asChild><h2
                        className='flex gap-2 items-center text-xs text-gray-100 p-2 bg-red-500 rounded-sm'><ThumbsUp
                        className='w-4 h-4'/> {videoInfo.smartScore}</h2>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Рейтинг вовлеченности</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
        </TooltipProvider>
    )
}
export default VideoOutlierCard
