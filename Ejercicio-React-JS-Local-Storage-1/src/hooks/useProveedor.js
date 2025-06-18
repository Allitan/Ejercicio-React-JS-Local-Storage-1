import { useState } from "react";  
import Swal from "sweetalert2";
import { alertaSuccess, alertaError, alertaWarning} from "../alertas";

const useProveedor = () => {
    const [proveedores, setProveedores] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [tituloModal, setTituloModal] = useState('');
    const [operacion, setOperacion] = useState('');

    const getProveedor = () => {
        const localStorageProveedores = localStorage.getItem('PROVEEDORES');
        const parsedProveedores = localStorageProveedores ? JSON.parse(localStorageProveedores) : [];
    }
}

export default useProveedor;