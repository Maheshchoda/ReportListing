import React, { Component } from "react";
import axios from "axios";
const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_REPORTS":
      return {
        ...state,
        report_list: action.payload,
        heading: "Search Results"
      };
    case "FILTER_ITEMS":
      return {
        ...state,
        report_list: action.payload,
        heading: "Filterd Results"
      };
    case "SORT_REPORTS":
      return {
        ...state,
        report_list: action.payload,
        heading: "Sorted Results"
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    report_list: [],
    heading: "Top 10 Reports",
    dispatch: action => this.setState(state => reducer(state, action))
  };

  async componentDidMount() {
    await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=US&f_has_lyrics=1
        &apikey=${process.env.REACT_APP_RL_KEY}`
      )
      .then(result => {
        this.setState({
          report_list: result.data.message.body.track_list,
          heading: "Top 10 Reports"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
