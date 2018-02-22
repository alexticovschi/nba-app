import React from 'react';
import VideosList from '../../../widgets/VideosList/videosList';
import VideosListTemplate from '../../../widgets/VideosList/videosListTemplate';


const VideosMain = () => (
    <div>
        <VideosList 
            type="card"
            title={false}
            loadmore={true}
            start={0}
            amount={4}
        />
    </div>
)


export default VideosMain;
