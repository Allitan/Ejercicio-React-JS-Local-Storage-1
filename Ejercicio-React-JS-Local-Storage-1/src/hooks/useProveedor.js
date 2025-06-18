import { useState } from "react" 
import Swal from "sweetalert2"
import { alertaSuccess, alertaError, alertaWarning} from "../alertas"

const useProveedor = () => {
    const [proveedores, setProveedores] = useState([])
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [tituloModal, setTituloModal] = useState('')
    const [operacion, setOperacion] = useState('')

    const getProveedor = () => {
        const localStorageProveedores = localStorage.getItem('PROVEEDORES')
        const parsedProveedores = localStorageProveedores ? JSON.parse(localStorageProveedores) : []
        return Array.isArray(parsedProveedores) ? parsedProveedores : []
    }

    const enviarSolicitud = (metodo, parametros = {}) => {
        const saveUpdateProveedor = [...proveedores]
        let mensaje = ''

        if (metodo === 'POST'){
            saveUpdateProveedor.push({ ...parametros, id: Date.now()})
            mensaje = 'Proveedor agregado correctamente'
        } else if (metodo === 'PUT'){
            const proveedorIndex = saveUpdateProveedor.findIndex(proveedor => proveedor.id === parametros.id)
            
            if(proveedorIndex !== -1){
                saveUpdateProveedor[proveedorIndex] = {...parametros}
                mensaje = 'Proveedor actualizado correctamente'
            }
        } else if (metodo === 'DELETE'){
            const proveedorArr= saveUpdateProveedor.filter(proveedores => proveedores.id !== parametros.id)
            localStorage.setItem('PROVEEDORES', JSON.stringify(proveedorArr))
            alertaSuccess('Proveedor eliminado correctamente')
            return
        }

        localStorage.setItem('PROVEEDORES', JSON.stringify(saveUpdateProveedor))
        setProveedores(saveUpdateProveedor)
        alertaSuccess(mensaje)
        document.getElementById('btnCerrarModal').click()
    }

    const validar = () => {
        let metodo = ''

        if (nombre === ''){
            alertaWarning('El campo nombre es obligatorio', 'nombre')
        } else if (apellido === ''){
            alertaWarning('El campo apellido es obligatorio', 'apellido')
        } else if (telefono === ''){
            alertaWarning('El campo teléfono es obligatorio', 'telefono')
        } else if (email === ''){
            alertaWarning('El campo correo electrónico es obligatorio', 'correo')
        } else {
            let payload = {
                id: id || Date.now(),
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                email: email
            }

            if (operacion === 1){
                metodo = 'POST'
            } else {
                metodo = 'PUT'
            }

            enviarSolicitud(metodo, payload)
        }
    }

    const deleteProveedor = (id) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar el proveedor?',
            text: "¡No podrás revertir esto!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                enviarSolicitud('DELETE', { id })
            }
        }).catch((error) => {
            alertaError('Error al eliminar el proveedor', error)
        })
    }

    const openModal = (valorOperacion, proveedor) => {
        if (valorOperacion === 1) {
            setTituloModal('Registrar Proveedor')
            setId('')
            setNombre('')
            setApellido('')
            setTelefono('')
            setEmail('')
            setOperacion(1)
        } else if (valorOperacion === 2) {
            setTituloModal('Editar Proveedor')
            setId(proveedor.id)
            setNombre(proveedor.nombre)
            setApellido(proveedor.apellido)
            setTelefono(proveedor.telefono)
            setEmail(proveedor.email)
            setOperacion(2)
        }
    }

    return {
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
        deleteProveedor,
    }
}

export default useProveedor;