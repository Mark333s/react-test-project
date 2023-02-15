import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  repos: [],
  currentPage: 1,
  searchValue: "react",
};

export const fetchRepositories = createAsyncThunk(
  "repositories/fetchRepositories",
  async (params) => {
    const { currentPage, searchValue } = params;
    if (searchValue.length < 1) {
      console.log("checkedSearchValue");
      const checkedSearchValue = "react";
      const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=${checkedSearchValue}&page=${currentPage}&per_page=3`
      );

      return data;
    }
    const { data } = await axios.get(
      `https://api.github.com/search/repositories?q=${searchValue}&page=${currentPage}&per_page=3`
    );

    return data;
  }
);

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
