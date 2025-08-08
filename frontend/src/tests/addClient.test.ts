import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';

import clientsReducer, { addClient } from '../clientSlice';
import { Client } from '../types';
import { API_URL } from '../constants';

const mock = new MockAdapter(axios);

describe('addClient', () => {
    const initialState = {
        clients: [],
        selectedClient: null,
        loading: false,
        error: null,
    };

    const store = configureStore({
        reducer: {
            clients: clientsReducer,
        },
        preloadedState: {
            clients: initialState,
        },
    });

    afterEach(() => {
        mock.reset();
    });

    it('should add a new client and return the created client', async () => {
        const newClientData = {
            name: 'Jane Doe',
            date_of_birth: '1985-05-20',
            funding: 'NDIS',
            main_language: 'English',
            secondary_language: 'French',
        };

        const createdClient: Client = {
            id: 1,
            ...newClientData,
        };

        mock.onPost(`${API_URL}/client/create`).reply(200, createdClient);

        const result = await store.dispatch(addClient(newClientData));
        const state = store.getState().clients;

        expect(result.type).toBe('clients/add/fulfilled');
        expect(result.payload).toEqual(createdClient);
        expect(state.clients).toContainEqual(createdClient);
    });

    it('should fail to add a new client', async () => {
        const newClientData = {
            name: 'John Smith',
            date_of_birth: '',
            funding: '',
            main_language: 'English',
            secondary_language: 'French',
        };

        const createdClient: Client = {
            id: 2,
            ...newClientData,
        };

        mock.onPost(`${API_URL}/client/create`).reply(500, createdClient);

        const result = await store.dispatch(addClient(newClientData));

        expect(result.type).toBe('clients/add/rejected');
        expect(result.payload).toEqual(undefined);
    });
});
