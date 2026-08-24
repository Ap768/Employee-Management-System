import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    checkIn,
    checkOut,
    getTodayAttendance,
    getAttendanceHistory,
    getAllEmployeesAttendanceByDate
} from "../../services/attendanceService";

// Async Thunk: Fetch Today's Attendance
export const fetchTodayAttendance = createAsyncThunk(
    "attendance/fetchTodayAttendance",
    async (email, { rejectWithValue }) => {
        try {
            const response = await getTodayAttendance(email);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch today's attendance");
        }
    }
);

// Async Thunk: Fetch Attendance History
export const fetchAttendanceHistory = createAsyncThunk(
    "attendance/fetchAttendanceHistory",
    async (email, { rejectWithValue }) => {
        try {
            const response = await getAttendanceHistory(email);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch attendance history");
        }
    }
);

// Async Thunk: Fetch All Employees Attendance by Date
export const fetchEmployeesAttendanceByDate = createAsyncThunk(
    "attendance/fetchEmployeesAttendanceByDate",
    async (date, { rejectWithValue }) => {
        try {
            const response = await getAllEmployeesAttendanceByDate(date);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch attendance by date");
        }
    }
);

// Async Thunk: Check In
export const handleCheckIn = createAsyncThunk(
    "attendance/handleCheckIn",
    async (email, { rejectWithValue }) => {
        try {
            const response = await checkIn(email);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Check In Failed");
        }
    }
);

// Async Thunk: Check Out
export const handleCheckOut = createAsyncThunk(
    "attendance/handleCheckOut",
    async (email, { rejectWithValue }) => {
        try {
            const response = await checkOut(email);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Check Out Failed");
        }
    }
);

const initialState = {
    todayAttendance: null,
    history: [],
    allEmployeesAttendance: [],
    loading: false,
    error: null,
};

const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Today's Attendance
        builder
            .addCase(fetchTodayAttendance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodayAttendance.fulfilled, (state, action) => {
                state.loading = false;
                state.todayAttendance = action.payload;
            })
            .addCase(fetchTodayAttendance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Fetch Attendance Hi story
        builder
            .addCase(fetchAttendanceHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAttendanceHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload;
            })
            .addCase(fetchAttendanceHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Fetch Employees Attendance by Date
        builder
            .addCase(fetchEmployeesAttendanceByDate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeesAttendanceByDate.fulfilled, (state, action) => {
                state.loading = false;
                state.allEmployeesAttendance = action.payload;
            })
            .addCase(fetchEmployeesAttendanceByDate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Check In
        builder
            .addCase(handleCheckIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleCheckIn.fulfilled, (state, action) => {
                state.loading = false;
                state.todayAttendance = action.payload;
            })
            .addCase(handleCheckIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Check Out
        builder
            .addCase(handleCheckOut.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleCheckOut.fulfilled, (state, action) => {
                state.loading = false;
                state.todayAttendance = action.payload;
            })
            .addCase(handleCheckOut.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = attendanceSlice.actions;
export default attendanceSlice.reducer;
