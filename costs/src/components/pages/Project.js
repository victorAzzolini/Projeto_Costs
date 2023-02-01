import styles from "./Project.module.css"

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layouts/Loading";
import Container from "../layouts/Container";
import ProjectForm from "../project/ProjectForm"
import Message from "../layouts/Message"

function Project() {

    const { id } = useParams()
    
    const[project, setProject] = useState([])
    const[showProjectForm, setShowProjectForm] = useState(false)
    const[showServiceForm, setShowServiceForm] = useState(false)
    const[message, setMessage] = useState()
    const[type, setType] = useState()

    useEffect(() => {

        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                'Content-type': 'application/json'
                } 
            }).then(resp => resp.json())
            .then((data) => {
                setProject(data)
            })
            .catch(err => console.log(err))
        } , 1000)
    }, [])

    function editPost(project) {
        setMessage('')
        
        //budget validation
        if(project.budget  < project.cost){
            console.log("food")
            setMessage('O orçamento não pode ser menor que o custo do projeto')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then(resp => resp.json())
        .then((data) => {

            console.log(data)
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto Atualizado')
            setType('success')
            //message

        })
        .catch(err => console.log(err))

    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return (
        <div className={styles.project_main}>
            {   
            project.name ? (
            <div className={styles.project_details}>
                <Container className={styles.project_main} customClass="column" >
                    {message && <Message msg={message} type={type}/>}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span>{project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span>{project.budget}
                                </p>
                                <p>
                                    <span>Total utilizado:</span>{project.cost}
                                </p>
                            </div>
                            
                        ): (
                            <div className={styles.project_info}>
                                <ProjectForm 
                                    handleSubmit={editPost}
                                    btnText="Concluir edição"
                                    projectData={project}
                                />
                            </div> 
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                            <h2>Acidicione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar' }
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <div>formulário do serviço</div>
                                )}
                            </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        <p>Itens de serviço</p>    
                    </Container>
                </Container>
            </div>
            ) : ( <Loading />
            )}
        </div>
    )
}

export default Project;