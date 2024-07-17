import { Rating } from '@mui/material';
import ratingClasses from '@mui/material';
import { styled } from '@mui/material/styles';

const predefinedSizes = {
    small: 20,
    medium: 25,
    large: 40,
};


const CustomRating = styled(Rating)(({ theme, size }) => {

    const baseFontSize = predefinedSizes[size] || predefinedSizes.medium;

    return {
        color: theme.palette.primary.main,  // Example: uses theme color
        '& .MuiRating-iconFilled': {
            color: '#FAAF00',               // Example: changes the color of filled stars
        },
        '& .MuiRating-iconHover': {
            color: '#FAAF00',               // Example: changes the color of stars on hover
        },
        fontSize: baseFontSize,
        [theme.breakpoints.up('px1200')]: {
            
        },
        [theme.breakpoints.down('px1200')]: {
            // fontSize: "20px"
        },
        [theme.breakpoints.down('px1024')]: {
            // height: 10,
            // borderRadius: 5,
            // minWidth: '80px',
        },
        [theme.breakpoints.down('px768')]: {
            fontSize: baseFontSize * 1.2
        }, [theme.breakpoints.down('px600')]: {
            fontSize: baseFontSize * 1.1
        }, [theme.breakpoints.down('px480')]: {
            fontSize: baseFontSize
        },
    }
});

export default CustomRating;