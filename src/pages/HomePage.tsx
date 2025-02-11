import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import Container from "../components/Container";
import VideoList from "../components/VideoList";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { RootState, AppDispatch } from "../store/store";



const HomePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const videos = useSelector((state: RootState) => state.video?.videos?.docs);
    const loading = useSelector((state: RootState) => state.video?.loading);
    const hasNextPage = useSelector((state: RootState) => state.video?.videos?.hasNextPage);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getAllVideos({ page: 1, limit: 10 }));

        return () => {
            dispatch(makeVideosNull());
        };
    }, [dispatch]);

    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    const fetchMoreVideos = useCallback(() => {
        if (hasNextPage) {
            dispatch(getAllVideos({ page: page + 1, limit: 10 }))
                .then(() => {
                    setPage((prev) => prev + 1);
                })
                .catch((error) => {
                    console.error("Error loading more videos:", error);
                    setIsLoading(false);
                });
        }
    }, [page, hasNextPage, dispatch]);

    return (
        <Container>
            <InfiniteScroll
                dataLength={videos?.length || 0}
                next={fetchMoreVideos}
                hasMore={hasNextPage}
                loader={isLoading && <HomeSkeleton />}
                scrollableTarget="scrollable-container"
            >
                <div
                    className="text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll"
                    id="scrollable-container"
                >
                    {videos?.length === 0 && !loading && (
                        <div className="w-full h-screen flex justify-center items-center">
                            <h1 className="text-2xl font-bold">No videos found</h1>
                            </div>
                        )}
                    {videos?.map((video:any) => (
                        <VideoList
                            key={video._id}
                            avatar={video.ownerDetails?.avatar.url}
                            duration={video.duration}
                            title={video.title}
                            thumbnail={video.thumbnail?.url}
                            createdAt={video.createdAt}
                            views={video.views}
                            channelName={video.ownerDetails.username}
                            videoId={video._id}
                        />
                    ))}
                </div>
            </InfiniteScroll>
        </Container>
    );
};

export default HomePage;