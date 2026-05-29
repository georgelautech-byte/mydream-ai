export interface ITheme {
  themeName: string;
  divider: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    white: string;
  };
  background: {
    primary: string;
    secondary: string;
    neutral: string;
    success: string;
    alert: string;
    negative: string;
    disabled: string;
    active: string;
  };
  accent: {
    primary: string;
    primary_dark: string;
    primary_pale_transparent: string;
    primary_pale: string;
    negative: string;
    disabled: string;
    alert: string;
    red: string;
  };
  styles: {
    borderRadius: number;
    borderRadiusSmall?: number;
    borderRadiusLarge?: number;
  };
}

export const themes: ITheme[] = [
  {
    themeName: 'dreamy-light',
    divider: '#DDE2E8',
    text: {
      primary: '#2C2E43',
      secondary: '#7A869A',
      disabled: '#A5AAB3',
      white: '#FFFFFF',
    },
    background: {
      primary: '#F8FAFC',
      secondary: '#E3E8F0',
      neutral: '#CBD5E133',
      success: '#4CAF5020',
      alert: '#ffc107',
      negative: '#FF3D5733',
      disabled: '#D1D5DB33',
      active: '#EEF2FF',
    },
    accent: {
      primary: '#6772E5',
      primary_dark: '#4953B8',
      primary_pale_transparent: '#6772E51A',
      primary_pale: '#E0E7FF',
      disabled: '#A5AAB3',
      alert: '#FFA726',
      negative: '#E57373',
      red: '#FF1744',
    },
    styles: {
      borderRadius: 15,
      borderRadiusSmall: 12,
      borderRadiusLarge: 36,
    },
  },
  {
    themeName: 'dreamy-dark',
    divider: '#3B4252',
    text: {
      primary: '#e1e5f0',
      secondary: '#b1bddb',
      disabled: '#78879B',
      white: '#171E30',
    },
    background: {
      primary: '#0C111C',
      secondary: '#252f44',
      neutral: '#404f70',
      success: '#4CAF5033',
      alert: '#ffbf00',
      negative: '#FF3D5733',
      disabled: '#33394633',
      active: '#ababab',
    },
    accent: {
      primary: '#5A67C6',
      primary_dark: '#5A67C6',
      primary_pale_transparent: '#8892E61A',
      primary_pale: '#4C566A',
      disabled: '#3f4751',
      alert: '#FFA726',
      negative: '#E57373',
      red: '#FF1744',
    },
    styles: {
      borderRadius: 17,
      borderRadiusSmall: 12,
      borderRadiusLarge: 36,
    },
  },
];
