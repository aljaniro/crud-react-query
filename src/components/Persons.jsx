import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getpersons, deletepersons } from "../api/personsApi";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormPersonas from "./formPersonas";
import { conperson } from "../context/contextperson";
function Persons() {
  const { perso, setperso, show, setShow } = useContext(conperson);

  const handleClose = () => setShow(false);

  const queryclient = useQueryClient();
  const deletePersonsMutation = useMutation({
    mutationFn: deletepersons,
    onSuccess: async () => {
      console.log("producto eliminado");
    await queryclient.invalidateQueries("Persons");
    },
  });

  const { isError, data, isLoading, error } = useQuery({
    queryKey: ["getpersons"],
    queryFn: getpersons,
  });
  console.log(data);
  if (isLoading) {
    return <div>...isloadin</div>;
  } else if (isError) return <div>Error:{error.message}</div>;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        placeItems: "center",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      {data?.map((val) => (
        <div
          className="card"
          style={{ width: "400px", height: "220px" }}
          key={val.id}
        >
          <div className="card-header">
             {val.name} {val.lastname}
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Phone : {val.phone}</li>
            <li className="list-group-item">Address : {val.address}</li>
            <li className="list-group-item">Email : {val.email}</li>
          </ul>
          <div
            className="card-footer"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60px",
              background: "white",
            }}
          >
            <button
              type="button"
              className="btn btn-warning"
              style={{ width: "40%", marginLeft: "10px" }}
              onClick={() => {
                setperso(val.id);
                setShow(true);
              }}
            >
              Warning
            </button>
            <button
              type="button"
              className="btn btn-danger"
              style={{ width: "40%", marginLeft: "10px" }}
              onClick={() => {
                console.log(val.id);
                deletePersonsMutation.mutate(val.id);
              }}
            >
              Danger
            </button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {console.log(perso, "IMPORTANTE ID")}
                <FormPersonas id={val.id}></FormPersonas>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Persons;
