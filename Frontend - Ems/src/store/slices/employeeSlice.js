import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "../../services/employeeService";

// Async Thunk: Fetch Employees
export const fetchEmployees = createAsyncThunk(
    "employee/fetchEmployees",
    async (page = 0, { rejectWithValue }) => {
        try {
            const response = await getEmployees(page);
            const data = response.data;

            // Keep the full page metadata so the UI can show pagination controls
            if (data && typeof data === "object" && Array.isArray(data.content)) {
                return data;
            }

            if (Array.isArray(data)) {
                return { content: data, number: 0, totalPages: 1 };
            }

            return { content: [], number: 0, totalPages: 1 };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to load employees");
        }
    }
);

// Async Thunk: Add Employee
export const createNewEmployee = createAsyncThunk(
    "employee/createNewEmployee",
    async (employeeData, { rejectWithValue }) => {
        try {
            const response = await addEmployee(employeeData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add employee");
        }
    }
);

// Async Thunk: Update Employee
export const updateExistingEmployee = createAsyncThunk(
    "employee/updateExistingEmployee",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await updateEmployee(id, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update employee");
        }
    }
);

// Async Thunk: Delete Employee
export const removeEmployee = createAsyncThunk(
    "employee/removeEmployee",
    async (id, { rejectWithValue }) => {
        try {
            await deleteEmployee(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete employee");
        }
    }
);

const initialState = {
    employees: [],
    currentPage: 0,
    totalPages: 1,
    loading: false,
    error: null,
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Employees
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;

                if (action.payload && typeof action.payload === "object" && !Array.isArray(action.payload) && action.payload.content) {
                    state.employees = action.payload.content;
                    state.currentPage = action.payload.number ?? 0;
                    state.totalPages = action.payload.totalPages ?? 1;
                } else {
                    state.employees = Array.isArray(action.payload) ? action.payload : [];
                    state.currentPage = 0;
                    state.totalPages = 1;
                }
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Add Employee
        builder
            .addCase(createNewEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees.push(action.payload);
            })
            .addCase(createNewEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Update Employee
        builder
            .addCase(updateExistingEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateExistingEmployee.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.employees.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
            })
            .addCase(updateExistingEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete Employee
        builder
            .addCase(removeEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = state.employees.filter(e => e.id !== action.payload);
            })
            .addCase(removeEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
