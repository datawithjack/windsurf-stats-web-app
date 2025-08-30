"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        // Generic chart data - can be customized based on query params
        const rows = await (0, database_1.executeQuery)(`
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
    }
    catch (error) {
        console.error('Error fetching chart data:', error);
        res.json({
            status: 'success',
            data: []
        });
    }
});
exports.default = router;
//# sourceMappingURL=chart-data.js.map