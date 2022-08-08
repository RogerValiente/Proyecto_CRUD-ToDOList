import React, { useState } from "react";
import { AddToDoModal } from "./AddToDoModal";
import { EditarToDoModal } from "./EditarToDoModal";
import ToDoListTable from "./ToDoListTable";
import { EliminarToDoModal } from "./EliminarToDoModal";
import axios from "axios";

const ToDoList = () => {
  const urlApi = "http://localhost:5264/api/ListasTareas";
  const [data, setData] = useState([]);
  const [dataById, setDataById] = useState({});
  const [dataByIdEliminar, setDataByIdEliminar] = useState({});
  const [modalCrear, setabrirModalCrear] = useState(false);
  const [modalEditar, setAbrirModalEditar] = useState(false);
  const [modalEliminar, setAbrirModalEliminar] = useState(false);

  //Metodo para abrir o cerrar el modal
  const modalCrearNuevo = () => {
    setabrirModalCrear(!modalCrear);
  };

  const modalEditarTarea = () => {
    setAbrirModalEditar(!modalEditar);
  };

  const modalEliminarTarea = () => {
    setAbrirModalEliminar(!modalEliminar);
  };

  //Metodo para obtener un registro
  const getTodoByID = async (id) => {
    modalEditarTarea();
    await axios
      .get(urlApi + "/" + id)
      .then((resp) => {
        setDataById(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Metodo para eliminar un registro
  const getDeleteByID = async (id) => {
    modalEliminarTarea();
    await axios
      .get(urlApi + "/" + id)
      .then((resp) => {
        setDataByIdEliminar(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <ToDoListTable
        urlApi={urlApi}
        data={data}
        setData={setData}
        modalCrearNuevo={modalCrearNuevo}
        getTodoByID={getTodoByID}
        getDeleteByID={getDeleteByID}
      />
      <AddToDoModal
        urlApi={urlApi}
        data={data}
        setData={setData}
        modalCrear={modalCrear}
        setabrirModalCrear={setabrirModalCrear}
        modalCrearNuevo={modalCrearNuevo}
      />
      <EditarToDoModal
        urlApi={urlApi}
        data={data}
        setData={setData}
        dataById={dataById}
        setDataById={setDataById}
        modalEditar={modalEditar}
        setAbrirModalEditar={setAbrirModalEditar}
        modalEditarTarea={modalEditarTarea}
      />
      <EliminarToDoModal
        urlApi={urlApi}
        getDeleteByID={getDeleteByID}
        dataByIdEliminar={dataByIdEliminar}
        setDataByIdEliminar={setDataByIdEliminar}
        modalEliminar={modalEliminar}
        setAbrirModalEliminar={setAbrirModalEliminar}
        modalEliminarTarea={modalEliminarTarea}
      />
    </div>
  );
};

export default ToDoList;
