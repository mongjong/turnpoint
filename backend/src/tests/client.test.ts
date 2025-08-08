import request from 'supertest';
import app from '../index';
import clientController from '../controllers/client';

jest.mock('../controllers/client');

const mockedClientController = clientController as jest.Mocked<typeof clientController>;

const JohnSmithClient = {
    id: 1,
    name: "John Smith",
    date_of_birth: "2025-07-31T14:00:00.000Z",
    funding: "HCP",
    main_language: "English",
    secondary_language: ""
};

describe('GET /client/all', () => {
    it('should return all users', async () => {
        mockedClientController.findAll.mockResolvedValueOnce([JohnSmithClient]);

        const res = await request(app).get('/client/all');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toContainEqual(JohnSmithClient);
    });
});
