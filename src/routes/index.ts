import express from 'express';

const router = express.Router();
router.get('/', (req, res) => res.send({ title: 'Express' }));

export default router;
