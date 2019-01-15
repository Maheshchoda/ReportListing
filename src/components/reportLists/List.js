import React from "react";
import { Link } from "react-router-dom";
import mordor from "./mordorintelligence.jpg";

const List = props => {
  const { list } = props;
  return (
    <div className="col-md-6">
      <div className="card flex-md-row mb-4 shadow-sm h-md-250">
        <div className="card-body d-flex flex-column align-items-start">
          <strong className="d-inline-block mb-2 text-primary">
            {list.artist_name}
          </strong>
          <h6 className="mb-0">
            <Link className="text-dark" to="#">
              {list.album_name}
            </Link>
          </h6>
          <p className="card-text mb-auto">{list.track_name}</p>
          <div className="mb-1 text-muted medium">{list.updated_time}</div>
          <p className="card-text mb-auto">Cost: ₹{list.track_rating}</p>
          <Link
            className="btn btn-outline-primary btn-sm"
            role="button"
            to={`lyrics/track/${list.track_id}`}
          >
            Continue reading
          </Link>
        </div>
        <img
          src={mordor}
          className="card-img-right flex-auto d-none d-lg-block"
          style={{ width: "200px", height: "250px" }}
          alt="Dummy data"
        />
      </div>
    </div>
  );
};

export default List;
