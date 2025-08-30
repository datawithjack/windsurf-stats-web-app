"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const { athlete } = req.query;
        let query = `SELECT MAX(total_jump) as best_jump_score, sailor_name FROM PWA_HEAT_DATA`;
        const params = [];
        if (athlete && typeof athlete === 'string') {
            query += ' WHERE sailor_name = ?';
            params.push(athlete);
        }
        query += ' GROUP BY sailor_name ORDER BY best_jump_score DESC';
        const rows = await (0, database_1.executeQuery)(query, params);
        res.json({
            status: 'success',
            data: rows
        });
    }
    catch (error) {
        console.error('Error fetching best jump score:', error);
        res.json({
            status: 'success',
            data: []
        });
    }
});
exports.default = router;
//# sourceMappingURL=best-jump-score.js.map