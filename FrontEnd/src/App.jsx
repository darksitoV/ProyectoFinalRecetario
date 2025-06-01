import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { AuthProvider } from './AuthContext';
import Header from './Components/Header/Header';
import MainSessionNotStarted from './Pages/Main-SessionNotStarted/Main-SessionNoStarted';
import Footer from './Components/Footer/Footer';
import HomeSession from './Pages/Form- HomeSession/HomeSession'; 
import Form_Registration from './Pages/Form-Registration/Form-Registration';
import Back_Header from './Components/Back-Header/Back-Header';
import HeaderSessionStarted from './Components/Session-Header/HeaderSessionStarted';
import MainSessionStarted from './Pages/Main-SessionStarted/MainSessionStarted';
import RegisterIngredients from './Pages/Form-RegisterIngredients/RegisterIngredients';


function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas (sin protección) */}
          <Route path="/" element={
            <>
              <Header/>
              <MainSessionNotStarted/>
              <Footer/>
            </>
          } />

          <Route path="/login" element={
            <>
              <Back_Header/>
              <HomeSession/>
              <Footer/>
            </>
          } />

          <Route path="/registration" element={
            <>
              <Back_Header/>
              <Form_Registration/>
              <Footer/>
            </>
          }/>

          {/* Ruta padre protegida */}
          <Route element={<PrivateRoute/>}>
            {/* Sub-rutas */}
            <Route path="/home" element={
              <>
                <HeaderSessionStarted/>
                <MainSessionStarted/>
                <Footer/>
              </>
            }/>

            <Route path="/home/register_ingredients" element={
              <>
                <HeaderSessionStarted/>
                <RegisterIngredients/>
                <Footer/>
              </>
            }/>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;