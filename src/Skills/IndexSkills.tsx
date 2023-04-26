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
          <>
            <thead>
              <th></th>
              <th> Name</th>
            </thead>
            <tbody>
              {skills?.map((skill) => (
                <tr key={skill.id}>
                  <td>
                        {buttons(`edit/${skill.id}`,skill.id)}
                  </td>
                  <td>{skill.skillName}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>
    </>
  );
}
