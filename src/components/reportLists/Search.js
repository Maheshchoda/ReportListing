import React, { Component } from "react";
import axios from "axios";
import Spinner from "../layout/Spinner";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    reportTitle: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (dispatch, e) => {
    e.preventDefault();
    if (!this.state.reportTitle) return;
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=${
          this.state.reportTitle
        }&page_size=10&page=1&s_track_rating=desc
        &apikey=${process.env.REACT_APP_RL_KEY}`
      )
      .then(result => {
        console.log(result);
        dispatch({
          type: "SEARCH_REPORTS",
          payload: result.data.message.body.track_list
        });
        this.setState({ reportTitle: "" });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h3 className="display-4 text-center">Search For A Report</h3>
              <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    name="reportTitle"
                    placeholder="Ex: Sarkar, Irumugan..."
                    value={this.state.reportTitle}
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get the Report
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
