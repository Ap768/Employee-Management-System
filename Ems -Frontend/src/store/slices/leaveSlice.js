import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMyLeaves, applyLeave, approveLeave, rejectLeave, getAllLeaves } from "../../services/leaveService";

// Async Thunk: Fetch My Leaves
export const fetchMyLeaves = createAsyncThunk(
    "leave/fetchMyLeaves",
    async (email, { rejectWithValue }) => {
        try {
            const response = await getMyLeaves(email);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to load leaves");
        }
    }
);

// Async Thunk: Fetch All Leave Requests
export const fetchAllLeaveRequests = createAsyncThunk(
    "leave/fetchAllLeaveRequests",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllLeaves();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to load leave requests");
        }
    }
);

// Async Thunk: Apply for Leave
export const applyForLeave = createAsyncThunk(
    "leave/applyForLeave",
    async (leaveData, { rejectWithValue }) => {
        try {
            const response = await applyLeave(leaveData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to apply for leave");
        }
    }
);

// Async Thunk: Approve Leave
export const approveLeaveRequest = createAsyncThunk(
    "leave/approveLeaveRequest",
    async (id, { rejectWithValue }) => {
        try {
            const response = await approveLeave(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to approve leave");
        }
    }
);

// Async Thunk: Reject Leave
export const rejectLeaveRequest = createAsyncThunk(
    "leave/rejectLeaveRequest",
    async (id, { rejectWithValue }) => {
        try {
            const response = await rejectLeave(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to reject leave");
        }
    }
);

const initialState = {
    myLeaves: [],
    allLeaveRequests: [],
    loading: false,
    error: null,
};

const leaveSlice = createSlice({
    name: "leave",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch My Leaves
        builder
            .addCase(fetchMyLeaves.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyLeaves.fulfilled, (state, action) => {
                state.loading = false;
                state.myLeaves = action.payload;
            })
            .addCase(fetchMyLeaves.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Fetch All Leave Requests
        builder
            .addCase(fetchAllLeaveRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllLeaveRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.allLeaveRequests = action.payload;
            })
            .addCase(fetchAllLeaveRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Apply for Leave
        builder
            .addCase(applyForLeave.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(applyForLeave.fulfilled, (state, action) => {
                state.loading = false;
                state.myLeaves.push(action.payload);
            })
            .addCase(applyForLeave.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Approve Leave
        builder
            .addCase(approveLeaveRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(approveLeaveRequest.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.allLeaveRequests.findIndex(l => l.id === action.payload.id);
                if (index !== -1) {
                    state.allLeaveRequests[index] = action.payload;
                }
            })
            .addCase(approveLeaveRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Reject Leave
        builder
            .addCase(rejectLeaveRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rejectLeaveRequest.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.allLeaveRequests.findIndex(l => l.id === action.payload.id);
                if (index !== -1) {
                    state.allLeaveRequests[index] = action.payload;
                }
            })
            .addCase(rejectLeaveRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = leaveSlice.actions;
export default leaveSlice.reducer;
