import GenericList from "../utils/Genericlist";
import IndividualCandidat from "./IndividualCandidate";
import { candidateDTO } from "./candidates.model";

export default function CandidateList(props: candidateListProps) {
  return (
    <>
      <h3>Candidates</h3>
      <GenericList list={props.candidates}>
        <div>
          {props.candidates?.map((candidate) => (
            <IndividualCandidat {...candidate} key={candidate.id} />
          ))}
        </div>
      </GenericList>
      ;
    </>
  );
}

interface candidateListProps {
  candidates?: candidateDTO[];
}
