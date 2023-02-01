import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Home from "./components/pages/Home"
import Contato from "./components/pages/Contato"
import Sobre from "./components/pages/Sobre"
import NovoProjeto from "./components/pages/NovoProjeto"
import Container from "./components/layouts/Container"
import Projects from "./components/pages/Projects"
import NavBar from "./components/layouts/NavBar"
import Footer from "./components/layouts/Footer"
import Project from "./components/pages/Project"

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/contato" element={<Contato />}/>
          <Route path="/sobre" element={<Sobre />}/>
          <Route path="/novoProjeto" element={<NovoProjeto />}/>
          <Route path="/project/:id" element={<Project />}/>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
