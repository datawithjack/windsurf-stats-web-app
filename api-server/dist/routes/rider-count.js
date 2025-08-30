"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const { eventId } = req.query;
        let query = `SELECT COUNT(DISTINCT sailor_name) as count FROM athlete_profile_results`;
        const params = [];
        if (eventId && typeof eventId === 'string') {
            query += ' WHERE event_id = ?';
            params.push(eventId);
        }
        const result = await (0, database_1.executeQuery)(query, params);
        const count = result.length > 0 ? result[0].count : 0;
        res.json({
            status: 'success',
            data: { count }
        });
    }
    catch (error) {
        console.error('Error fetching rider count:', error);
        res.json({
            status: 'success',
            data: { count: 0 }
        });
    }
});
exports.default = router;
//# sourceMappingURL=rider-count.js.map