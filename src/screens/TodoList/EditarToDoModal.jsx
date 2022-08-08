import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import moment from "moment";
import { estados } from "./utils";
import Swal from "sweetalert2";

export const EditarToDoModal = ({
  modalEditar,
  urlApi,
  setData,
  data,
  modalEditarTarea,
  dataById,
  setDataById,
}) => {
  //Metodo editar
  const handleChangeEditar = (e) => {
    const { name, value } = e.target;
    setDataById({
      ...dataById,
      [name]: value,
    });
  };

  //Actualizar registro
  const PutTarea = async () => {
    await axios({
      method: "put",
      url: urlApi + "/" + dataById.id,
      data: {
        id: dataById.id,
        tituloTarea: dataById.tituloTarea,
        responsable: dataById.responsable,
        estado: dataById.estado,
        fechaInicial: moment(dataById.fechaInicial).format("YYYY-MM-DD"),
        fechaFinal: moment(dataById.fechaFinal).format("YYYY-MM-DD"),
      },
    })
      .then((response) => {
        setData(data.concat(response.data));
        Swal.fire("Actualizar", "La tarea se actualizo con éxito", "success");
        //cerramos el modal
        modalEditarTarea();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectChangeEditar = (evento) => {
    setDataById({
      ...dataById,
      estado: evento.value,
    });
  };

  return (
    <>
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Tarea</ModalHeader>
        <ModalBody>
          {Object.keys(dataById).length > 0 && (
            <form>
              <label>ID</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="id"
                onChange={handleChangeEditar}
                readOnly
                value={dataById && dataById.id}
              />
              <label>Tarea</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="tituloTarea"
                onChange={handleChangeEditar}
                value={dataById && dataById.tituloTarea}
              />
              <br />
              <label>Responsable</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="responsable"
                onChange={handleChangeEditar}
                value={dataById && dataById.responsable}
              />
              <br />
              <label>Nuevo Estado</label>
              <br />
              <div>
                <Select options={estados} onChange={handleSelectChangeEditar} />
              </div>
              <br />
              <label>Fecha Inicial</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="fechaInicial"
                onChange={handleChangeEditar}
                value={dataById && dataById.fechaInicial}
                readOnly
              />
              <br />
              <label>Fecha Final</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="fechaFinal"
                onChange={handleChangeEditar}
                value={dataById && dataById.fechaFinal}
                readOnly
              />
              <br />

              <ModalFooter>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => PutTarea()}
                  >
                    Guardar
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => modalEditarTarea()}
                  >
                    Cancelar
                  </button>
                </div>
              </ModalFooter>
            </form>
          )}
          <div className="form-group"></div>
        </ModalBody>
      </Modal>
    </>
  );
};
