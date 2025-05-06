import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { api } from "../../Api/api";
import { rtkQueryErrorLogger } from "../../Api/errorLogger";
import saveHeaderTitleSlice from "../slice/headerTitleSlice";
import saveNotificationSlice from "../slice/notificationSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    saveHeaderTitleSlice: saveHeaderTitleSlice,
    saveNotificationSlice: saveNotificationSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger);
  },
});

export default store;
