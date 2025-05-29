import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './Components/Header/Header'
import MainSessionNotStarted from './Pages/Main-SessionNotStarted/Main-SessionNoStarted'
import Footer from './Components/Footer/Footer'
import HomeSession from './Pages/Form- HomeSession/HomeSession';
import Form_Registration from './Pages/Form-Registration/Form-Registration';
import Back_Header from './Components/Back-Header/Back-Header';
import HeaderSessionStarted from './Components/Session-Header/HeaderSessionStarted';
import MainSessionStarted from './Pages/Main-SessionStarted/MainSessionStarted';
import RegisterIngredients from './Pages/Form-RegisterIngredients/RegisterIngredients';

function App() {
  return (
    <div className='App'>

      <Routes>

        <Route path="/" element={
          <>
          <Header/>
          <MainSessionNotStarted/>
          </>
          } />

        <Route path="/login" element={
          <>
          <Back_Header/>
          <HomeSession/>
          </>
          } />

        <Route path='/registration' element={
          <>
          <Back_Header/>
          <Form_Registration/>
          </>
          }/>

        <Route path='/home' element={
          <>
          <HeaderSessionStarted/>
          <MainSessionStarted/>
          </>
          }/>

        <Route path='/home/register_ingredients' element={
          <>
          <HeaderSessionStarted/>
          <RegisterIngredients/>
          </>
          }/>
          
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
