import { Router, Request, Response } from 'express';
import { executeQuery } from '../config/database';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { eventId } = req.query;
    
    let query = `SELECT * FROM athlete_profile_results`;
    const params: (string | number)[] = [];
    
    if (eventId && typeof eventId === 'string') {
      query += ' WHERE event_id = ?';
      params.push(eventId);
    }
    
    query += ' ORDER BY position ASC';
    
    const rows = await executeQuery<any>(query, params);
    
    res.json({
      status: 'success',
      data: rows
    });
  } catch (error) {
    console.error('Error fetching event results:', error);
    res.json({
      status: 'success',
      data: []
    });
  }
});

export default router;