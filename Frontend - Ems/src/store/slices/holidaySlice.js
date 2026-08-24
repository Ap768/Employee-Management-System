import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllHolidays,
    getUpcomingHolidays,
    addHoliday,
    updateHoliday,
    deleteHoliday
} from "../../services/holidayService";

// Async Thunk: Fetch All Holidays
export const fetchAllHolidays = createAsyncThunk(
    "holiday/fetchAllHolidays",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllHolidays();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to load holidays");
        }
    }
);

// Async Thunk: Fetch Upcoming Holidays
export const fetchUpcomingHolidays = createAsyncThunk(
    "holiday/fetchUpcomingHolidays",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUpcomingHolidays();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to load upcoming holidays");
        }
    }
);

// Async Thunk: Add Holiday
export const createNewHoliday = createAsyncThunk(
    "holiday/createNewHoliday",
    async (holidayData, { rejectWithValue }) => {
        try {
            const response = await addHoliday(holidayData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add holiday");
        }
    }
);

// Async Thunk: Update Holiday
export const updateExistingHoliday = createAsyncThunk(
    "holiday/updateExistingHoliday",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await updateHoliday(id, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update holiday");
        }
    }
);

// Async Thunk: Delete Holiday
export const removeHoliday = createAsyncThunk(
    "holiday/removeHoliday",
    async (id, { rejectWithValue }) => {
        try {
            await deleteHoliday(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete holiday");
        }
    }
);

const initialState = {
    holidays: [],
    upcomingHolidays: [],
    loading: false,
    error: null,
};

const holidaySlice = createSlice({
    name: "holiday",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch All Holidays
        builder
            .addCase(fetchAllHolidays.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllHolidays.fulfilled, (state, action) => {
                state.loading = false;
                state.holidays = action.payload;
            })
            .addCase(fetchAllHolidays.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Fetch Upcoming Holidays
        builder
            .addCase(fetchUpcomingHolidays.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUpcomingHolidays.fulfilled, (state, action) => {
                state.loading = false;
                state.upcomingHolidays = action.payload;
            })
            .addCase(fetchUpcomingHolidays.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Add Holiday
        builder
            .addCase(createNewHoliday.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewHoliday.fulfilled, (state, action) => {
                state.loading = false;
                state.holidays.push(action.payload);
            })
            .addCase(createNewHoliday.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Update Holiday
        builder
            .addCase(updateExistingHoliday.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateExistingHoliday.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.holidays.findIndex(h => h.id === action.payload.id);
                if (index !== -1) {
                    state.holidays[index] = action.payload;
                }
            })
            .addCase(updateExistingHoliday.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete Holiday
        builder
            .addCase(removeHoliday.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeHoliday.fulfilled, (state, action) => {
                state.loading = false;
                state.holidays = state.holidays.filter(h => h.id !== action.payload);
            })
            .addCase(removeHoliday.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = holidaySlice.actions;
export default holidaySlice.reducer;
