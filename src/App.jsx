import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './Components/Header/Header'
import MainSessionNotStarted from './Pages/Main-SessionNotStarted/Main-SessionNoStarted'
import Footer from './Components/Footer/Footer'
import HomeSession from './Pages/Form- HomeSession/HomeSession';
import Form_Registration from './Pages/Form-Registration/Form-Registration';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>

        <Route path="/" element={
          <MainSessionNotStarted />
          } />

        <Route path="/login" element={
          <HomeSession />
          } />

        <Route path='registration' element={
          <Form_Registration/>
          }/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
