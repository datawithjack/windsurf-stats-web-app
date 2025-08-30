#!/usr/bin/env node

/**
 * Script to update Next.js API routes to proxy to standalone API server
 * This converts direct MySQL calls to HTTP calls to the Express API server
 */

const fs = require('fs');
const path = require('path');

// Route configurations - mapping from Next.js routes to API client methods
const routeConfigs = [
  {
    file: 'src/app/api/calendar/route.ts',
    apiMethod: 'getCalendarEvents',
    hasParams: false
  },
  {
    file: 'src/app/api/heat-data/route.ts',
    apiMethod: 'getHeatData',
    hasParams: true,
    params: ['eventId']
  },
  {
    file: 'src/app/api/heatsheets/route.ts',
    apiMethod: 'getHeatsheets',
    hasParams: true,
    params: ['eventId']
  },
  {
    file: 'src/app/api/best-heat-scores/route.ts',
    apiMethod: 'getBestHeatScores',
    hasParams: true,
    params: ['athlete']
  },
  {
    file: 'src/app/api/best-jumps-waves/route.ts',
    apiMethod: 'getBestJumpsWaves',
    hasParams: true,
    params: ['athlete']
  },
  {
    file: 'src/app/api/rider-counts/route.ts',
    apiMethod: 'getRiderCounts',
    hasParams: false
  },
  {
    file: 'src/app/api/chart-data/route.ts',
    apiMethod: 'getChartData',
    hasParams: false
  },
  {
    file: 'src/app/api/best-wave-score/route.ts',
    apiMethod: 'getBestWaveScore',
    hasParams: true,
    params: ['athlete']
  },
  {
    file: 'src/app/api/best-jump-score/route.ts',
    apiMethod: 'getBestJumpScore',
    hasParams: true,
    params: ['athlete']
  },
  {
    file: 'src/app/api/best-heat-score/route.ts',
    apiMethod: 'getBestHeatScore',
    hasParams: true,
    params: ['athlete']
  },
  {
    file: 'src/app/api/event-results/route.ts',
    apiMethod: 'getEventResults',
    hasParams: true,
    params: ['eventId']
  },
  {
    file: 'src/app/api/rider-count/route.ts',
    apiMethod: 'getRiderCount',
    hasParams: true,
    params: ['eventId'],
    specialReturn: true // Returns { count: number }
  }
];

// Generate the new route content
function generateRouteContent(config) {
  const relativePath = '../'.repeat(config.file.split('/').length - 2);
  const importPath = `${relativePath}lib/api-client`;
  
  let paramExtraction = '';
  let paramPassing = '';
  let logParams = '';
  
  if (config.hasParams && config.params) {
    // Extract parameters from searchParams
    paramExtraction = config.params.map(param => 
      `  const ${param} = searchParams.get('${param}');`
    ).join('\n');
    
    // Pass parameters to API method
    paramPassing = config.params.map(param => 
      `${param} || undefined`
    ).join(',\n      ');
    
    // Log parameters
    logParams = `console.log('=== PARAMS ===', { ${config.params.join(', ')} });`;
  }
  
  const hasRequestParam = config.hasParams ? 'request: Request' : '';
  const extractParams = config.hasParams ? `  const { searchParams } = new URL(request.url);\n${paramExtraction}` : '';
  const methodCall = config.hasParams 
    ? `${config.apiMethod}(\n      ${paramPassing}\n    )` 
    : `${config.apiMethod}()`;
  
  // Handle special return format for rider-count
  const returnStatement = config.specialReturn 
    ? 'return NextResponse.json(data);'
    : 'return NextResponse.json(data);';

  return `import { NextResponse } from 'next/server';
import { ${config.apiMethod} } from '${importPath}';

export async function GET(${hasRequestParam}) {
${extractParams}
  
  try {
    console.log('=== PROXYING TO API SERVER ===');
    ${logParams}

    const data = await ${methodCall};

    console.log('=== API SERVER RESPONSE ===', Array.isArray(data) ? data.length + ' records' : data);
    
    ${returnStatement}
  } catch (error) {
    console.error('Error proxying to API server:', error);
    return NextResponse.json(${config.specialReturn ? '{ count: 0 }' : '[]'}, { status: 200 });
  }
}`;
}

// Update each route file
console.log('🔄 Updating Next.js API routes to proxy to standalone API server...\n');

routeConfigs.forEach(config => {
  const filePath = path.join(__dirname, config.file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${config.file}`);
    return;
  }
  
  const newContent = generateRouteContent(config);
  
  try {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ Updated: ${config.file}`);
  } catch (error) {
    console.error(`❌ Failed to update ${config.file}:`, error.message);
  }
});

console.log('\n🎉 API route updates completed!');
console.log('\n📋 Next steps:');
console.log('1. Add API_BASE_URL to your .env.local file');
console.log('2. Start the standalone API server: cd api-server && npm run dev');
console.log('3. Test the Next.js app to ensure all routes work');
console.log('4. Deploy the API server to your Oracle VM');
console.log('5. Update API_BASE_URL for production deployment');