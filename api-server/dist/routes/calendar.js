"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const rows = await (0, database_1.executeQuery)(`SELECT 
        ec.event_id,
        ec.event_name,
        ec.section,
        ec.start_date,
        ec.end_date,
        COUNT(DISTINCT ec.category_code) AS category_count,
        COALESCE(per.total, 0) as rider_count
      FROM PWA_EVENT_CATEGORIES ec
      LEFT JOIN (
        SELECT 
          event_id,
          COUNT(DISTINCT sailor_href) as total
        FROM PWA_EVENT_RESULTS
        GROUP BY event_id
      ) per ON ec.event_id = per.event_id
      WHERE ec.section = 'completed events'
      GROUP BY ec.event_id, ec.event_name, ec.section, ec.start_date, ec.end_date, per.total
      ORDER BY ec.start_date DESC;`);
        console.log('=== CALENDAR EVENTS RETURNED ===', rows.length);
        res.json({
            status: 'success',
            data: rows
        });
    }
    catch (error) {
        console.error('Error fetching calendar events:', error);
        // Return fallback data
        res.json({
            status: 'success',
            data: []
        });
    }
});
exports.default = router;
//# sourceMappingURL=calendar.js.map