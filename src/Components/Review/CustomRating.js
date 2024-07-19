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
        [`@media (min-width: 1200px)`]: {
            fontSize: baseFontSize * 1.3
        },
        [`@media (max-width: 1200px)`]: {
            fontSize: baseFontSize * 1.2
        },
        [`@media (max-width: 768px)`]: {
            fontSize: baseFontSize * 1.2
        }, [`@media (max-width: 600px)`]: {
            fontSize: baseFontSize * 1.1
        }, [`@media (max-width: 480px)`]: {
            fontSize: baseFontSize
        },
    }
});

export default CustomRating;