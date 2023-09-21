import { createSlice } from "@reduxjs/toolkit";

type NotificationType = { status: string; title: string; message: string };
type initialStateType<T> = {
    notification: T;
};
type initialNotificationStateType = initialStateType<NotificationType>;
const initialState: initialNotificationStateType = {
    notification: { status: "good", title: "good", message: "good" },
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        showNotification(
            state,
            action: { payload: NotificationType; type: string }
        ) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
