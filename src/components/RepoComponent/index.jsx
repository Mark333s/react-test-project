import React from "react";

import styles from "../RepoComponent/Repo.module.css";

import {star, userIcon } from "../../assets/constants/img";

export const Repositories = ({
  name,
  login,
  stargazers_count,
  watchers_count,
  language,
  description,
  owner,
}) => {
  const userImage = owner.avatar_url;
  const repoName = name;
  const author = login;
  const stars = stargazers_count;
  const watchers = watchers_count;

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.imgContainer}>
          <img src={userImage} alt="userImage" width="128px" height="144px" />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.repoText}>{repoName}</h3>
          <p className={styles.secondaryText}>{author}</p>
          <p className={styles.secondaryText}>{language}</p>
          <p className={styles.secondaryText}>{description}</p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.starContainer}>
          <div className={styles.imgContainerStar}>
            <img src={star} alt="star" width="28px" height="28px" />
          </div>
          <div className={styles.allTextContainer}>
            <p className={styles.altText}>{stars}</p>
            <p className={styles.starText}>stars</p>
          </div>
        </div>
        <div className={styles.iconContainer}>
          <img src={userIcon} alt="userIcon" />
          <p className={styles.altText}>{watchers} watchers</p>
        </div>
      </div>
    </div>
  );
};
