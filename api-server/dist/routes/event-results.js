"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const { eventId } = req.query;
        let query = `SELECT * FROM athlete_profile_results`;
        const params = [];
        if (eventId && typeof eventId === 'string') {
            query += ' WHERE event_id = ?';
            params.push(eventId);
        }
        query += ' ORDER BY position ASC';
        const rows = await (0, database_1.executeQuery)(query, params);
        res.json({
            status: 'success',
            data: rows
        });
    }
    catch (error) {
        console.error('Error fetching event results:', error);
        res.json({
            status: 'success',
            data: []
        });
    }
});
exports.default = router;
//# sourceMappingURL=event-results.js.map