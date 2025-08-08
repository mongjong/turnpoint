import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL } from './constants';
import { Client } from './types';

interface ClientState {
    clients: Client[];
    selectedClient: Client | null;
    loading: boolean;
    error: string | null;
}

const initialState: ClientState = {
    clients: [],
    selectedClient: null,
    loading: false,
    error: null,
};

export const getAllClients = createAsyncThunk(
    'clients/getAllClients',
    async () => {
        const response = await axios.get<Client[]>(`${API_URL}/client/all`);
        return response.data;
    });

export const updateClient = createAsyncThunk(
    'clients/update',
    async (client: Client) => {
        const response = await axios.put(`${API_URL}/client/${client.id}`, client);
        return response.data;
    }
);

export const addClient = createAsyncThunk<Client, Omit<Client, 'id'>>(
    'clients/add',
    async (clientData) => {
        const response = await axios.post<Client>(`${API_URL}/client/create`, clientData);
        return response.data;
    });

export const deleteClient = createAsyncThunk(
    'clients/delete',
    async (id: number) => {
        await axios.delete(`${API_URL}/client/${id}`);
        return id;
    });

const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        selectClient(state, action: PayloadAction<Client>) {
            state.selectedClient = action.payload;
        },
        deselectClient(state) {
            state.selectedClient = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllClients.fulfilled, (state, action) => {
                state.clients = action.payload;
                state.loading = false;
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                const idx = state.clients.findIndex((c) => c.id === action.payload.id);
                if (idx >= 0) state.clients[idx] = action.payload;
                state.selectedClient = null;
            })
            .addCase(addClient.fulfilled, (state, action) => {
                state.clients.push(action.payload);
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                state.clients = state.clients.filter((c) => c.id !== action.payload);
            });
    },
});

export const { selectClient, deselectClient } = clientSlice.actions;
export default clientSlice.reducer;