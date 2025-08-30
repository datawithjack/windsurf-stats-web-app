"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const { athlete, year } = req.query;
        let query = `
      SELECT *
      FROM athlete_profile_results
    `;
        const params = [];
        const conditions = [];
        // Add athlete filtering when athlete is provided
        if (athlete && typeof athlete === 'string') {
            conditions.push('sailor_name = ?');
            params.push(athlete);
        }
        // Add year filtering when year is provided
        if (year && typeof year === 'string') {
            conditions.push('year = ?');
            params.push(year);
        }
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        query += ' ORDER BY start_date DESC';
        console.log('=== EXECUTING ATHLETE PROFILE QUERY ===', query);
        console.log('=== WITH PARAMS ===', params);
        const rows = await (0, database_1.executeQuery)(query, params);
        console.log('=== ROWS RETURNED ===', rows.length);
        if (rows.length > 0) {
            console.log('=== FIRST ROW SAMPLE ===', JSON.stringify(rows[0], null, 2));
        }
        res.json({
            status: 'success',
            data: rows,
        });
    }
    catch (error) {
        console.error('Error fetching athlete profile results:', error);
        // Return fallback data like the original Next.js implementation
        res.json({
            status: 'success',
            data: [],
        });
    }
});
exports.default = router;
//# sourceMappingURL=athlete-profile-results.js.map