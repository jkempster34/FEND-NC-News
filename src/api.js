import Axios from "axios";
const url = " https://nc-news-joseph-kempster.herokuapp.com/api";

export const getArticles = query => {
  return Axios.get(`${url}/articles`, {
    params: query
  }).then(({ data }) => {
    return data;
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

export const getArticleById = article_id => {
  return Axios.get(`${url}/articles/${article_id}`).then(
    ({ data: { article } }) => {
      return article;
    }
  );
};

export const getCommentsByArticleId = article_id => {
  return Axios.get(`${url}/articles/${article_id}/comments`).then(
    ({ data: { comments } }) => {
      return comments;
    }
  );
};

export const postArticle = body => {
  return Axios.post(`${url}/articles/`, body).then(({ data: { article } }) => {
    return article;
  });
};

export const patchArticle = (id, voteDirection) => {
  return Axios.patch(`${url}/articles/${id}`, voteDirection).then(
    ({ data: { article } }) => {
      return article;
    }
  );
};

export const postComment = (articleId, body) => {
  return Axios.post(`${url}/articles/${articleId}/comments`, body).then(
    ({ data: { comment } }) => {
      return comment;
    }
  );
};

export const patchComment = (commentId, voteDirection) => {
  return Axios.patch(`${url}/comments/${commentId}/`, voteDirection).then(
    ({ data: { article } }) => {
      return article;
    }
  );
};

export const deleteComment = commentId => {
  return Axios.delete(`${url}/comments/${commentId}`);
};
