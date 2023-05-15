import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlCandidates } from "../endpoints";
import { useParams } from "react-router-dom";
import { candidateDTO } from "./candidates.model";
import Loading from "../utils/Loading";
import { Link } from "react-router-dom";

export default function IndexCandidate() {
  const { id }: any = useParams();
  const [candidate, setCandidate] = useState<candidateDTO>();

  useEffect(() => {
    axios
      .get(`${urlCandidates}/${id}`)
      .then((response: AxiosResponse<candidateDTO>) => {
        response.data.date = new Date(response.data.date);
        setCandidate(response.data);
      });
  }, [id]);

  return (
    
      candidate ?
      <div>
        <h2>{candidate?.name}   {candidate.surname}</h2>
        {candidate.skills?.map(skill=>
          <Link key={skill.id} style={{marginRight:'5px'}} className="btn btn-primary btn-sm rounded-pill" to={`/candidate/filter?skillId=${skill.id}`}  >{skill.skillName}</Link>
          
          )} | {candidate.date.toDateString()}
          <h4 className="mt-3">Email</h4>
          <div  >
            {candidate.email}
          </div>
          <h4 className="mt-3">Mobile number</h4>
          <div >
            {candidate.mobileNumber}
          </div>

      </div>
      : <Loading />
    
  );
}
