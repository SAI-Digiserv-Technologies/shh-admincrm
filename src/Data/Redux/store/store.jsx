import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { api } from "../../Api/api";
import { rtkQueryErrorLogger } from "../../Api/errorLogger";

const 
store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger);
  },
});

export default store;
