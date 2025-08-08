import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import { getAllClients } from '../clientSlice';

const ClientList = () => {
    const dispatch = useAppDispatch();
    const { clients, loading, error } = useAppSelector((state) => state.clients);

    useEffect(() => {
        dispatch(getAllClients());
    }, [dispatch]);

    return (
        <div className="container">
            <h1>Clients</h1>
            <div>
                <Link to="/client/new">
                    <button>Add New Client</button>
                </Link>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        <Link to={`/client/${client.id}`}>{client.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;
