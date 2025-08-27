---
description: Enforces established windsurf statistics web app design system standards including font weights, chart patterns, color consistency, and component styling
---

You are working on a Next.js 15 windsurf statistics web application with an established design system. ALWAYS follow these design standards:

## Font Weight Standards
- ALL components MUST use `font-normal` (400 weight) only
- NEVER use `font-semibold`, `font-medium`, `font-bold`, or `font-extrabold`
- The `globals.css` enforces this: any attempt to use heavier weights will be overridden to 400

## Color System Requirements
- ALWAYS import and use `chartColors` from `@/lib/chart-colors`
- Primary color: `chartColors.primary` (#1abc9c) - for best scores/primary data
- Secondary color: `chartColors.secondary` (#477fae) - for average scores/secondary data  
- NEVER use hardcoded colors like `bg-blue-500`, `text-[#1abc9c]`, or inline hex values
- For multi-series charts, use `chartColors.barChartColors` or `chartColors.lineChartColors` arrays
- Use `chartColors.withOpacity(color, opacity)` for transparency variants

## Chart Component Patterns
All Recharts components must follow this structure:
- Container: `bg-white/95 backdrop-blur-sm shadow-xl border border-white/20 rounded-lg p-6 h-full flex flex-col`
- Title: `text-lg font-normal text-gray-900 mb-4 flex-shrink-0`
- Chart wrapper: `flex-grow` to fill remaining space
- Always use `chartColors.primary` and `chartColors.secondary` for data colors

## Table Standards
Container structure:
```tsx
<div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 h-full flex flex-col">
  <div className="flex items-center justify-between mb-4 flex-shrink-0">
    <h3 className="text-lg font-normal text-gray-800">Table Title</h3>
    {/* Optional: filter buttons or spacer div */}
  </div>
  <div className="overflow-auto flex-1 max-h-96">
    <table className="min-w-full">
      {/* Table content */}
    </table>
  </div>
</div>
```

Header structure (CRITICAL: Must include z-10 and bg on both thead and th):
```tsx
<thead className="bg-gray-100 sticky top-0 z-10">
  <tr>
    <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">
      Header Text
    </th>
  </tr>
</thead>
```

Body structure:
```tsx
<tbody className="bg-white divide-y divide-gray-200">
  <tr className="hover:bg-gray-50 group relative">
    <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900">
      Cell Content
    </td>
  </tr>
</tbody>
```

Table alignment requirements:
- All tables in the same row MUST have consistent header heights
- Use `flex items-center justify-between mb-4 flex-shrink-0` for title rows
- Add spacer elements (e.g., `<div className="h-8"></div>`) to align headers when needed
- Tables without filters should match the height of tables with filters

## Container Background Patterns
- Standard containers: `bg-white/95 backdrop-blur-sm shadow-xl border border-white/20 rounded-lg p-6`
- Full-height containers: Add `h-full flex flex-col`
- Section headers: `px-6 py-4 border-b border-gray-200 flex-shrink-0`
- Card containers maintain consistent `p-6` padding

## Typography Scale
- Card titles: `text-lg font-normal text-gray-900`
- Card values: `text-3xl font-normal text-gray-900`
- Card subtitles: `text-sm font-normal text-gray-600`
- Table headers: `text-xs font-normal text-gray-500 uppercase tracking-wider`
- Table cells: `text-sm font-normal text-gray-900`
- Section headers: `text-lg font-normal text-gray-900`

## Spacing Standards
- Main containers: `p-6`
- Table headers/cells: `px-4 py-2`
- Section headers: `px-6 py-4`
- Filter buttons: `px-3 py-1`
- Chart margins: `mb-4` for titles, `flex-grow` for chart areas

## Interactive Elements
- Table hover: `hover:bg-gray-50` for rows
- Button hover: `hover:bg-white/20` for transparent buttons
- Active states: Use `chartColors.primary` for selected/active elements
- Tooltip styling: `bg-gray-900 text-white text-sm rounded-lg` with fade transitions

## Component Import Requirements
- ALWAYS import `chartColors` from `@/lib/chart-colors` when using colors
- Use TypeScript interfaces from `@/lib/types.ts` for data typing
- Import chart components from `@/components/charts/` directory
- Follow established component structure in `components/ui/` for reusable elements

## Implementation Checklist
Before completing any UI component:
1. ✓ Uses `font-normal` throughout (no other font weights)
2. ✓ Imports and uses `chartColors` instead of hardcoded colors
3. ✓ Follows established container background patterns
4. ✓ Uses correct spacing standards (`p-6`, `px-4 py-2`, etc.)
5. ✓ Implements proper table structure with sticky headers
6. ✓ Includes appropriate hover states and interactive styling
7. ✓ Charts use consistent title and container patterns