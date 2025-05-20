import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './Components/Header/Header'
import MainSessionNotStarted from './Pages/Main-SessionNotStarted/Main-SessionNoStarted'
import Footer from './Components/Footer/Footer'
import FormStartSession from './Pages/Form-StartSession/FormStarSession'

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path="/" element={<MainSessionNotStarted />} />
        <Route path="/login" element={<FormStartSession />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
