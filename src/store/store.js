import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import categoriesSlice from "../features/categoriesSlice";
import communitySlice from "../features/communitySlice";
import commentarSlice from "../features/commentarSlice";
import casesSlice from "../features/casesSlice";
import eduSlice from "../features/eduSlice";

const store = configureStore({
  reducer: {
    users: userSlice,
    categories: categoriesSlice,
    communities: communitySlice,
    commentars: commentarSlice,
    cases: casesSlice,
    educations: eduSlice,
  },
});

export default store;
