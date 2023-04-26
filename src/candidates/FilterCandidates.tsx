import { Formik, Form } from "formik";
import { skillDTO } from "../Skills/skills.model";
import { useEffect, useState } from "react";
import { urlCandidates, urlSkills } from "../endpoints";
import axios, { AxiosResponse } from "axios";
import { candidateDTO } from "./candidates.model";
import CandidateList from "./CandidateList";

export default function FilterCandidates() {
  const initialValues: filterCandidatesForm = {
    name: "",
    skillId: 0,
  };
  const [skills,setSkills]=useState<skillDTO[]>([])
  const [candidates,setCandidates]=useState<candidateDTO[]>([])


  useEffect(()=>{
    axios.get(`${urlSkills}/all`).then((response:AxiosResponse<skillDTO[]>)=>{
      setSkills(response.data);

    })
  },[])

  useEffect(()=>{
    searchCandidates(initialValues)
  },[])

function searchCandidates(values:filterCandidatesForm){
  axios.get(`${urlCandidates}/filter`, {params:values})
    .then((response:AxiosResponse<candidateDTO[]>)=>{
      setCandidates(response.data)
      
      console.log(values);
    })
}
  return (
    <>
      <h2>Filter Candidates</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
            searchCandidates(values);
        }}
      >
        {(formikProps) => (
          <Form>
            <div className="row gx-3 align-items-center">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name of candidat"
                  {...formikProps.getFieldProps("name")}
                />
              </div>
              <div className="col-auto">
                <select
                  className="form-select"
                  {...formikProps.getFieldProps("skillId")}
                >
                  <option value="0">Chose a skill</option>
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.skillName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-auto">
                <button type="submit"
                  className="btn btn-primary"
                  onClick={() => formikProps.submitForm()}
                >
                  Filter
                </button>
              </div>
              <div className="col-auto">
                <button type="submit"
                  className="btn btn-danger ms-3"
                  onClick={() => {
                    formikProps.setValues(initialValues);
                    searchCandidates(initialValues);
                  }
                
                }
                >
                  Clear
                </button>
              </div>
            </div>
            <CandidateList candidates={candidates} />
          </Form>
        )}
      </Formik>
    </>
  );
}

interface filterCandidatesForm {
  name: string;
  skillId: number;
}
