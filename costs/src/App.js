import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Home from "./pages/Home"
import Contato from "./pages/Contato"
import Sobre from "./pages/Sobre"
import NovoProjeto from "./pages/NovoProjeto"

function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/novoProjeto">Novo Projeto</Link>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />}/>
      </Routes>
      <Routes>
        <Route exact path="/contato" element={<Contato />}/>
      </Routes>
      <Routes>
        <Route exact path="/sobre" element={<Sobre />}/>
      </Routes>
      <Routes>
        <Route exact path="/novoProjeto" element={<NovoProjeto />}/>
      </Routes>
      <p>Footer</p>
    </Router>
  );
}

export default App;
