import CreateSkill from "./Skills/CreateSkill";
import EditSkills from "./Skills/EditSkills";
import IndexSkills from "./Skills/IndexSkills";
import CreateCandidate from "./candidates/CreateCandidate";
import EditCandidate from "./candidates/EditCandidate";
import FilterCandidates from "./candidates/FilterCandidates";
import IndexCandidate from "./candidates/IndexCandidate";
import ShowCandidate from "./candidates/ShowCandidate";
import HomePage from "./HomePage/HomePage";

const routes = [
  { path: "/", element: HomePage },
  { path: "/skills", element: IndexSkills },
  { path: "/skills/create", element: CreateSkill },
  { path: "/skills/edit/:id", element: EditSkills },
  { path: "/candidate/:id", element: IndexCandidate },
  { path: "/candidate/create", element: CreateCandidate },
  { path: "/candidate/edit/:id", element: EditCandidate },
  { path: "/candidate/filter", element: FilterCandidates },
  { path: "/candidate/show", element: ShowCandidate },
  { path: "*", element: HomePage },
];

export default routes;
