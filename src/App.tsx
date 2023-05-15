import React, { useState, useEffect } from "react";
import CandidaetList from "./candidates/CandidateList";
import "./App.css";
import { landingPageDTO } from "./candidates/candidates.model";
import Menu from "./Menu";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import IndexSkills from "./Skills/IndexSkills";
import CreateSkill from "./Skills/CreateSkill";
import EditSkills from "./Skills/EditSkills";
import CreateCandidate from "./candidates/CreateCandidate";
import EditCandidate from "./candidates/EditCandidate";
import FilterCandidates from "./candidates/FilterCandidates";
import configureValidations from "./Validation";
import IndexCandidate from "./candidates/IndexCandidate";
import axios, { AxiosResponse } from "axios";
import { urlCandidates } from "./endpoints";
import AlertContext from "./utils/AlertContext";

//We have made our custom validation for uppercase here Validations global.d.ts wher we initialize module
configureValidations();

function App() {
  const [candidates, setCandidates] = useState<landingPageDTO>({});

  useEffect(() => {
    /*
   axios.get(urlCandidates).then((response: AxiosResponse<landingPageDTO>) => {
      setCandidates(response.data);
      
    })*/

    loadData();
  }, []);

  function loadData() {
    axios.get(urlCandidates).then((response: AxiosResponse<landingPageDTO>) => {
      setCandidates(response.data);
    });
  }

  //OVDE NE RADI(\d+) PROVERITE ZASTO
  return (
    <AlertContext.Provider
      value={() => {
        loadData();
      }}
    >
      <BrowserRouter>
        <Menu />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <CandidaetList candidates={candidates.listOfCandidates} />
              }
            ></Route>
            <Route path="/skills" element={<IndexSkills />}></Route>
            <Route path="/skills/create" element={<CreateSkill />}></Route>
            <Route path="/skills/edit/:id" element={<EditSkills />}></Route>
            <Route path="/candidate/:id" element={<IndexCandidate />}></Route>
            <Route
              path="/candidate/create"
              element={<CreateCandidate />}
            ></Route>
            <Route
              path="/candidate/edit/:id"
              element={<EditCandidate />}
            ></Route>
            <Route
              path="/candidate/filter"
              element={<FilterCandidates />}
            ></Route>
            <Route path="*" element={<Navigate to={"/"} replace />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AlertContext.Provider>
  );
}

export default App;
