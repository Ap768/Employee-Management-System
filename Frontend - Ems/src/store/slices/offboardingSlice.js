import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createOffboarding,
    getAllOffboarding,
    deleteOffboarding,
    completeOffboarding
} from "../../services/offboardingService";

// Async Thunk: Fetch All Offboarding
export const fetchAllOffboarding = createAsyncThunk(
    "offboarding/fetchAllOffboarding",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllOffboarding();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to load offboarding records");
        }
    }
);

// Async Thunk: Create Offboarding
export const createNewOffboarding = createAsyncThunk(
    "offboarding/createNewOffboarding",
    async (offboardingData, { rejectWithValue }) => {
        try {
            const response = await createOffboarding(offboardingData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to create offboarding");
        }
    }
);

// Async Thunk: Delete Offboarding
export const removeOffboarding = createAsyncThunk(
    "offboarding/removeOffboarding",
    async (id, { rejectWithValue }) => {
        try {
            await deleteOffboarding(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete offboarding");
        }
    }
);

// Async Thunk: Complete Offboarding
export const finishOffboarding = createAsyncThunk(
    "offboarding/finishOffboarding",
    async (id, { rejectWithValue }) => {
        try {
            const response = await completeOffboarding(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to complete offboarding");
        }
    }
);

const initialState = {
    offboardingList: [],
    loading: false,
    error: null,
};

const offboardingSlice = createSlice({
    name: "offboarding",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch All Offboarding
        builder
            .addCase(fetchAllOffboarding.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOffboarding.fulfilled, (state, action) => {
                state.loading = false;
                state.offboardingList = action.payload;
            })
            .addCase(fetchAllOffboarding.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Create Offboarding
        builder
            .addCase(createNewOffboarding.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewOffboarding.fulfilled, (state, action) => {
                state.loading = false;
                state.offboardingList.push(action.payload);
            })
            .addCase(createNewOffboarding.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete Offboarding
        builder
            .addCase(removeOffboarding.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeOffboarding.fulfilled, (state, action) => {
                state.loading = false;
                state.offboardingList = state.offboardingList.filter(
                    item => item.id !== action.payload
                );
            })
            .addCase(removeOffboarding.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Complete Offboarding
        builder
            .addCase(finishOffboarding.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(finishOffboarding.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.offboardingList.findIndex(
                    item => item.id === action.payload.id
                );
                if (index !== -1) {
                    state.offboardingList[index] = action.payload;
                }
            })
            .addCase(finishOffboarding.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = offboardingSlice.actions;
export default offboardingSlice.reducer;
