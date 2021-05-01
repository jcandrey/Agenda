import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CreateditUser() {
  const initialStateUser = [
    {
      nombre: "",
      apellido: "",
      email: "",
    },
  ];

  const initialStateUsua = {
    nombre: "",
    apellido: "",
    email: "",
  };

  const [users, setUsers] = useState(initialStateUser);
  const [usua, setUsua] = useState(initialStateUsua);

  useEffect(() => obtenerUsers(), []);

  const obtenerUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    setUsers(res.data);
  };

  const handleChange = (e) => {
    setUsua({
      ...usua,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/users", usua);
    obtenerUsers();
    setUsua(initialStateUsua);
  };

  const deleteUser = async (id) => {
    await axios.delete("http://localhost:4000/api/users/" + id);
    obtenerUsers();
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="container p-2 card card-bady">
          <h6>Crear un nuevo Usuario</h6>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                name="nombre"
                type="text"
                className="form-control"
                placeholder="Ingrese su nombre"
                value={usua.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                name="apellido"
                type="text"
                className="form-control"
                placeholder="Ingrese su apellido"
                value={usua.apellido}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                name="email"
                type="text"
                className="form-control"
                placeholder="Ingrese su e-mail"
                value={usua.email}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-8 ">
        <div className="container p-2 card card-bady">
          <h6>Listado de Usuarios</h6>
          <div>* para borrar un usuario, clik sobre el mismo </div>
          <ul className="list-group">
            {users.map((user) => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onClick={() => deleteUser(user._id)}
              >
                {user.nombre} - {user.apellido} - {user.email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
