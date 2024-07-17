import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import theme from '../../../theme';

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 10,
    minWidth: '100px',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#FAAF00' : '#308fe8',
    },
     [theme.breakpoints.up('px1200')]: {
        // height: 10,
        // borderRadius: 5,
        // minWidth: '80px',
    },
    [theme.breakpoints.down('px1200')]: {
        // height: 10,
        // borderRadius: 5,
        // minWidth: '80px',
    },
    [theme.breakpoints.down('px1024')]: {
        // height: 10,
        // borderRadius: 5,
        // minWidth: '80px',
    },
    [theme.breakpoints.down('px768')]: {
        height: 13,
        minWidth: '180px',
    }, [theme.breakpoints.down('px600')]: {
        height: 12,
        minWidth: '140px',
    }, [theme.breakpoints.down('px480')]: {
        height: 10,
        minWidth: '100px',
    },
}));

export default CustomLinearProgress;