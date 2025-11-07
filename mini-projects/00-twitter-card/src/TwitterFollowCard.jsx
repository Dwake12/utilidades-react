import { useState } from 'react'
import './assets/app.css'
export function TwitterFollowCard({name, userName, initialIsFollowing}) {
    //IMPLEMENTANDO HOOK
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    //FUNCION PARA REPONDER AL CLICK DEL BOTON, DENTRO DE LA FUNCION EL VALOR DE ISFOLLOWING CAMBIA (FALSE -> TRUE) O (TRUE -> FALSE)

    //CONDICIONAL TERNARIA VALIDAR TEXTO DEL BOTON
    const buttonText = isFollowing ? 'Siguiendo' : 'Seguir'

    //ESTA FUNCION REALIZA EL CAMBIO DEL ESTADO DEL BOTON DE SEGUIR A SIGUIENDO Y VICEVERSA
    const handleClick = () =>{
        setIsFollowing(!isFollowing)
    }

    //CONDICIONAL TERNARIA VALIDAR ESTILOS DEL BOTON
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button' 
    return (
    <article className="tw-followCard">
        <header className="tw-followCard-header">
            <img className="tw-followCard-avatar" src={`https://unavatar.io/${userName}`} alt="avatar" />
            <div className="tw-followCard-info">
                <strong className="tw-followCard-name">{name}</strong>
                <span className="tw-followCard-username">@{userName}</span>
            </div>
        </header>
        <aside className="tw-followCard-aside">
            {/* IMPORTANTE, LOS ADDEVENTLISTER O EVENTOS SE AGREGAR DIRECTAMENTE EN LA ETIQUETA EJ: ONCLICK Y LUEGO LA {FUNCION} QUE SE DISPARA EN RESPUESTA AL EVENTO */}
            <button className={buttonClassName} onClick={handleClick}>
                <span className='tw-following-text'>{buttonText}</span>
                <span className='tw-stop-following-text'>Dejar de seguir</span>
                </button>
        </aside>
    </article>
    )
}