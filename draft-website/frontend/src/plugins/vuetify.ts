import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const pokemonDraftTheme = {
  dark: false,
  colors: {
    // Main brand from Figma
    background: '#FFDEDE',
    surface: '#E9ADAD', 
    primary: '#E9ADAD',
    secondary: '#FF8181',
    accent: '#1C1C1C', 
    
    // Search page colors
    simpleSearchBox: '#FFFCAD',   // Yellow box 
    searchButton: '#CCF1FF',      // Light blue 
    advancedButton: '#ADB0FF',    // Purple 
    advancedBox: '#ADB0FF',       // Purple box 
    typeGreen: '#AFFFA5',         // Green for type boxes
    typePink: '#FFBFBF',          // Pink for type boxes
    gigaAdvanced: '#909000',      // Olive/yellow-green for GIGA ADVANCED
    gigaBox: '#D9D9D9',           // Gray box for GIGA ADVANCED page
    searchResults: '#90EE90',     // Light green for search results 

    // Text colors
    'on-background': '#000000',
    'on-surface': '#000000',
    'on-primary': '#000000',
    'on-secondary': '#000000',
    'on-accent': '#FFFFFF',
    
    // Additional UI colors (can customize later)
    error: '#D32F2F',
    warning: '#F57C00',
    info: '#1976D2',
    success: '#388E3C',
    white: '#FFFFFF',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'pokemonDraftTheme',
    themes: {
      pokemonDraftTheme,
    },
  },
})