import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import { useAppDispatch, useAppSelector } from '../hooks';
import { deleteClient, getAllClients, updateClient } from '../clientSlice';
import { clientSchema } from '../validation/clientSchema';
import { FUNDING, LANGUAGES } from '../constants';
import Selector from './Selector';

const ClientDetails = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const client = useAppSelector((state) =>
        state.clients.clients.find((c) => c.id === Number(id))
    );

    const [name, setName] = useState(client?.name ?? '');
    const [dateOfBirth, setDateOfBirth] = useState(client?.date_of_birth ?? '');
    const [funding, setFunding] = useState(client?.funding ?? '');
    const [mainLanguage, setMainLanguage] = useState(client?.main_language ?? '');
    const [secondaryLanguage, setSecondaryLanguage] = useState(client?.secondary_language ?? '');

    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (!client) {
            dispatch(getAllClients());
        } else {
            setName(client.name);
            setDateOfBirth(format(client.date_of_birth, 'yyyy-MM-dd'));
            setFunding(client.funding);
            setMainLanguage(client.main_language);
            setSecondaryLanguage(client.secondary_language);
        }
    }, [dispatch, client]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = clientSchema.safeParse({
            name,
            date_of_birth: dateOfBirth,
            funding,
            main_language: mainLanguage,
            secondary_language: secondaryLanguage,
        });
        if (!result.success) {
            setFormError(result.error.issues[0].message);
            return;
        }

        if (!client) return;
        dispatch(updateClient({
            ...client,
            name,
            date_of_birth: dateOfBirth,
            funding,
            main_language: mainLanguage,
            secondary_language: secondaryLanguage,
        })).then(() => {
            navigate('/');
        });
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            dispatch(deleteClient(id))
                .then(() => {
                    navigate('/');
                });
        }
    };

    if (!client) return <p>Loading client...</p>;

    return (
        <div className="container">
            <h2>Client Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </div>
                <div>
                    <Selector
                        label="Funding"
                        placeholder="Select funding"
                        value={funding}
                        onChange={setFunding}
                        options={FUNDING}
                    />
                </div>
                <div>
                    <Selector
                        label="Main Language"
                        placeholder="Select main language"
                        value={mainLanguage}
                        onChange={setMainLanguage}
                        options={LANGUAGES}
                    />
                </div>
                <div>
                    <Selector
                        label="Secondary Language"
                        placeholder="Select secondary language"
                        value={secondaryLanguage}
                        onChange={setSecondaryLanguage}
                        options={LANGUAGES}
                    />
                </div>

                {formError && <p style={{ color: 'red' }}>{formError}</p>}

                <div className="buttonContainer">
                    <button type="submit" className="primary">
                        Save
                    </button>
                    <button type="button" className="secondary" onClick={() => navigate('/')}>
                        Cancel
                    </button>
                    <button type="button" className="danger" onClick={() => handleDelete(client.id)}>
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClientDetails;
