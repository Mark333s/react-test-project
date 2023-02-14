import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./css/App.module.css";

import { Search } from "./components/SearchComponent";
import { Repositories } from "./components/RepoComponent";
import { Pagination } from "./components/PaginationComponent";

import { fetchRepositories, setCurrentPage } from "./redux/slices/repoSlice";
import { selectReposetories } from "./redux/slices/repoSlice";

const App = () => {
  const [status, setStatus] = React.useState(false);
  console.log(status, "status");
  const dispatch = useDispatch();
  const { currentPage, repos, searchValue } = useSelector(selectReposetories);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getRepos = () => {
    dispatch(fetchRepositories({ currentPage }));
  };

  React.useEffect(() => {
    getRepos();
  }, [currentPage]);

  const checkedNameRepositories = repos.filter((obj) => {
    if (obj.name.toLowerCase().includes("react")) {
      return true;
    }

    return false;
  });

  const repositories = checkedNameRepositories
    .filter((obj) => {
      if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <Repositories {...obj} key={obj.id} />);

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <Search />
        {repositories.length > 0 ? (
          repositories
        ) : (
          <p className={styles.errorText}>
            По Вашому запиту не знайдено жодного репозиторія{" "}
          </p>
        )}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </div>
  );
};

export default App;
