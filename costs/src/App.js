import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./components/pages/Home"
import Contato from "./components/pages/Contato"
import Sobre from "./components/pages/Sobre"
import NovoProjeto from "./components/pages/NovoProjeto"
import Container from "./components/layouts/Container"
import Projects from "./components/pages/Projects"

import NavBar from "./components/layouts/NavBar"
import Footer from "./components/layouts/Footer"

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/projects" element={<Projects />}/>
          <Route exact path="/contato" element={<Contato />}/>
          <Route exact path="/sobre" element={<Sobre />}/>
          <Route exact path="/novoProjeto" element={<NovoProjeto />}/>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
