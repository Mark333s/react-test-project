import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./css/App.module.css";

import { Search } from "./components/SearchComponent";
import { Repositories } from "./components/RepoComponent";
import { Pagination } from "./components/PaginationComponent";

import { fetchRepositories, setCurrentPage } from "./redux/slices/repoSlice";
import { selectReposetories } from "./redux/slices/repoSlice";

const App = () => {
  const dispatch = useDispatch();
  const { currentPage, repos, searchValue } = useSelector(selectReposetories);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getRepos = () => {
    dispatch(fetchRepositories({ searchValue, currentPage }));
  };

  React.useEffect(() => {
    getRepos();
  }, [currentPage, searchValue]);

  // const checkedNameRepositories = repos?.items?.filter((obj) => {
  //   if (obj.name.toLowerCase().includes("react")) {
  //     return true;
  //   }

  //   return false;
  // });

  const repositories = repos?.items?.map((obj) => (
    <Repositories {...obj} key={obj.id} />
  ));

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <Search />
        {repositories?.length < 1 ? (
          <p className={styles.errorText}>
            По Вашому запиту не знайдено жодного репозиторія
          </p>
        ) : (
          repositories
        )}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </div>
  );
};

export default App;
