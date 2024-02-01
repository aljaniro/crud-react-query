import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addpersons, updateperson } from "../api/personsApi";
import "../css/form.css";
import { useContext } from "react";
import { conperson } from "../context/contextperson";
function FormPersonas() {
  
  const {perso,setperso} = useContext(conperson)
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const queryclient = useQueryClient();

  const addPersonsMutation = useMutation({
    mutationFn: addpersons,
    onSuccess:async () => {
      
      console.log("producto añadido");
    await queryclient.invalidateQueries("Persons");
    },
  });

  const updatePersonsMutation = useMutation({
    mutationFn: updateperson,
    onSuccess:async () => {
      console.log("producto actualizado");
      await  queryclient.invalidateQueries("Persons");
    },
  });

  const enviar = (datos) => {
    console.log(datos, "estoy aqui");
    console.log(perso, "por aqui");

    if (perso) {
      console.log("id esta llegando");
      updatePersonsMutation.mutate({ ...datos, id: perso });
      setperso(null)

    } else {
      addPersonsMutation.mutate({ ...datos });
    }
  };

  return (
    <div
      className="container text-center border border-primary"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "430px",
        marginTop: "50px",
        height: "400px",
      }}
    >
      <form onSubmit={handleSubmit(enviar)}>
        <h2>Ingrese sus datos</h2>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Name
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="name"
            {...register("name", { required: "true" })}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Lastname
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="lastname"
            {...register("lastname", { required: "true" })}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Phone
          </span>
          <input
            type="tel"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="phone"
            {...register("phone", { required: "true" })}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Address
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="address"
            {...register("address", { required: "true" })}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Email
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="email"
            {...register("email", { required: "true" })}
            aria-invalid={errors.mail ? "true" : "false"}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default FormPersonas;
