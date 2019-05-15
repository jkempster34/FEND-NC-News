import React, { Component } from "react";
import { getArticleById } from "../api.js";
import CommentsForArticle from "../components/CommentsForArticle.jsx";

class SingleArticle extends Component {
  state = {
    article: null,
    loading: true
  };
  componentDidMount = () => {
    getArticleById(this.props.article_id).then(article =>
      this.setState({ article, loading: false })
    );
  };
  render() {
    const { article, loading } = this.state;
    const { state: locationState } = this.props.location;
    return loading ? (
      <p>loading...</p>
    ) : (
      <div>
        {locationState && locationState.new && <p>Here, is your article:</p>}
        COMMENTS: {article.comment_count}
        AUTHOR : {article.author}
        CREATED_AT: {article.created_at}
        VOTES: {article.votes}
        BODY: {article.body}
        <p>....</p>
        <h4>Comments</h4>
        <CommentsForArticle articleId={this.props.article_id} />
      </div>
    );
  }
}

export default SingleArticle;
