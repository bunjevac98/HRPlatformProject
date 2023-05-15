import { useEffect, useState } from "react";
import { skillDTO } from "../Skills/skills.model";
import CandidateForm from "./CandidateForm";
import axios, { AxiosResponse } from "axios";
import { urlCandidates } from "../endpoints";
import { candidateCreationDTO, candidatePostGetDTO } from "./candidates.model";
import Loading from "../utils/Loading";
import {  useNavigate } from "react-router-dom";




export default function CreateCandidate() {
  const [nonSelectedSkills, setNonSelectedSkills] = useState<skillDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [, setErrors] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`${urlCandidates}/postget`)
      .then((response: AxiosResponse<candidatePostGetDTO>) => {
        setNonSelectedSkills(response.data.skills);
        setLoading(false);
      });
  }, []);
/*
  function convertCandidateToData(candidate: candidateCreationDTO) {
    const formData = new FormData();

    formData.append("name", candidate.name);
    formData.append("surname", candidate.surname);
    formData.append("mobileNumber", JSON.stringify(candidate.mobileNumber));
    formData.append("email", candidate.email);
    formData.append("date", formatDate(candidate.date));
    formData.append("skillsIds", candidate.email);
  }
*/
/*
  function formatDate(date: Date) {
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const [{ value: month }, , { value: day }, , { value: year }] =
      format.formatToParts(date);
    return `${year}${month}${day}`;
  }*/
  async function create(candidateCreationDTO: candidateCreationDTO) {
    try {
      //const formData=convertCandidateToData(candidate);
      console.log(candidateCreationDTO);
      console.log(urlCandidates);
      
       const response=await axios.post(`${urlCandidates}/Create`, candidateCreationDTO);
        //proveriti mozda ne radi kako treba
       navigate(`/candidate/${response.data}`)
    } catch(error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error && error.response) {
          setErrors(error.response.data);
        }
      }

    }
  }
  return (
    <>
      <h2>Create candidate</h2>
      {loading ? (<Loading />) : (
        <CandidateForm
          model={{
            name: "",
            surname: "",
            mobileNumber: 0,
            email: "",
            date: new Date("2017-01-01TT00:00:00"),}}
          onSubmit={async values=> await create(values)}
          nonSelectedSkills={nonSelectedSkills}
          selectedSkills={[]}
        />
      )}
    </>
  );
}
