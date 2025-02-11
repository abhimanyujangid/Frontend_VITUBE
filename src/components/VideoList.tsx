import React from "react";
import { formatDuration, timeAgo } from "../helper/timeAlgo";
import { useNavigate } from "react-router-dom";

 export interface VideoListProps {
    thumbnail: string;
    duration: number;
    title: string;
    views?: number;
    avatar?: string;
    channelName?: string;
    createdAt: string;
    videoId: string;
}

const VideoList: React.FC<VideoListProps> = ({
    thumbnail,
    duration,
    title,
    views = 0,
    avatar,
    channelName,
    createdAt,
    videoId,
}) => {
    const navigate = useNavigate();

    const handleAvatarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (channelName) navigate(`/channel/${channelName}`);
    };

    return (
        <div
            className="w-full sm:p-2 cursor-pointer"
            onClick={() => navigate(`/watch/${videoId}`)}
        >
            <div className="relative sm:h-60 h-48">
                <img
                    src={thumbnail}
                    alt="Thumbnail"
                    className="object-cover w-full h-full"
                />
                <span className="absolute bottom-2 right-2 rounded-lg text-sm bg-black py-1 px-2">
                    {formatDuration(duration)}
                </span>
            </div>
            <div className="flex items-center py-2 px-2 gap-2">
                {avatar && (
                    <div onClick={handleAvatarClick}>
                        <img
                            src={avatar}
                            alt="Channel Avatar"
                            className="w-10 h-10 rounded-full object-cover border border-slate-700"
                        />
                    </div>
                )}
                <div>
                    <h2 className="font-medium">{title}</h2>
                    <div className="text-xs space-x-1 text-slate-400">
                        <span>{views} Views</span> .
                        <span>{timeAgo(createdAt)}</span>
                    </div>
                    {channelName && (
                        <h2 className="text-xs space-x-1 text-slate-200">
                            {channelName}
                        </h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoList;
