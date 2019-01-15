import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";
import Spinner from "../layout/Spinner";
import List from "./List";

class Lists extends Component {
  handleFilter = (report_list, dispatch, e) => {
    if (e.target.checked) {
      const unFilterd = [...report_list];
      const filterList = unFilterd.filter(key => key.track.track_rating >= 100);
      return dispatch({
        type: "FILTER_ITEMS",
        payload: filterList
      });
    } else {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=US&f_has_lyrics=1
          &apikey=${process.env.REACT_APP_RL_KEY}`
        )
        .then(result => {
          dispatch({
            type: "FILTER_ITEMS",
            payload: result.data.message.body.track_list
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  handleSortTime = (report_list, dispatch) => {
    let self = this;
    this.asc = !this.asc;
    const unSorted = [...report_list];
    const sortByTime = unSorted.sort(function(a, b) {
      let A = Date.parse(a.track.updated_time);
      let B = Date.parse(b.track.updated_time);
      return A > B ? (self.asc ? 1 : -1) : A < B ? (self.asc ? -1 : 1) : 0;
    });
    dispatch({
      type: "SORT_REPORTS",
      payload: sortByTime
    });
  };
  handleSortCost = (report_list, dispatch) => {
    let self = this;
    this.asc = !this.asc;
    const unSorted = [...report_list];
    const sortByCost = unSorted.sort(function(a, b) {
      let A = parseInt(a.track.track_rating);
      let B = parseInt(b.track.track_rating);
      return A > B ? (self.asc ? 1 : -1) : A < B ? (self.asc ? -1 : 1) : 0;
    });
    console.log(sortByCost);
    dispatch({
      type: "SORT_REPORTS",
      payload: sortByCost
    });
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { report_list, heading, dispatch } = value;
          if (report_list === "undefined" || report_list.length === 0) {
            return <Spinner />;
          } else {
            return (
              <React.Fragment>
                <nav className="navbar sticky-top navbar-expand-sm navbar-light bg-light">
                  <a href="" className="navbar-brand">
                    {heading}
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Sort
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <a
                            onClick={this.handleSortCost.bind(
                              this,
                              report_list,
                              dispatch
                            )}
                            className="dropdown-item"
                            href="#"
                          >
                            By Cost
                          </a>
                          <a
                            onClick={this.handleSortTime.bind(
                              this,
                              report_list,
                              dispatch
                            )}
                            className="dropdown-item"
                            href="#"
                          >
                            By Time
                          </a>
                        </div>
                      </li>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Filter
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-form"
                          aria-labelledby="navbarDropdown"
                        >
                          <label className="checkbox">
                            <input
                              type="checkbox"
                              onChange={this.handleFilter.bind(
                                this,
                                report_list,
                                dispatch
                              )}
                            />
                            Above ₹100
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="container mt-4">
                  <div className="row">
                    {report_list.map(item => (
                      <List key={item.track.track_id} list={item.track} />
                    ))}
                  </div>
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Lists;
