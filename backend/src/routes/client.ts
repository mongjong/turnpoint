import express, { NextFunction, Request, Response } from 'express';
import client from '../controllers/client';

const router = express.Router();

router.get('/all', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await client.findAll();
        res.json(data);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Error while getting all clients ', err.message);
        }
        next(err);
    }
});

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await client.create(req.body);
        res.json(data);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Error while creating client ', err.message);
        }
        next(err);
    }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await client.update(req.params.id, req.body);
        res.json(data);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Error while updating client ', err.message);
        }
        next(err);
    }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await client.deleteById(req.params.id);
        res.json(data);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Error while deleting client ', err.message);
        }
        next(err);
    }
});

export default router;
