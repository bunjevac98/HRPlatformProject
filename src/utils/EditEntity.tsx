import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";

export default function EditEntity<TCreation, TRead>(
  props: editEntityProps<TCreation, TRead>
) {
  const { id } : any = useParams();
  //TCreation nam omogucava da koristimo razlicite klase
  const [entity, setEntity] = useState<TCreation>();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  //ovde mozda treba eddit izmedju putanje
  useEffect(() => {
    axios.get(`${props.url}/${id}`).then((response: AxiosResponse<TRead>) => {
      setEntity(props.transform(response.data));
    });
  }, [id]);

  async function edit(entityToEdit: TCreation) {
    try {
      await axios.put(`${props.url}/${id}`, entityToEdit);
      navigate(props.indexURL);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error && error.response) {
          setErrors(error.response.data);
        }
      }
    }
  }
  return (
    <>
      <h2>Edit {props.entityNmae}</h2>
      <DisplayErrors errors={errors}></DisplayErrors>
      {entity ? props.children(entity, edit) : <Loading />}
    </>
  );
}
//dobro pregledati ova prosledjivanja
interface editEntityProps<TCreation, TRead> {
  url: string;
  transform(entity: TRead): TCreation;
  entityNmae: string;
  indexURL: string;
  children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}

EditEntity.defaultProps = {
  transform: (entity: any) => entity,
};
