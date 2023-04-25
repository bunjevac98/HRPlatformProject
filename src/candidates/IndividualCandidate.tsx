import { Link } from "react-router-dom";
import { candidateDTO } from "./candidates.model";
import customConfirm from "../utils/customConfirm";
import axios from "axios";
import { urlCandidates } from "../endpoints";
import { useContext } from "react";
import AlertContext from "../utils/AlertContext";

///mozda ce ovde trebati dodati skills
export default function IndividualCandidate(props: candidateDTO) {
  const buildLink = () => `/candidate/${props.id}`;
  ///ovde sam dodao ispisivanje skiloova koje kandidat
const customAlert=useContext(AlertContext);
  function deleteCandidate() {
    axios.delete(`${urlCandidates}/${props.id}`).then(() => {
          customAlert();


    });
  }

  return (
    <div className="container">
      <div className="card m-3">
        <div className="row">
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {props.name} {props.surname}
              </h5>

              <p className="card-text">{props.mobileNumber}</p>
              <p className="card-text">{props.email}</p>
              <p className="card-text">
                {props.skills?.map((skill) => (
                  <p>{skill.skillName}</p>
                ))}
              </p>
              <div>
                <p>
                  <Link className="btn btn-primary m-3" to={buildLink()}>
                    View
                  </Link>
                  <Link
                    className="btn btn-success m-3"
                    to={`/candidate/edit/${props.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => customConfirm(() => deleteCandidate())}
                    className="btn btn-danger m-3"
                  >
                    Delete
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
