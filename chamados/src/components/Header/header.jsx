// tudo relacionado aos componentes
import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'


// Tudo relacionado a estilos
import avatarImg from '../../assets/avatar.png'
import './header.css'
import { FiHome, FiUser, FiSettings} from 'react-icons/fi'

export default function Header() {
    const { user } = useContext(AuthContext)

    return (
        <header>
            <div className="sidebar">
                <div>
                    <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="Foto do usuario" />
                </div>
                
                <Link to="/dashboard">
                    <FiHome color="#fff" size={24} />
                    Dashoard
                </Link>
                
                <Link to="/customer">
                    <FiUser color="#fff" size={24} />
                    Clientes
                </Link>

                <Link to="/profile">
                    <FiSettings color="#fff" size={24} />
                    Perfil
                </Link>
            </div>
        </header>
    )
}