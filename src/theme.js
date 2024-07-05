import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    blue: {
      main: '#ADD8E6',
      dark: '#64ADC6',
      contrastText: '#272A30',
    },
    black: {
      main: "#525252",
      dark: "#000",
      contrastText: '#fff',
    }
  },
});

export default theme;

// const theme = {
// 	colors: {
// 		primaryLight: "#90C2E7",
// 		primaryDark: "#246DA4",
//         secondaryLight: "#4E8098",
//         secondaryDark: "#294450",
//         tertiaryLight: "#A31621",
//         tertiaryDark: "#560C12",
// 		primaryLightBackground: "#FCF7F8",
// 		primaryDarkBackground: "#2A313C",
// 		secondaryLightBackground: "#CED3DC",
// 		secondaryDarkBackground: "#8A8A8A",
// 		textDarkOne: "#272A30",
// 		textDarkTwo: "#989898",
// 		textLight: "#FFFFFF",
// 	},

// 	fonts: {
// 		headerOne: "Montserrat",
// 		headerTwo: "Work Sans",
// 		headerThreeSemi: "Inter",
// 		headerThreeMedium: "Inter",
// 		headerFour: "Inter",
// 		headerFourMedium: "Inter",
// 		buttons: "Inter",
// 	},

// 	fontWeights: {
// 		headerOne: 500,
// 		headerTwo: 400,
// 		headerThreeSemi: 600,
// 		headerThreeMedium: 500,
// 		headerFour: 400,
// 		headerFourMedium: 600,
// 		buttons: 500,
// 	},
// };