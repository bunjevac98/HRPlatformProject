
import SkillForm from "./SkillForm";

import { urlSkills } from "../endpoints";
import { skillCreationDTO, skillDTO } from "./skills.model";

import EditEntity from "../utils/EditEntity";

export default function EditSkills() {
  return (
    <>
      <EditEntity<skillCreationDTO, skillDTO>
        url={urlSkills}
        entityNmae="Skills"
        indexURL="/skills"
      >
        {(entity, edit) => (
          <SkillForm
            model={entity}
            onSubmit={async (value) => {
              await edit(value);
            }}
          />
        )}
      </EditEntity>
    </>
  );
}
