import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";

interface User {
    id?: string;
    username: string;
    email: string;
    fullName: string;
    avatar?: string;
    coverImage?: string;
}

interface AuthState {
    loading: boolean;
    status: boolean;
    userData: User | null;
}

const initialState: AuthState = {
    loading: false,
    status: false,
    userData: null,
};

export const createAccount = createAsyncThunk(
    "register",
    async (data: any, { rejectWithValue }) => {
        const formData = new FormData();
        formData.append("avatar", data.avatar[0]);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("fullName", data.fullName);
        if (data.coverImage) {
            formData.append("coverImage", data.coverImage[0]);
        }

        try {
            const response = await axiosInstance.post("/users/register", formData);
            toast.success("Registered successfully!!!");
            return response.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const userLogin = createAsyncThunk(
    "login",
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/users/login", data);
            return response.data.data.user;
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const userLogout = createAsyncThunk("logout", async () => {
    try {
        const response = await axiosInstance.post("/users/logout");
        toast.success(response.data?.message);
        return response.data;
    } catch (error: any) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const getCurrentUser = createAsyncThunk<User>("getCurrentUser", async () => {
    const response = await axiosInstance.get("/users/current-user");
    return response.data.data;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAccount.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(userLogout.fulfilled, (state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });
    },
});

export default authSlice.reducer;
