import { Router, Request, Response } from 'express';
import { executeQuery } from '../config/database';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // Generic chart data - can be customized based on query params
    const rows = await executeQuery<any>(`
      SELECT 
        event_name as name,
        AVG(position) as value,
        start_date as date
      FROM athlete_profile_results
      GROUP BY event_name, start_date
      ORDER BY start_date DESC
    `);
    
    res.json({
      status: 'success',
      data: rows
    });
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.json({
      status: 'success',
      data: []
    });
  }
});

export default router;