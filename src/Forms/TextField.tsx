import { ErrorMessage, Field } from "formik";

export default function TextField(props: textFieldProps) {
  return (
    <div>
      <label htmlFor={props.field}>{props.displayName}</label>
      <Field className="form-control" name={props.field} placeholder={props.displayName} />
      <ErrorMessage name={props.field}>
        {(msg) => <div className="text-danger">{msg}</div>}
      </ErrorMessage>
    </div>
  );
}

interface textFieldProps{
    field:string;
    displayName:string;


}

