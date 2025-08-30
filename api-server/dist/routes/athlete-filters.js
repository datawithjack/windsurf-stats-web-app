"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        // Get distinct athletes
        const athletes = await (0, database_1.executeQuery)(`
      SELECT DISTINCT sailor_name as athlete_name 
      FROM athlete_profile_results 
      WHERE sailor_name IS NOT NULL 
      ORDER BY sailor_name
    `);
        // Get distinct years
        const years = await (0, database_1.executeQuery)(`
      SELECT DISTINCT year 
      FROM athlete_profile_results 
      WHERE year IS NOT NULL 
      ORDER BY year DESC
    `);
        console.log('=== ATHLETES RETURNED ===', athletes.length);
        console.log('=== YEARS RETURNED ===', years.length);
        res.json({
            status: 'success',
            data: {
                athletes: athletes || [],
                years: years || []
            }
        });
    }
    catch (error) {
        console.error('Error fetching athlete filters:', error);
        // Return fallback data
        res.json({
            status: 'success',
            data: {
                athletes: [],
                years: []
            }
        });
    }
});
exports.default = router;
//# sourceMappingURL=athlete-filters.js.map