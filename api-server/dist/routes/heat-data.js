"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const { eventId } = req.query;
        let query = `
      SELECT
        PHD.heat_data_id,
        PHD.category_code, 
        PHD.heatsheet_id, 
        PHD.heat_id, 
        PHD.heat_no, 
        PHD.wave_count, 
        PHD.jumps_count, 
        PHD.wave_factor, 
        PHD.jump_factor, 
        PHD.sailor_name, 
        PHD.sail_number, 
        PHD.total_wave, 
        PHD.total_jump, 
        PHD.total_points,
        PEC.event_name,
        PEC.event_id,
        PHD.score_type,
        PHD.score
      FROM PWA_HEAT_DATA AS PHD
      LEFT JOIN PWA_EVENT_CATEGORIES AS PEC ON PHD.category_code = PEC.category_code
    `;
        const params = [];
        // Add event filtering when eventId is provided
        if (eventId && typeof eventId === 'string') {
            query += ' WHERE PEC.event_id = ?';
            params.push(eventId);
        }
        query += ' ORDER BY PHD.total_points DESC';
        console.log('=== EXECUTING HEAT DATA QUERY ===', query);
        console.log('=== WITH PARAMS ===', params);
        const rows = await (0, database_1.executeQuery)(query, params);
        console.log('=== HEAT DATA ROWS RETURNED ===', rows.length);
        if (rows.length > 0) {
            console.log('=== FIRST ROW SAMPLE ===', JSON.stringify(rows[0], null, 2));
        }
        res.json({
            status: 'success',
            data: rows
        });
    }
    catch (error) {
        console.error('Error fetching heat data:', error);
        res.json({
            status: 'success',
            data: []
        });
    }
});
exports.default = router;
//# sourceMappingURL=heat-data.js.map