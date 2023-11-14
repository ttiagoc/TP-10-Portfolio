import React, { useState, useEffect, useContext } from 'react'
import { Container } from "react-bootstrap";
import Particle from "../components/Particle";
import { useParams } from 'react-router';
import { CreationsContext } from "../context/CreationsContext";
import { FavouritesContext } from "../context/FavouritesContext"

export default function ProjectDetail() {

    const { GetProyectById,projects } = useContext(CreationsContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState([]);


    const { AddFavourite, DeleteFavourite, favourites } = useContext(FavouritesContext)

    useEffect(() => {

        const getProyect = async () => {
            setLoading(true);
            const proyecto = await GetProyectById(id)
            setProject(proyecto)
            setLoading(false);
        }
        if(projects.length>0)
            getProyect()

    }, [id,projects]);

    const EstaEnFavs = () => {
        console.log(project)
        console.log("favoritos: " + JSON.stringify(favourites))
        const result = favourites.find(({ id }) => id === project.id)
        if (result == undefined) {
            return true
        } else {
            return false
        }
    }



    return (
        <>
            <Particle />
            <Container fluid className="project-section">



                <div className='container text-center'>

                    <h1 className="project-heading pb-2">
                        {project.titulo}
                    </h1>

                    <p style={{ color: 'white', paddingBottom: 10 }}>{project.descripcion}</p>

                    <img src={project.imagen} height="300px" width="auto" style={{ borderRadius: 10 }}></img>
                    <br></br>
                    {EstaEnFavs() ?

                        <button style={{ borderRadius: 10 }} className="mt-4 btn btn-primary" onClick={() => AddFavourite(project)}>Add to favourites</button>
                        :
                        <button style={{ borderRadius: 10 }} className="mt-4 btn btn-primary" onClick={() => DeleteFavourite(project)}>Delete favourite</button>

                    }

                </div>

            </Container>
        </>
    )
}
