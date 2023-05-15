import axios from "axios";
import SkillForm from "./SkillForm";
import { skillCreationDTO } from "./skills.model";
import { urlSkills } from "../endpoints";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateSkill() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<string[]>([]);

  async function create(skill: skillCreationDTO) {
    try {
       await axios.post(urlSkills, skill);
       console.log(urlSkills);
       navigate("/skills");
    } catch (error) {
      console.log(errors);
      if (axios.isAxiosError(error)) {
        if (error && error.response) {
          setErrors(error.response.data);
        }
      }
    }
  }

  //<DisplayErrors errors={errors} />
  return (
    <>
      <h2>Create skill</h2>
      <SkillForm
        model={{ skillName: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      />
    </>
  );
}
