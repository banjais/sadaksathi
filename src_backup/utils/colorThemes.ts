export type ColorTheme = {
  id: string;
  name: string;
  icon: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
};

export const colorThemes: ColorTheme[] = [
  {
    id: 'default',
    name: 'Default',
    icon: '🎨',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      gradient: 'from-blue-500 via-purple-500 to-pink-500'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    icon: '🌅',
    colors: {
      primary: '#f97316',
      secondary: '#ec4899',
      accent: '#fbbf24',
      gradient: 'from-orange-500 via-pink-500 to-yellow-500'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    icon: '🌊',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#3b82f6',
      gradient: 'from-sky-500 via-cyan-500 to-blue-500'
    }
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#84cc16',
      gradient: 'from-emerald-500 via-green-600 to-lime-500'
    }
  },
  {
    id: 'night',
    name: 'Night',
    icon: '🌙',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#a855f7',
      gradient: 'from-indigo-500 via-purple-500 to-purple-600'
    }
  },
  {
    id: 'rose',
    name: 'Rose',
    icon: '🌹',
    colors: {
      primary: '#f43f5e',
      secondary: '#ec4899',
      accent: '#fb7185',
      gradient: 'from-rose-500 via-pink-500 to-rose-400'
    }
  },
  {
    id: 'amber',
    name: 'Amber',
    icon: '🔥',
    colors: {
      primary: '#f59e0b',
      secondary: '#f97316',
      accent: '#fbbf24',
      gradient: 'from-amber-500 via-orange-500 to-yellow-500'
    }
  },
  {
    id: 'lavender',
    name: 'Lavender',
    icon: '💜',
    colors: {
      primary: '#a78bfa',
      secondary: '#c084fc',
      accent: '#e879f9',
      gradient: 'from-violet-400 via-purple-400 to-fuchsia-400'
    }
  }
];

export const getThemeById = (id: string): ColorTheme => {
  return colorThemes.find(theme => theme.id === id) || colorThemes[0];
};
