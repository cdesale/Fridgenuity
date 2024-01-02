import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './header'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './homePage';

function App() {
 

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path='/' element={<HomePage />} />
      </Routes>

    </BrowserRouter>
     
    </>
  )
}

export default App
