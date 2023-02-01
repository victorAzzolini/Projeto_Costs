import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Message from "../layouts/Message";
import Container from "../layouts/Container";
import LinkButton from '../layouts/LinkButton';
import ProjectCard from '../project/ProjetCard';
import Loading from '../layouts/Loading';

import styles from './Projects.module.css';


function Projects() {

    const[projects, setProjects] = useState([])
    const[removedLoading, setRemovedLoading] = useState(false);
    const[projectMessage, setProjectMessage] = useState("")

    const location = useLocation();
    let message = ""
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                }
            }).then((resp) => resp.json())
            .then(data => {
                console.log(data)
                setProjects(data)
                setRemovedLoading(true)
            })
            .catch((err) => console.log(err))
        }, 1000)
    }, [])

    function removeProject(id) {
        setProjectMessage("")
        
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json'
            }
        }).then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id != id))
            setProjectMessage('Projeto Removido com sucesso')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/novoProjeto" text="Criar Projeto"/>
            </div>
            {message && <Message msg={message} type="success" />}
            {projectMessage && <Message msg={projectMessage} type="success" />}
            <Container>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard 
                        name={project.name}
                        id={project.id}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        handleRemove={removeProject}
                        />
                    ))    
                }
                {!removedLoading && <Loading/>}
                {removedLoading && projects.length === 0 && (
                    <p>Não existem projetos criados</p>
                )
                }
            </Container>
        </div>
    )
};

export default Projects;