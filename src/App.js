import { useState, useEffect } from 'react';
import './App.css';
import { getClient } from './api/client';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [client, setClient] = useState([]);
  const [errorState, SetErrorState] = useState({hasError: false});
  const [search, setSearch] = useState("");

  useEffect(() => {
    getClient().then((data) => setClient(data)).catch(handleError);
  }, []);

  const handleError = (err) => {
    SetErrorState({hasError: true, message: err.message });
  };

  //method search

  const searcher = (e) =>{
    setSearch(e.target.value)
    //console.log(e.target.value)
  }

  //method filter

  let result = []
  if(!search){
    result = client
  }else{
      result = client.filter((data) =>
      data.nombres.toLowerCase().includes(search.toLocaleLowerCase())
    )
  }

  return (
    <div>
      <style>{`
        body {
          background-color: #333;
          color: white;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Home</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Nosotros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contacto</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-6">
        <h2 className="text-center mb-4">Usuarios Registrados</h2>
        <input
            value={search} onChange={searcher}
            type='text'
            placeholder='Buscar'
            className='form-control my-3 p-2 rounded'  
          />

          <table className="custom-table table table-striped table-hover shadow-lg">
            <thead>
              <tr>
                <th>Correo</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {errorState.hasError && (
                <tr>
                  <td colSpan="2" className="text-danger">
                    {errorState.message}
                  </td>
                </tr>
              )}
              {result.map((client) => (
                <tr key={client.dni}>
                  <td>{client.correo}</td>
                  <td>{client.nombres}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-6">
        <h2 className="text-center mb-4">Formulario de Registro</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="dni" className="form-label">DNI</label>
              <input type="text" className="form-control" id="dni" placeholder="Colocar su dni" />
            </div>
            <div className="mb-3">
              <label htmlFor="nombres" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombres" placeholder="Colocar sus nombres" />
            </div>
            <div className="mb-3">
              <label htmlFor="apellidos" className="form-label">Apellido</label>
              <input type="text" className="form-control" id="apellidos" placeholder="Colocar sus apellidos" />
            </div>
            <div className="mb-3">
              <label htmlFor="fecha_nacimiento" className="form-label">Fecha de nacimiento</label>
              <input type="date" className="form-control" id="fecha_nacimiento" placeholder="" />
            </div>
            <div className="mb-3">
              <label htmlFor="celular" className="form-label">Celular</label>
              <input type="text" className="form-control" id="celular" placeholder="Ingresar su numero de celular" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo</label>
              <input type="email" className="form-control" id="email" placeholder="Colocar su correo" />
            </div>
            <div className="mb-3">
              <label htmlFor="banco" className="form-label">Banco</label>
              <input type="text" className="form-control" id="banco" placeholder="Ingresar su banco" />
            </div>
            <div className="mb-3">
              <label htmlFor="nCuenta" className="form-label">Numero de Cuenta o CCI</label>
              <input type="text" className="form-control" id="nCuenta" placeholder="Ingresar su numero de cuenta" />
            </div>

            <button type="submit" className="btn btn-primary">Registrar</button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};


export default App;
