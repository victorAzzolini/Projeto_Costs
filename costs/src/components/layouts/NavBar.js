import {Link} from "react-router-dom"

import logo from "../../img/costs_logo.png"

import styles from "./NavBar.module.css"

function NavBar(){
    return (
        <nav className={styles.navbar}>
            <Link to="/">
                <img src={logo} alt="Logo Costs"></img>
            </Link>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to="/">Home</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/projects">Projetos</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/contato">Contato</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/sobre">Sobre</Link>
                </li>
            </ul>
        </nav>
    )
};

export default NavBar