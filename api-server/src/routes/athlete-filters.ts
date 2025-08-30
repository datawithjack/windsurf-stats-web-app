import { Router, Request, Response } from 'express';
import { executeQuery } from '../config/database';
import { AthleteFilter, YearFilter } from '../types';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // Get distinct athletes
    const athletes = await executeQuery<AthleteFilter>(`
      SELECT DISTINCT sailor_name as athlete_name 
      FROM athlete_profile_results 
      WHERE sailor_name IS NOT NULL 
      ORDER BY sailor_name
    `);

    // Get distinct years
    const years = await executeQuery<YearFilter>(`
      SELECT DISTINCT year 
      FROM athlete_profile_results 
      WHERE year IS NOT NULL 
      ORDER BY year DESC
    `);

    console.log('=== ATHLETES RETURNED ===', athletes.length);
    console.log('=== YEARS RETURNED ===', years.length);
    
    res.json({
      status: 'success',
      data: {
        athletes: athletes || [],
        years: years || []
      }
    });
  } catch (error) {
    console.error('Error fetching athlete filters:', error);
    
    // Return fallback data
    res.json({
      status: 'success',
      data: {
        athletes: [],
        years: []
      }
    });
  }
});

export default router;