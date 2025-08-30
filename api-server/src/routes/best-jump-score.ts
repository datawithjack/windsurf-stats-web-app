import { Router, Request, Response } from 'express';
import { executeQuery } from '../config/database';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { athlete } = req.query;
    
    let query = `SELECT MAX(total_jump) as best_jump_score, sailor_name FROM PWA_HEAT_DATA`;
    const params: (string | number)[] = [];
    
    if (athlete && typeof athlete === 'string') {
      query += ' WHERE sailor_name = ?';
      params.push(athlete);
    }
    
    query += ' GROUP BY sailor_name ORDER BY best_jump_score DESC';
    
    const rows = await executeQuery<any>(query, params);
    
    res.json({
      status: 'success',
      data: rows
    });
  } catch (error) {
    console.error('Error fetching best jump score:', error);
    res.json({
      status: 'success',
      data: []
    });
  }
});

export default router;