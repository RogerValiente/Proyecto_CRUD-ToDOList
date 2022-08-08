import React, { useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const ToDoListTable = ({
  setData,
  data,
  urlApi,
  getTodoByID,
  getDeleteByID,
  modalCrearNuevo,
}) => {
  //Metodo para obtener todos los registros
  const getAll = async () => {
    await axios
      .get(urlApi)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Llamo la peticion de la data
  useEffect(() => {
    getAll();
  });

  const columnas = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Tarea",
      selector: (row) => row.tituloTarea,
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
    },
    {
      name: "Responsable",
      selector: (row) => row.responsable,
    },
    {
      name: "Fecha Incial",
      selector: (row) => row.fechaInicial,
    },
    {
      name: "Fecha Final",
      selector: (row) => row.fechaFinal,
    },
    {
      name: "Acciones",
      grow: 4,
      cell: (row) => (
        <div className="Container">
          <div className="row">
            <div className="col-6">
              <button
                className="btn btn-primary p-2 flex-fill"
                onClick={() => {
                  getTodoByID(row.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
            </div>

            <div className="col-6">
              <button
                className="btn btn-danger p-2 flex-fill"
                onClick={() => {
                  getDeleteByID(row.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      <div className="container">
        <button
          className="btn btn-primary table-responsive"
          onClick={() => modalCrearNuevo()}
        >
          Nueva Tarea
        </button>
        <DataTable
          columns={columnas}
          data={data}
          pagination
          title="Lista De Tareas"
          fixedHeader
          fixedHeaderScrollHeight="600px"
        />
      </div>

      {/*           
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tarea</th>
              <th>Estado</th>
              <th>Responsable</th>
              <th>Fecha Inicial</th>
              <th>Fecha Final</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.tituloTarea}</td>
                <td>{item.estado}</td>
                <td>{item.responsable}</td>
                <td>{moment(item.fechaInicial).format("DD-MM-YYYY")}</td>
                <td>{moment(item.fechaFinal).format("DD-MM-YYYY")}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      getTodoByID(item.id);
                    }}
                  >
                    Editar
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => getDeleteByID(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       */}
    </>
  );
};

export default ToDoListTable;
