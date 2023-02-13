import React, { useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import styles from "../SearchComponent/Search.module.css";

import { setSearchValue } from "../../redux/slices/repoSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        placeholder="Search"
        value={value}
        onChange={onChangeInput}
      ></input>
    </div>
  );
};
