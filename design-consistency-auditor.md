# Design Consistency Auditor Configuration

This document defines the comprehensive design consistency standards and audit criteria for the windsurf statistics web application built with Next.js 15, Recharts, and Tailwind CSS 4.

## Table Design Standards

### Sticky Header Requirements
**Critical Implementation Standards:**
- All scrollable tables MUST use `sticky top-0 z-10` on the `<thead>` element
- Both `<thead>` and individual `<th>` elements MUST have `bg-gray-100` for proper sticky functionality
- The `z-10` z-index is essential to ensure sticky headers appear above table content
- Background color on both levels prevents content bleeding through during scroll

**Correct Implementation:**
```tsx
<thead className="bg-gray-100 sticky top-0 z-10">
  <tr>
    <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">
      Column Header
    </th>
  </tr>
</thead>
```

**Common Violations to Flag:**
- Missing `z-10` on thead: `<thead className="bg-gray-100 sticky top-0">` (CRITICAL)
- Missing `bg-gray-100` on individual th elements (CRITICAL)
- Using `sticky top-0` without z-index (HIGH PRIORITY)
- Non-sticky headers in scrollable content containers (MEDIUM PRIORITY)

### Table Container Structure
**Standard Structure Requirements:**
- All tables should use consistent `p-6` wrapper containers
- Flex header structure for proper alignment and spacing
- Proper overflow handling with `overflow-auto` or `overflow-x-auto`

**Correct Container Pattern:**
```tsx
<div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 h-full flex flex-col">
  <div className="flex items-center justify-between mb-4 flex-shrink-0">
    <h3 className="text-lg font-normal text-gray-800">{title}</h3>
    <div className="h-8"></div> {/* Spacer for header alignment */}
  </div>
  <div className="overflow-auto flex-1 max-h-96">
    <table className="min-w-full">
      {/* Table content */}
    </table>
  </div>
</div>
```

**Violations to Flag:**
- Missing `p-6` padding on table containers (MEDIUM PRIORITY)
- Incorrect flex structure in headers (MEDIUM PRIORITY)
- Missing overflow handling on scrollable tables (HIGH PRIORITY)
- Inconsistent container styling patterns (LOW PRIORITY)

### Header Alignment Requirements
**Consistent Height Standards:**
- Tables in the same row/layout must have consistent header heights
- Use spacer elements (`<div className="h-8"></div>`) when needed for alignment
- Ensure flex-shrink-0 on header containers to prevent compression

**Correct Implementation for Adjacent Tables:**
```tsx
// Table with action buttons
<div className="flex items-center justify-between mb-4 flex-shrink-0">
  <h3 className="text-lg font-normal text-gray-800">{title}</h3>
  <div className="flex rounded-lg overflow-hidden border border-gray-200">
    {/* Action buttons */}
  </div>
</div>

// Table without action buttons - needs spacer
<div className="flex items-center justify-between mb-4 flex-shrink-0">
  <h3 className="text-lg font-normal text-gray-800">{title}</h3>
  <div className="h-8"></div> {/* Spacer to match button height */}
</div>
```

**Violations to Flag:**
- Missing spacer elements causing uneven header heights (HIGH PRIORITY)
- Inconsistent header structure between adjacent tables (MEDIUM PRIORITY)
- Missing `flex-shrink-0` on header containers (MEDIUM PRIORITY)

## Typography Consistency Standards

### Font Weight Hierarchy
- **Headers (h1, h2, h3)**: Use `font-normal` or `font-semibold` consistently
- **Table Headers**: Use `font-normal` with `text-xs uppercase tracking-wider`
- **Body Text**: Use `font-normal` as the default weight
- **Emphasis**: Use `font-semibold` sparingly for important data

**Violations to Flag:**
- Inconsistent font weights across similar components (MEDIUM PRIORITY)
- Overuse of bold/semibold weights (LOW PRIORITY)
- Missing text size consistency (MEDIUM PRIORITY)

### Color Palette Consistency
**Standard Color Usage:**
- **Primary Accent**: `#1abc9c` (teal) for active states, buttons, highlights
- **Gray Scale**: 
  - Text: `text-gray-900` (primary), `text-gray-600` (secondary), `text-gray-500` (tertiary)
  - Backgrounds: `bg-gray-100` (table headers), `bg-gray-50` (hover states)
  - Borders: `border-gray-200` (primary), `border-gray-100` (subtle)

**Violations to Flag:**
- Use of non-standard colors outside the defined palette (HIGH PRIORITY)
- Inconsistent gray shades for similar elements (MEDIUM PRIORITY)
- Missing hover states or incorrect hover colors (LOW PRIORITY)

## Chart and Data Visualization Standards

### Recharts Theming Consistency
**Color Scheme Requirements:**
- Use colors from `lib/chart-colors.ts` for all chart elements
- Ensure consistent color mapping across different chart types
- Maintain proper contrast ratios for accessibility

**Standard Chart Configuration:**
```tsx
// Import standardized colors
import { chartColors } from '../lib/chart-colors';

// Apply consistent theming
<RechartsComponent>
  <Bar dataKey="value" fill={chartColors.primary} />
  <Line stroke={chartColors.secondary} strokeWidth={2} />
</RechartsComponent>
```

**Violations to Flag:**
- Hardcoded colors instead of using chart-colors constants (HIGH PRIORITY)
- Inconsistent color usage across similar charts (MEDIUM PRIORITY)
- Missing accessibility considerations in color choices (HIGH PRIORITY)

### Data Formatting Consistency
**Number Formatting Standards:**
- Decimal precision: Use `.toFixed(2)` for scores and percentages
- Large numbers: Use appropriate thousand separators
- Null/undefined handling: Display 'N/A' or '0.00' consistently

**Violations to Flag:**
- Inconsistent decimal precision across similar data types (MEDIUM PRIORITY)
- Poor null/undefined data handling (HIGH PRIORITY)
- Missing or inconsistent number formatting (LOW PRIORITY)

## Responsive Design Standards

### Breakpoint Consistency
**Standard Breakpoints:**
- Mobile: `sm:` (640px+)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)
- Large Desktop: `xl:` (1280px+)

**Layout Standards:**
- Tables should be horizontally scrollable on mobile (`overflow-x-auto`)
- Charts should maintain aspect ratios across breakpoints
- Navigation should collapse appropriately on smaller screens

**Violations to Flag:**
- Non-responsive table implementations (HIGH PRIORITY)
- Inconsistent breakpoint usage (MEDIUM PRIORITY)
- Poor mobile experience in data-heavy components (HIGH PRIORITY)

## Accessibility Standards

### WCAG Compliance Requirements
**Color Contrast:**
- Text on backgrounds must meet WCAG AA standards (4.5:1 ratio minimum)
- Interactive elements must have sufficient contrast in all states

**Keyboard Navigation:**
- All interactive elements must be keyboard accessible
- Focus states must be clearly visible
- Logical tab order throughout the application

**Screen Reader Support:**
- Proper heading hierarchy (h1 → h2 → h3)
- Meaningful alt text for data visualizations
- ARIA labels for complex interactions

**Violations to Flag:**
- Insufficient color contrast ratios (CRITICAL)
- Missing focus states on interactive elements (HIGH PRIORITY)
- Poor heading hierarchy (MEDIUM PRIORITY)
- Missing ARIA labels on complex components (MEDIUM PRIORITY)

## Component-Specific Audit Criteria

### Table Components Checklist
**Critical Issues (Immediate Fix Required):**
- [ ] Missing `z-10` on sticky thead elements
- [ ] Missing `bg-gray-100` on both thead and th elements
- [ ] Non-sticky headers in scrollable containers
- [ ] Poor responsive behavior on mobile devices

**High Priority Issues:**
- [ ] Missing spacer elements causing header misalignment
- [ ] Inconsistent container structure (missing p-6, flex patterns)
- [ ] Color palette violations (non-standard colors)
- [ ] Accessibility violations (contrast, focus states)

**Medium Priority Issues:**
- [ ] Inconsistent typography (font weights, sizes)
- [ ] Missing hover states or interactions
- [ ] Inconsistent spacing and padding
- [ ] Sub-optimal data formatting

**Low Priority Issues:**
- [ ] Minor visual polish opportunities
- [ ] Code organization improvements
- [ ] Performance optimizations

### Chart Components Checklist
**Critical Issues:**
- [ ] Hardcoded colors instead of chart-colors constants
- [ ] Missing responsive behavior
- [ ] Accessibility violations in data presentation

**High Priority Issues:**
- [ ] Inconsistent theming across chart types
- [ ] Poor data formatting or null handling
- [ ] Missing interactive states (hover, selection)

**Medium Priority Issues:**
- [ ] Inconsistent axis labeling and formatting
- [ ] Sub-optimal chart type selection for data
- [ ] Missing or poor legend implementations

### Navigation and Layout Checklist
**Critical Issues:**
- [ ] Broken responsive behavior
- [ ] Inaccessible navigation patterns
- [ ] Inconsistent layout patterns

**High Priority Issues:**
- [ ] Missing or poor mobile navigation
- [ ] Inconsistent spacing in layout components
- [ ] Poor visual hierarchy

## Audit Process Guidelines

### Step 1: Systematic Component Review
1. **Inventory all table components** in the application
2. **Catalog all chart components** and their configurations
3. **Review navigation and layout components** for consistency
4. **Document current state** with screenshots and code references

### Step 2: Standards Compliance Check
1. **Test sticky header functionality** on all scrollable tables
2. **Verify color palette usage** against standard definitions
3. **Check responsive behavior** across all breakpoints
4. **Validate accessibility compliance** with automated and manual testing

### Step 3: Issue Prioritization
1. **Critical Issues**: Broken functionality, accessibility violations
2. **High Priority**: User experience impact, visual inconsistency
3. **Medium Priority**: Minor inconsistencies, optimization opportunities
4. **Low Priority**: Polish and enhancement suggestions

### Step 4: Implementation Planning
1. **Group related fixes** for efficient implementation
2. **Consider dependencies** between different components
3. **Plan testing strategy** for each fix category
4. **Estimate implementation effort** for each priority level

## Reporting Format

### Executive Summary Template
```markdown
## Design Consistency Audit Report - [Date]

### Overall Consistency Score: [X/10]
- Critical Issues: [Number] found
- High Priority Issues: [Number] found  
- Medium Priority Issues: [Number] found
- Low Priority Issues: [Number] found

### Top 3 Critical Issues:
1. [Issue description with component location]
2. [Issue description with component location]
3. [Issue description with component location]
```

### Detailed Findings Template
```markdown
### [Component Name] - [File Path]
**Issue**: [Clear description of the problem]
**Current State**: [What it looks like/behaves like now]
**Expected State**: [What it should look like/behave like]
**Priority**: [Critical/High/Medium/Low]
**Fix**: [Specific code changes needed]
**Impact**: [User experience or visual impact]
```

This configuration serves as the comprehensive standard for maintaining design consistency across the windsurf statistics application. All audits should reference these standards and provide specific, actionable feedback based on these criteria.