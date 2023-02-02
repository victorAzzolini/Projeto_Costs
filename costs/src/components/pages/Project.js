import styles from "./Project.module.css"

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid' 

import Loading from "../layouts/Loading";
import Container from "../layouts/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layouts/Message";
import ServiceForm from "../services/ServiceForm";
import ServiceCard from "../services/ServiceCard"

function Project() {

    const { id } = useParams()
    
    const[project, setProject] = useState([])
    const[services, setServices] = useState([])
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
                setServices(data.services)
            })
            .catch(err => console.log(err))
        } , 1000)
    }, [id])

    function editPost(project) {
        setMessage('')
        
        //budget validation
        if(project.budget  < project.cost){
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
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto Atualizado')
            setType('success')
        })
        .catch(err => console.log(err))

    }

    function createService(project){

        //last service
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //maximum value validation
        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        //add service cost to project total cost
        project.cost = newCost

        //update
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(resp => resp.json())
        .then((data) => {
            setServices(data.services)
            setShowServiceForm(!showServiceForm)
            setMessage('Serviço adicionado!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    function removeService(id, cost) {
        console.log(id)
        const servicesUpdate = project.services.filter(
            (service) => service.id !== id
        )
        console.log(servicesUpdate)
        const projectUpdated = project

        projectUpdated.services = servicesUpdate
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then(resp => resp.json())
        .then((data) => {
            console.log('hempadao')
            setProject(data)
            setServices(data.services)
            setMessage("Serviço excluido")
            setType('success')
            
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
                <div>
                    {message && <Message msg={message} type={type}/>}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total utilizado:</span> R${project.cost}
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
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}
                                    
                                    />
                                )}
                            </div>
                    </div>
                    <h2>Serviços</h2>
                    <div className={styles.service_container}>
                        {services.length > 0 &&
                            services.map((service) => (
                            <ServiceCard
                                id={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                key={service.id}
                                handleRemove={removeService}
                            />
                        ))}
                    {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                                
                    
                         
                    </div>
                </div>
            </div>
            ) : ( <Loading />
            )}
        </div>
    )
}

export default Project;