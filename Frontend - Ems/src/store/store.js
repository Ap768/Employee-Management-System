import { configureStore } from "@reduxjs/toolkit";
import attendanceReducer from "./slices/attendanceSlice";
import holidayReducer from "./slices/holidaySlice";
import employeeReducer from "./slices/employeeSlice";
import leaveReducer from "./slices/leaveSlice";
import offboardingReducer from "./slices/offboardingSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        attendance: attendanceReducer,
        holiday: holidayReducer,
        employee: employeeReducer,
        leave: leaveReducer,
        offboarding: offboardingReducer,
        auth: authReducer,
    },
});

export default store;
