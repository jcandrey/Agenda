import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateNote() {
  const initialStateUser = [
    {
      nombre: "",
      apellido: "",
    },
  ];

  const initialStateNotas = [
    {
      userSelect: "",
      titulo: "",
      cuerpo: "",
    },
  ];
  const initialDate = {
    fecha: new Date(),
  };

  const [users, setUsers] = useState(initialStateUser);
  const [notas, setNotas] = useState(initialStateNotas);
  const [date, setDate] = useState(initialDate);

  useEffect(() => obtenerUsers(), []);

  const obtenerUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    setUsers(res.data);
    setNotas({ userSelect: res.data[0].nombre + " " + res.data[0].apellido });
  };

  const onChangeDate = (date) => {
    setDate({ fecha: date });
  };

  const inputChange = (e) => {
    setNotas({
      ...notas,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      titulo: notas.titulo,
      cuerpo: notas.cuerpo,
      autor: notas.userSelect,
      fecha: date.fecha,
    };
    await axios.post("http://localhost:4000/api/notes", newNote);
    window.location.href = "/";
  };

  return (
    <div>
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h6>Crear Notas</h6>
          <div className="form-group">
            <select
              className="form-control"
              name="userSelect"
              onChange={inputChange}
            >
              {users.map((user) => (
                <option
                  key={user._id}
                  value={user.nombre + " " + user.apellido}
                >
                  {user.nombre} {user.apellido}
                </option>
              ))}
            </select>
          </div>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                name="titulo"
                type="text"
                className="form-control"
                placeholder="Ingrese el Titulo"
                onChange={inputChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="cuerpo"
                className="form-control"
                placeholder="Contenido"
                onChange={inputChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={date.fecha}
                onChange={onChangeDate}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
