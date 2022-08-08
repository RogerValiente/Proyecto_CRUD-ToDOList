import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useState } from "react";
import Select from "react-select";
import moment from "moment";
import axios from "axios";
import { estados } from "./utils";
import Swal from "sweetalert2";

export const AddToDoModal = ({
  data,
  setData,
  modalCrear,
  urlApi,
  modalCrearNuevo,
}) => {
  const [tarea, setTareaSeleccionada] = useState({
    id: 0,
    tituloTarea: "",
    responsable: "",
    estado: "",
    fechaInicial: "",
    fechaFinal: "",
  });

  //Metodo para capturar lo que el usuairo escribe
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTareaSeleccionada({
      ...tarea,
      [name]: value,
    });
  };

  //Metodo para crear un registro
  const handleSelectChange = (evento) => {
    setTareaSeleccionada({
      ...tarea,
      estado: evento.value,
    });
  };

  const PostTarea = async () => {
    await axios({
      method: "post",
      url: urlApi,
      data: {
        id: tarea.id,
        tituloTarea: tarea.tituloTarea,
        responsable: tarea.responsable,
        estado: tarea.estado,
        fechaInicial: moment(tarea.fechaInicial).format("YYYY-MM-DD"),
        fechaFinal: moment(tarea.fechaFinal).format("YYYY-MM-DD"),
      },
    })
      .then((response) => {
        setData(data.concat(response.data));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "La tarea se guardo correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        //cerramos el modal
        modalCrearNuevo();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* modal crear nuevo */}
      <Modal isOpen={modalCrear}>
        <ModalHeader>Crear Nueva Tarea</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>
              Tarea <span className="requerido">*</span>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="tituloTarea"
              onChange={handleChange}
              required
            />
            <br />
            <label>
              Responsable <span className="requerido">*</span>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="responsable"
              onChange={handleChange}
              required
            />
            <br />
            <label>
              Estado <span className="requerido">*</span>
            </label>
            <br />
            <div>
              <Select
                options={estados}
                onChange={handleSelectChange}
                required
              />
            </div>
            <br />
            <label>
              Fecha Inicial <span className="requerido">*</span>
            </label>
            <br />
            <input
              type="date"
              className="form-control"
              name="fechaInicial"
              onChange={handleChange}
              required
            />
            <br />
            <label>
              Fecha Final <span className="requerido">*</span>
            </label>
            <br />
            <input
              type="date"
              className="form-control"
              name="fechaFinal"
              onChange={handleChange}
              required
            />
            <br />
            <ModalFooter>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => PostTarea()}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => modalCrearNuevo()}
                >
                  Cancelar
                </button>
              </div>
            </ModalFooter>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
