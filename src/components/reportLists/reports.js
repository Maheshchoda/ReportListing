import React, { Component } from "react";
import Moment from "react-moment";
import axios from "axios";
import Mordor from "./mordorintelligence.jpg";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

class Report extends Component {
  state = {
    description: {},
    report: {}
  };

  async componentDidMount() {
    await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }
    &apikey=${process.env.REACT_APP_RL_KEY}`
      )
      .then(result => {
        this.setState({ description: result.data.message.body.lyrics });

        return axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
              this.props.match.params.id
            }
        &apikey=${process.env.REACT_APP_RL_KEY}`
          )
          .then(result => {
            this.setState({ report: result.data.message.body.track });
          });
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  render() {
    const { description, report } = this.state;
    if (
      description === "undefined" ||
      report === "undefined" ||
      Object.keys(description).length === 0 ||
      Object.keys(report).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/ReportListing" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card-group">
            <div className="card mb-3">
              <img src={Mordor} className="card-img-top" alt="Dummy data" />
              <div className="card-body">
                <h5 className="card-title">{report.track_name}</h5>
                <h6 className="card-subtitle text-muted mb-2">
                  By &nbsp;{report.artist_name}
                </h6>
                <p className="card-text">{description.lyrics_body}</p>
                <ul className="list-group mt-3">
                  <li className="list-group-item">
                    Cost: ₹{report.track_rating}
                  </li>
                  <li className="list-group-item">
                    Published:
                    <Moment format="DD/MM/YY">{report.updated_time}</Moment>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Report;
