import { Router, Request, Response } from 'express';
import { executeQuery } from '../config/database';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const rows = await executeQuery<any>(`
      SELECT 
        event_name,
        COUNT(DISTINCT sailor_name) as rider_count,
        event_id
      FROM athlete_profile_results
      GROUP BY event_name, event_id
      ORDER BY rider_count DESC
    `);
    
    res.json({
      status: 'success',
      data: rows
    });
  } catch (error) {
    console.error('Error fetching rider counts:', error);
    res.json({
      status: 'success',
      data: []
    });
  }
});

export default router;