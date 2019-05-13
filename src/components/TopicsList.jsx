import React, { Component } from "react";
import { getTopics } from "../api.js";

class TopicsList extends Component {
  state = {
    topics: null,
    loading: true
  };
  componentDidMount() {
    getTopics().then(topics => {
      this.setState({ topics, loading: false });
    });
  }
  render() {
    const { topics, loading } = this.state;
    return loading ? (
      <p>loading...</p>
    ) : (
      <ul>
        {topics.map((topic, index) => {
          return <li key={index}>{topic.slug}</li>;
        })}
      </ul>
    );
  }
}

export default TopicsList;
