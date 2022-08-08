import React from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";

export const EliminarToDoModal = ({
  urlApi,
  dataByIdEliminar,
  setDataByIdEliminar,
  modalEliminarTarea,
  modalEliminar,
}) => {
  //Metodo para obtener todos los registros
  const deleteById = async () => {
    await axios
      .delete(urlApi + "/" + dataByIdEliminar.id)
      .then((resp) => {
        setDataByIdEliminar(resp.data);
        Swal.fire(
          "Eliminar",
          `La tarea: ${dataByIdEliminar.tituloTarea}, se elimino con éxito`,
          "success"
        );
        modalEliminarTarea();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal isOpen={modalEliminar}>
        <ModalHeader className="bg-danger text-white">
          Eliminar Tarea
        </ModalHeader>
        <ModalBody>
          {Object.keys(dataByIdEliminar).length > 0 && (
            <form>
              <h3 className="text-center">
                {" "}
                ¿Estas seguro de que deseas Eliminar la tarea: &nbsp;
                {dataByIdEliminar && dataByIdEliminar.tituloTarea} con id:
                &nbsp;
                {dataByIdEliminar && dataByIdEliminar.id}?
              </h3>

              <ModalFooter>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteById()}
                  >
                    Si
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => modalEliminarTarea()}
                  >
                    No
                  </button>
                </div>
              </ModalFooter>
            </form>
          )}
          <div className="form-group"></div>
        </ModalBody>
      </Modal>

      {/* <Modal isOpen={modalEliminar}>
        <ModalHeader>Eliminar Tarea</ModalHeader>
        <ModalBody>
          <label>ID</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="id"
            onChange={handleChangeEliminar}
            readOnly
            value={dataByIdEliminar && dataByIdEliminar.id}
          />
          ¿Estas seguro de que deseas Eliminar la tarea{" "}
          {dataByIdEliminar && dataByIdEliminar.id} y titulo
          {dataByIdEliminar && dataByIdEliminar.tituloTarea}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => deleteByID()}>
            Si
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => modalEliminarTarea()}
          >
            No
          </button>
        </ModalFooter>
      </Modal> */}
    </>
  );
};
