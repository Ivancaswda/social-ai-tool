import React from 'react'
import {Skeleton} from "@/components/ui/skeleton";

const VideoListSkeleton = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                <div key={index} className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl"/>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]"/>
                        <Skeleton className="h-4 w-[200px]"/>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default VideoListSkeleton
