import { useState } from 'react'
import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './home'
import { NavBar } from './partials/navbar'
import { Footer } from './partials/footer'
import { Foco } from './foco'
import { Inicial } from './inicial'
import { Primaria } from './primaria'
import { Secundaria } from './secundaria'
import { Contacto } from './contacto'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/foco' element={<Foco />}></Route>
        <Route path='/inicial' element={<Inicial />}></Route>
        <Route path='/primaria' element={<Primaria />}></Route>
        <Route path='/secundaria' element={<Secundaria />}></Route>
        <Route path='/contacto' element={<Contacto />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
