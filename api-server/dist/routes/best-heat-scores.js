"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
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
        const params = [];
        if (athlete && typeof athlete === 'string') {
            query += ' WHERE sailor_name = ?';
            params.push(athlete);
        }
        query += ' GROUP BY sailor_name, event_name, category_code ORDER BY best_score DESC';
        const rows = await (0, database_1.executeQuery)(query, params);
        res.json({
            status: 'success',
            data: rows
        });
    }
    catch (error) {
        console.error('Error fetching best heat scores:', error);
        res.json({
            status: 'success',
            data: []
        });
    }
});
exports.default = router;
//# sourceMappingURL=best-heat-scores.js.map