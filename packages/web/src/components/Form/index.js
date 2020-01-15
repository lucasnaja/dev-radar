import React, { useState, useEffect } from 'react';

export default function Form({ handleSubmit }) {
    const [login, setLogin] = useState('');
    const [techs, setTechs] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    useEffect(function() {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { longitude: long, latitude: lat } = position.coords;

                setLongitude(long);
                setLatitude(lat);
            },
            err => console.log(err),
            { enableHighAccuracy: true, timeout: 30000 }
        );
    }, []);

    async function handleAddDev(e) {
        e.preventDefault();

        await handleSubmit({ login, techs, longitude, latitude });

        setLogin('');
        setTechs('');
    }

    return (
        <aside>
            <strong>Cadastrar</strong>

            <form onSubmit={handleAddDev}>
                <div className="input-block">
                    <label htmlFor="login">Usuário do GitHub</label>
                    <input
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        type="text"
                        name="login"
                        id="login"
                        required
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="techs">Tecnologias</label>
                    <input
                        value={techs}
                        onChange={e => setTechs(e.target.value)}
                        type="text"
                        name="techs"
                        id="techs"
                        required
                    />
                </div>

                <div className="input-group">
                    <div className="input-block">
                        <label htmlFor="longitude">Longitude</label>
                        <input
                            value={longitude}
                            onChange={e => setLongitude(e.target.value)}
                            type="text"
                            name="longitude"
                            id="longitude"
                            required
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="latitude">Latitude</label>
                        <input
                            value={latitude}
                            onChange={e => setLatitude(e.target.value)}
                            type="text"
                            name="latitude"
                            id="latitude"
                            required
                        />
                    </div>
                </div>

                <button type="submit">Salvar</button>
            </form>
        </aside>
    );
}
