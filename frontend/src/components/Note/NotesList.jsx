import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default function NotesList() {
  const initialStateNotas = [
    {
      autor: "",
      titulo: "",
      cuerpo: "",
    },
  ];
  const [notas, setNotas] = useState(initialStateNotas);

  useEffect(() => obtenerNotas(), []);

  const obtenerNotas = async () => {
    const res = await axios.get("http://localhost:4000/api/notes");
    setNotas(res.data);
  };

  const deleteNote = async (id) => {
    await axios.delete("http://localhost:4000/api/notes/" + id);
    obtenerNotas();
  };

  return (
    <div>
      <div className="row">
        {notas.map((nota) => (
          <div className="col-md-4 p2" key={nota._id}>
            <div className="card">
              <div className="card-header">
                <h6>{nota.titulo}</h6>
              </div>
              <div className="card-body">
                <p>{nota.cuerpo}</p>
                <p>{nota.autor}</p>
                <p>{format(nota.fecha)}</p>
              </div>
              <div className="card-footer col-xs-3">
                <button
                  className="btn btn-danger btn-sm mr-1 btn-block"
                  onClick={() => deleteNote(nota._id)}
                >
                  Borrar Nota
                </button>
                <Link
                  className="btn btn-secondary btn-sm mr-1 btn-block"
                  to={"/edit/" + nota._id}
                >
                  Editar Nota
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
