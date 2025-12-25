export const siteConfig = {
  siteName: 'Pokemon Draft League!',
  
  navigation: {
    main: [
      { name: 'Home!', path: '/', color: 'primary' },
      { name: 'Learn!', path: '/learn', color: 'primary' },
      { name: 'Search!', path: '/search', color: 'primary' },
      { name: 'Compare!', path: '/compare', color: 'primary' },
    ],
    secondary: [
      { name: 'Learn!', path: '/learn', color: 'primary' },
      { name: 'Submit a Battle!', path: '/submit-battle', color: 'primary' },
    ],
    dropdown: {
      label: 'Other Tools',
      color: 'secondary',
      items: [
        { name: 'Search!', path: '/search' },
        { name: 'Compare!', path: '/compare' },
      ],
    },
  },
  
  homeContent: {
    welcome: 'Welcome to the website. Hope you enjoy your stay.',
    dataSheetLabel: 'Link to our data sheet(Roster, schedules, etc.)',
    dataSheetUrl: '#',
    battleSubmitLabel: 'Finished a battle? Submit the battle here!',
    battleSubmitUrl: 'https://forms.gle/uNhY2DL4rrfnB8pY7',
    learnLabel: 'Want to learn about Pokemon, teambuilding, and more? Watch a video here!',
    learnVideoUrl: '#',
  },
}

export type SiteConfig = typeof siteConfig  