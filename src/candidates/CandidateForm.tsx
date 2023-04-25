import { Formik, Form, FormikHelpers } from "formik";
import TextField from "../Forms/TextField";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { candidateCreationDTO } from "./candidates.model";
import DateField from "../Forms/DateField";
import MultipleSelector, { multipleSelectorModel } from "../Forms/MultipleSelector";
import { useState } from "react";
import { skillDTO } from "../Skills/skills.model";

export default function CandidateForm(props: candidateFormProps) {
  const [selectedSkills, setSelectedSkills] = useState(mapToModel(props.selectedSkills));
  const [nonSelectedSkills, setNonSelectedSkills] = useState(mapToModel(props.nonSelectedSkills));

function mapToModel(items:{id:number,skillName:string}[]):multipleSelectorModel[]{
  return items.map(items=>{
      return {key:items.id,value:items.skillName}
  })
}




  return (
    <Formik
      initialValues={props.model}
      onSubmit={(values,actions)=>{
        values.skillsIds=selectedSkills.map(item=>item.key);
        props.onSubmit(values,actions);
      }
    }
      validationSchema={Yup.object({
        name: Yup.string().required("This field is required"),
        surname: Yup.string().required("This field is required"),
        email: Yup.string().required("This field is required"),
        mobileNumber: Yup.number()
        .required("This field is required")
        .moreThan(-1,"Negative Value note axxepted")
        .min(1, 'The minimum amount is one'),
        date:Yup.date().required("This field is required")
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField displayName="Name" field="name" />
          <TextField displayName="Surname" field="surname" />
          <TextField displayName="Mobile number" field="mobileNumber" />
          <TextField displayName="E-mail" field="email" />
          <DateField displayName="Date of birth" field="date"/>
          <MultipleSelector
            displayName="Skills"
            nonSelected={nonSelectedSkills}
            selected={selectedSkills}
            onChange={(selected,nonSelected)=>{
                setSelectedSkills(selected);
                setNonSelectedSkills(nonSelected);

            }}
          />


          <button className="btn btn-primary" type="submit">
            Create candidate
          </button>
          <Link className="btn btn-secondary" to="/">
            Cancle
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface candidateFormProps {
  model: candidateCreationDTO;
  onSubmit(
    values: candidateCreationDTO,
    actions: FormikHelpers<candidateCreationDTO>
  ): void;
  selectedSkills:skillDTO[];
  nonSelectedSkills:skillDTO[];
}
