import React from 'react'
import {VideoInfo} from "@/app/(routes)/thumbnail-search/page";
import VideoCard from "@/app/(routes)/thumbnail-search/_components/VideoCard";

type Props = {
    videoList: VideoInfo[] | undefined,
    SearchSimilarThumbnail: any
}

const YoutubeSearchList = ({videoList, SearchSimilarThumbnail}:  Props) => {




    return (
        <div className='mt-7'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
                {videoList && videoList.map((video, index) => (
                   <div onClick={() => SearchSimilarThumbnail(video.thumbnail)}>
                       <VideoCard videoInfo={video} key={index}/>
                   </div>


                ))}
            </div>
        </div>
    )
}
export default YoutubeSearchList
