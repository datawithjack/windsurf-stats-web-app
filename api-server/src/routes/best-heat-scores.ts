import { Router, Request, Response } from 'express';
import { executeQuery } from '../config/database';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { athlete } = req.query;
    
    let query = `
      SELECT 
        sailor_name,
        MAX(total_points) as best_score,
        event_name,
        category_code
      FROM PWA_HEAT_DATA PHD
      LEFT JOIN PWA_EVENT_CATEGORIES PEC ON PHD.category_code = PEC.category_code
    `;
    
    const params: (string | number)[] = [];
    
    if (athlete && typeof athlete === 'string') {
      query += ' WHERE sailor_name = ?';
      params.push(athlete);
    }
    
    query += ' GROUP BY sailor_name, event_name, category_code ORDER BY best_score DESC';

    const rows = await executeQuery<any>(query, params);
    
    res.json({
      status: 'success',
      data: rows
    });
  } catch (error) {
    console.error('Error fetching best heat scores:', error);
    res.json({
      status: 'success',
      data: []
    });
  }
});

export default router;