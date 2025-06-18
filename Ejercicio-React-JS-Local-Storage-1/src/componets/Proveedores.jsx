import Campo from "./Campo"
import useProveedor from "../hooks/useProveedor"
import { useEffect } from "react"

const Proveedores = () => {
    const {
        getProveedor,
        proveedores,
        setProveedores,
        nombre,
        setNombre,
        apellido,
        setApellido,
        telefono,
        setTelefono,
        email,
        setEmail,
        openModal,
        validar,
        tituloModal,
        deleteProveedor

    } = useProveedor()

    useEffect(() => { 
        setProveedores(getProveedor())
    }, [])

    return(
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProveedor" onClick={() => openModal(1)}><i className="fa-solid fa-circle-plus" /> Añadir</button>
                    </div>    
                </div>
            </div>

            <div className="col-12 col-lg-8 offset-lg-2 mt-3">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                proveedores.map((proveedores, i) => {
                                   return( 
                                    <tr key={proveedores.id}>
                                        <td>{i + 1}</td>
                                        <td>{proveedores.nombre}</td>
                                        <td>{proveedores.apellido}</td>
                                        <td>{proveedores.telefono}</td>
                                        <td>{proveedores.email}</td>
                                        <td>
                                            <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProveedor" onClick={() => openModal(2, proveedores)}><i className="fa-solid fa-edit" /> Editar</button>

                                            <button className="btn btn-danger" onClick={() => deleteProveedor(proveedores.id)}><i className="fa-solid fa-trash" /> Eliminar</button>
                                        </td>
                                    </tr>
                                   ) 
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="modalProveedor" className="modal fade" aria-hidden="true" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5"> {tituloModal} </label>
                        </div>
                        <div className="modal-body">
                            <Campo id="nombre" iconName="fa-solid fa-user" inputType="text" placeHolder="Nombre" onChange={(e) => setNombre(e.target.value)} value={nombre} />
                            <Campo id="apellido" iconName="fa-solid fa-user-tag" inputType="text" placeHolder="Apellido" onChange={(e) => setApellido(e.target.value)} value={apellido} />
                            <Campo id="telefono" iconName="fa-solid fa-phone" inputType="number" placeHolder="Teléfono" onChange={(e) => setTelefono(e.target.value)} value={telefono} />
                            <Campo id="correo" iconName="fa-solid fa-envelope" inputType="email" placeHolder="Correo Electrónico" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={() => validar()}><i className="fa-solid fa-floppy-disk"/> Guardar</button>
                            <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss="modal"><i className="fa-solid fa-circle-xmark"/> Cerrar</button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Proveedores;