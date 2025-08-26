// Chart color palette for the windsurf stats application
export const chartColors = {
  // Primary colors used throughout the project
  primary: '#1abc9c',    // Teal - used for best scores/primary data
  secondary: '#477fae',  // Blue - used for average scores/secondary data
  
  // Additional colors for extended datasets
  tertiary: '#e74c3c',   // Red
  quaternary: '#f39c12', // Orange
  quinary: '#9b59b6',    // Purple
  
  // Gradient colors
  gradients: {
    primaryToSecondary: 'linear-gradient(to right, #1abc9c 50%, #477fae)',
    // Add more gradients as needed
  },
  
  // Semantic colors
  success: '#1abc9c',
  info: '#477fae',
  warning: '#f39c12',
  danger: '#e74c3c',
  
  // Chart-specific color arrays for multi-series data
  barChartColors: ['#1abc9c', '#477fae', '#e74c3c', '#f39c12', '#9b59b6'],
  lineChartColors: ['#1abc9c', '#477fae', '#e74c3c', '#f39c12', '#9b59b6'],
  
  // Color utilities
  getColorByIndex: (index: number) => {
    const colors = ['#1abc9c', '#477fae', '#e74c3c', '#f39c12', '#9b59b6'];
    return colors[index % colors.length];
  },
  
  // Opacity variants
  withOpacity: (color: string, opacity: number) => {
    // Convert hex to rgba
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
};

// Export individual colors for convenience
export const {
  primary,
  secondary,
  tertiary,
  quaternary,
  quinary
} = chartColors;