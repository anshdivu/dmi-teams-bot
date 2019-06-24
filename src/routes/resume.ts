import express from 'express';
import { downloadResume } from '../bot/experience';
import Environment from '../config/environment';

const env = new Environment();
const router = express.Router();

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  const { data, headers } = await downloadResume(id, env.experience);

  res.writeHead(200, headers);
  data.on('error', next).pipe(res);
});

export default router;
