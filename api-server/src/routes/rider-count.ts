import { Router, Request, Response } from 'express';
import { executeQuery } from '../config/database';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { eventId } = req.query;
    
    let query = `SELECT COUNT(DISTINCT sailor_name) as count FROM athlete_profile_results`;
    const params: (string | number)[] = [];
    
    if (eventId && typeof eventId === 'string') {
      query += ' WHERE event_id = ?';
      params.push(eventId);
    }
    
    const result = await executeQuery<{count: number}>(query, params);
    const count = result.length > 0 ? result[0].count : 0;
    
    res.json({
      status: 'success',
      data: { count }
    });
  } catch (error) {
    console.error('Error fetching rider count:', error);
    res.json({
      status: 'success',
      data: { count: 0 }
    });
  }
});

export default router;