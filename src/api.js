import Axios from "axios";
const url = " https://nc-news-joseph-kempster.herokuapp.com/api";

const getArticles = () => {
  return Axios.get(`${url}/articles`).then(({ data: { articles } }) => {
    return articles;
  });
};

export default getArticles;
