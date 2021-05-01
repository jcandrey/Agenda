import React, { useEffect, useState } from "react";
import axios from "axios";

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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
