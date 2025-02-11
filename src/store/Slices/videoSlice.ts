import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";

interface Video {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    isPublished: boolean;
}

interface VideosState {
    loading: boolean;
    uploading: boolean;
    uploaded: boolean;
    videos: {
        docs: Video[];
        hasNextPage: boolean;
    };
    video: Video | null;
    publishToggled: boolean;
}

const initialState: VideosState = {
    loading: false,
    uploading: false,
    uploaded: false,
    videos: {
        docs: [],
        hasNextPage: false,
    },
    video: null,
    publishToggled: false,
};

interface GetAllVideosParams {
    userId?: string;
    sortBy?: string;
    sortType?: string;
    query?: string;
    page?: number;
    limit?: number;
}

export const getAllVideos = createAsyncThunk(
    "getAllVideos",
    async (params: GetAllVideosParams) => {
        try {
            const url = new URL(`${BASE_URL}/video`);

            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) url.searchParams.set(key, value.toString());
            });

            const response = await axiosInstance.get(url.toString());
            return response.data.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

interface PublishVideoParams {
    title: string;
    description: string;
    videoFile: File[];
    thumbnail: File[];
}

export const publishAvideo = createAsyncThunk(
    "publishAvideo",
    async (data: PublishVideoParams) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("videoFile", data.videoFile[0]);
        formData.append("thumbnail", data.thumbnail[0]);

        try {
            const response = await axiosInstance.post("/video", formData);
            toast.success(response?.data?.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

interface UpdateVideoParams {
    videoId: string;
    data: {
        title: string;
        description: string;
        thumbnail: File[];
    };
}

export const updateAVideo = createAsyncThunk(
    "updateAVideo",
    async ({ videoId, data }: UpdateVideoParams) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("thumbnail", data.thumbnail[0]);

        try {
            const response = await axiosInstance.patch(`/video/v/${videoId}`, formData);
            toast.success(response?.data?.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const deleteAVideo = createAsyncThunk(
    "deleteAVideo",
    async (videoId: string) => {
        try {
            const response = await axiosInstance.delete(`/video/v/${videoId}`);
            toast.success(response?.data?.message);
            return response.data.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const getVideoById = createAsyncThunk(
    "getVideoById",
    async (videoId: string) => {
        try {
            const response = await axiosInstance.get(`/video/v/${videoId}`);
            return response.data.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const togglePublishStatus = createAsyncThunk(
    "togglePublishStatus",
    async (videoId: string) => {
        try {
            const response = await axiosInstance.patch(`/video/toggle/publish/${videoId}`);
            toast.success(response.data.message);
            return response.data.data.isPublished;
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        updateUploadState: (state) => {
            state.uploading = false;
            state.uploaded = false;
        },
        makeVideosNull: (state) => {
            state.videos.docs = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllVideos.fulfilled, (state, action: PayloadAction<{ docs: Video[]; hasNextPage: boolean }>) => {
            state.loading = false;
            state.videos.docs = [...state.videos.docs, ...action.payload.docs];
            state.videos.hasNextPage = action.payload.hasNextPage;
        });
        builder.addCase(publishAvideo.pending, (state) => {
            state.uploading = true;
        });
        builder.addCase(publishAvideo.fulfilled, (state) => {
            state.uploading = false;
            state.uploaded = true;
        });
        builder.addCase(updateAVideo.pending, (state) => {
            state.uploading = true;
        });
        builder.addCase(updateAVideo.fulfilled, (state) => {
            state.uploading = false;
            state.uploaded = true;
        });
        builder.addCase(deleteAVideo.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(getVideoById.fulfilled, (state, action: PayloadAction<Video>) => {
            state.loading = false;
            state.video = action.payload;
        });
        builder.addCase(togglePublishStatus.fulfilled, (state) => {
            state.publishToggled = !state.publishToggled;
        });
    },
});

export const { updateUploadState, makeVideosNull } = videoSlice.actions;

export default videoSlice.reducer;