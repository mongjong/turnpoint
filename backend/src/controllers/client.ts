import db from '../../db/database';

type ClientType = {
    id: number;
    name: string;
    date_of_birth: string;
    funding: string;
    main_language: string;
    secondary_language: string;
}

async function create(data: ClientType): Promise<number[]> {
    return await db('client').insert(data);
}

async function findAll(): Promise<ClientType[]> {
    return await db('client').select('*');
}

async function update(id: string, data: Partial<ClientType>): Promise<ClientType> {
    return await db('client').where('id', id).update(data);
}

async function deleteById(id: string): Promise<void> {
    return await db('client').where('id', id).delete()
}

export default {
    create,
    deleteById,
    findAll,
    update,
};