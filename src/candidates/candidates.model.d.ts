import { skillDTO } from "../Skills/skills.model";

//ovde mozda treba dodati listu skills, date, jezik koji pricaju
export interface candidateDTO {
  id: number;
  name:string;
  surname: string;
  mobileNumber: number;
  email: string;
  //ovo sam dodao
  date:Date;
  skills: skillDTO[];
}

export interface candidateCreationDTO{
  name:string;
  surname: string;
  date:Date;
  mobileNumber: number;
  email: string;
  skillsIds?:number[];
}


//undifajnd jer kad ucitamo necemo imati ovu informaciju
export interface landingPageDTO{
 // candidates?:candidateDTO[];
 listOfCandidates? : candidateDTO[];
}

export interface candidatePostGetDTO{
  skills:skillDTO[];
}
//ovde ide podatak kada ga prvo dobijemo da bi ispisali sta cemo menjati kod njega
export interface candidatePutGetDTO{
  candidate:candidateDTO;
  selectedSkills:skillDTO[];
  nonSelectedSkills:skillDTO[];



}


