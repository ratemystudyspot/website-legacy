import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 10,
    width: "100%",
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#FAAF00' : '#308fe8',
    },
    [`@media (min-width: 1200px)`]: {
        height: 13,
    },
    [`@media (max-width: 1200px)`]: {
        height: 10,
        minWidth: '100px',
        maxWidth: '250px'
    },
    [`@media (max-width: 768px)`]: {
        height: 13,
        minWidth: '180px',
        width: '100%',
        maxWidth: '220px'
    }, [`@media (max-width: 600px)`]: {
        height: 12,
        minWidth: '140px',
    }, [`@media (max-width: 480px)`]: {
        height: 10,
        minWidth: '100px',
        maxWidth: '105px'
    },
}));

export default CustomLinearProgress;