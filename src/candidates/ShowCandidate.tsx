import { useEffect, useState } from "react";
import { landingPageDTO } from "./candidates.model";
import { urlCandidates } from "../endpoints";
import axios, { AxiosResponse } from "axios";
import CandidaetList from "./CandidateList";
import AlertContext from "../utils/AlertContext";

export default function ShowCandidate() {
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

  return (
    <>
      <AlertContext.Provider
        value={() => {
          loadData();
        }}
      >
        <CandidaetList candidates={candidates.listOfCandidates} />
      </AlertContext.Provider>
    </>
  );
}
