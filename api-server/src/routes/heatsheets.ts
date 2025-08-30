import { Router, Request, Response } from 'express';
import { executeQuery } from '../config/database';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { eventId } = req.query;
    
    let query = `
      SELECT DISTINCT
        PHS.heatsheet_id,
        PHS.category_code,
        PHS.heat_id,
        PHS.heat_no,
        PHS.sailor_name,
        PHS.sail_number,
        PHS.start_order,
        PEC.event_name,
        PEC.event_id
      FROM PWA_HEATSHEETS AS PHS
      LEFT JOIN PWA_EVENT_CATEGORIES AS PEC ON PHS.category_code = PEC.category_code
    `;
    
    const params: (string | number)[] = [];
    
    if (eventId && typeof eventId === 'string') {
      query += ' WHERE PEC.event_id = ?';
      params.push(eventId);
    }
    
    query += ' ORDER BY PHS.heat_no, PHS.start_order';

    const rows = await executeQuery<any>(query, params);
    
    res.json({
      status: 'success',
      data: rows
    });
  } catch (error) {
    console.error('Error fetching heatsheets:', error);
    res.json({
      status: 'success',
      data: []
    });
  }
});

export default router;