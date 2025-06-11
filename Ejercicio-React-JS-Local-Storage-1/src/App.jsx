import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Proveedores from './componets/proveedores.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Proveedores />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
