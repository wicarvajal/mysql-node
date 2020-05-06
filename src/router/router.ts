import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heros', (req: Request, res: Response) => {
  const query = `
    SELECT *
    FROM heros
  `;

  MySQL.executeQuery(query, (err: any, heros: any) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err
      })
    } else {
      res.json({
        ok: true,
        heros
      })
    }
  });
});

router.get('/heros/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const escapeId = MySQL.instance.connection.escape(id);

  const query = `
    SELECT *
    FROM heros
    where id = ${escapeId}
  `;

  MySQL.executeQuery(query, (err: any, hero: Object) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err
      })
    } else {
      res.json({
        ok: true,
        hero
      })
    }
  });
});

export default router;