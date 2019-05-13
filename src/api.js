import Axios from "axios";
const url = " https://nc-news-joseph-kempster.herokuapp.com/api";

export const getArticles = () => {
  return Axios.get(`${url}/articles`).then(({ data: { articles } }) => {
    return articles;
  });
};

export const getUser = username => {
  return Axios.get(`${url}/users/${username}`).then(({ data: { user } }) => {
    return user;
  });
};

export const getTopics = () => {
  return Axios.get(`${url}/topics/`).then(({ data: { topics } }) => {
    return topics;
  });
};
