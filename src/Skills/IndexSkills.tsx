import { skillDTO } from "./skills.model";
import { urlSkills } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";

export default function IndexSkills() {
  return (
    <>
      <IndexEntity<skillDTO>
        url={urlSkills}
        createURL="/skills/create"
        title="Skills"
        entityName="Skill"
      >
        {(skills, buttons) => (
          <div>
            {skills?.map((skill) => (
              <figure key={skill.id}>
                  <td>{buttons(`edit/${skill.id}`, skill.id)}</td>
                  <td>{skill.skillName}</td>
              </figure>
            ))}
          </div>
        )}
      </IndexEntity>
    </>
  );
}
