import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import customConfirm from "./customConfirm";
import GenericList from "./Genericlist";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const [entities, setEntities] = useState<T[]>();

  useEffect(() => {
    lodaData();
  }, []);

  function lodaData() {
    axios.get(props.url).then((response: AxiosResponse<T[]>) => {
      setEntities(response.data);
    });
  }

  async function deleteEntity(id: number) {
    try {
      await axios.delete(`${props.url}/${id}`);
      lodaData();
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error && error.response) {
          console.log(error.response.data);
        }
      }
    }
  }

  const buttons = (editURL: string, id: number) => (
    <>
      <Link className="btn btn-success m-1" to={editURL}>
        Edit
      </Link>
      <button
        onClick={() => customConfirm(() => deleteEntity(id))}
        className="btn btn-danger"
      >
        Delete
      </button>
    </>
  );

  return (
    <>
      <h2> {props.title}</h2>
      <GenericList list={entities}>
        <table className="table table-striped">
            {props.children(entities!, buttons)}
        </table>
      </GenericList>
      <Link className="btn btn-primary" to={props.createURL}> Create {props.entityName}</Link>
    </>
  );
}

interface indexEntityProps<T> {
  url: string;
  title:string;
  createURL:string;
  entityName:string;
  //Ovo vraca react element
  children(entities:T[],
    
    buttons:(editUrl:string, id:number)=>ReactElement):ReactElement

}
