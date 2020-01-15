import React, { useState, useEffect } from 'react';

import Dev from '~/components/Dev';
import Form from '~/components/Form';

import devradar_api from '~/services/DevRadar.service';

import '~/App.css';
import '~/Sidebar.css';
import '~/Main.css';

export default function App() {
    const [devs, setDevs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(function() {
        loadDevs();
    }, []);

    async function handleSubmit({ login, techs, longitude, latitude }) {
        await devradar_api.post('/devs', {
            login,
            techs,
            longitude,
            latitude,
        });

        setLoading(true);
        loadDevs();
    }

    async function loadDevs() {
        const { data } = await devradar_api.get('/devs');

        setDevs(data);
        setLoading(false);
    }

    return (
        <div id="app">
            <Form handleSubmit={handleSubmit} />

            <main>
                <ul>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : (
                        devs.map(dev => <Dev key={dev._id} dev={dev} />)
                    )}
                </ul>
            </main>
        </div>
    );
}
