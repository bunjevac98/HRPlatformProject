import { useNavigate, useParams } from "react-router-dom";
import { urlCandidates } from "../endpoints";
import CandidateForm from "./CandidateForm";
import axios, { AxiosResponse } from "axios";
import {  candidatePutGetDTO } from "./candidates.model";
import { useEffect, useState } from "react";
import { candidateCreationDTO } from "./candidates.model";
import Loading from "../utils/Loading";

export default function EditCandidate() {
  //mozda put get malim slovima
  const { id }: any = useParams();
  const navigate=useNavigate();
const [candidate,setCandidate]=useState<candidateCreationDTO>();
const [candidatePutGet,setCandidatePutGet]=useState<candidatePutGetDTO>();

console.log(id)
  useEffect(() => {
    axios
      .get(`${urlCandidates}/putget/${id}`)
      .then((response: AxiosResponse<candidatePutGetDTO>) => {
        const model: candidateCreationDTO = {
          name: response.data.candidate.name,
          surname: response.data.candidate.surname,
          date: new Date(response.data.candidate.date,), 
          mobileNumber: response.data.candidate.mobileNumber,
          email: response.data.candidate.email,
        };
          setCandidate(model);
          setCandidatePutGet(response.data);
          console.log(model)
          console.log(response.data)


      });
  }, [id]);

async function edit(candidateToEdit:candidateCreationDTO){
  try{
    const response=await axios.put(`${urlCandidates}/${id}`, candidateToEdit);
    navigate(`/candidate/${response.data}`)

  }
catch{
  console.log("SOMETHING WENT WRONG IN EDIT CANDIDATE")
}



}








  return (
    <>
      <h2>Edit candidate</h2>
      {candidate &&candidatePutGet ? <CandidateForm
        model={candidate}
        onSubmit={ async (values) => await edit(values)}
        nonSelectedSkills={candidatePutGet.nonSelectedSkills}
        selectedSkills={candidatePutGet.selectedSkills}
      />:<Loading/>}
      
    </>
  );
}
