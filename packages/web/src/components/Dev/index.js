import React from 'react';

import './styles.css';

export default function Dev({ dev: { login, name, avatar_url, bio, techs } }) {
    return (
        <li className="dev-item">
            <header>
                <img src={avatar_url} alt={name} />

                <div className="user-info">
                    <strong>{name}</strong>
                    <span>{techs.join(', ')}</span>
                </div>
            </header>

            <p>{bio ? bio : 'Sem biografia.'}</p>
            <a href={`https://github.com/${login}`}>Acessar perfil no GitHub</a>
        </li>
    );
}
