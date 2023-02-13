import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRepositories = createAsyncThunk(
  "repositories/fetchRepositories",
  async (params) => {
    const { currentPage } = params;
    const { data } = await axios.get(
      `https://api.github.com/orgs/reactjs/repos?page=${currentPage}&per_page=3`
    );

    return data;
  }
);

const initialState = {
  repos: [],
  currentPage: 1,
  searchValue: "",
};

export const repoSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    setRepo(state, action) {
      state.repos = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: {
    [fetchRepositories.pending]: (state) => {
      state.status = "loading";
      state.repos = [];
    },
    [fetchRepositories.fulfilled]: (state, action) => {
      state.repos = action.payload;
      state.status = "success";
    },
    [fetchRepositories.rejected]: (state) => {
      state.status = "error";
      state.repos = [];
    },
  },
});

export const selectReposetories = (state) => state.repositories;

export const { setRepo, setCurrentPage, setSearchValue } = repoSlice.actions;

export default repoSlice.reducer;
