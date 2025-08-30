"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
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
        const params = [];
        if (eventId && typeof eventId === 'string') {
            query += ' WHERE PEC.event_id = ?';
            params.push(eventId);
        }
        query += ' ORDER BY PHS.heat_no, PHS.start_order';
        const rows = await (0, database_1.executeQuery)(query, params);
        res.json({
            status: 'success',
            data: rows
        });
    }
    catch (error) {
        console.error('Error fetching heatsheets:', error);
        res.json({
            status: 'success',
            data: []
        });
    }
});
exports.default = router;
//# sourceMappingURL=heatsheets.js.map