import { Formik, Form, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import TextField from "../Forms/TextField";
import { skillCreationDTO } from "./skills.model";

export default function SkillForm(props:skillFormProps){
    return(
        <>
        <Formik
        initialValues={props.model }
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          skillName: Yup.string()
            .required("This field is required")
            .max(50,"max length is 50 caracters")
            .firstLetterUppercase(),
        })}
      >
        {(formikProps) => (
          <Form>
            <TextField displayName="Name" field="skillName" />
            <div className="mt-4">
              <button className="btn btn-primary" type="submit">
                Save 
              </button>
              <Link className="btn btn-secondary m-3" to={"/skills"}>
                Cancel
              </Link>
            </div>
          </Form>
        )}
      </Formik>
        </>
            );
}



interface skillFormProps{
    model:skillCreationDTO;
    onSubmit(values:skillCreationDTO,action:FormikHelpers<skillCreationDTO>):void;
}
