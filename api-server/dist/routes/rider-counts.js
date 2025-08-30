"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const rows = await (0, database_1.executeQuery)(`
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
    }
    catch (error) {
        console.error('Error fetching rider counts:', error);
        res.json({
            status: 'success',
            data: []
        });
    }
});
exports.default = router;
//# sourceMappingURL=rider-counts.js.map