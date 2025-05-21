import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './Components/Header/Header'
import MainSessionNotStarted from './Pages/Main-SessionNotStarted/Main-SessionNoStarted'
import Footer from './Components/Footer/Footer'
import HomeSession from './Pages/Form- HomeSession/HomeSession';
import Form_Registration from './Pages/Form-Registration/Form-Registration';
import Back_Header from './Components/Back-Header/Back-Header';

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

        <Route path='registration' element={
          <>
          <Back_Header/>
          <Form_Registration/>
          </>
          }/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
