import { useState, useEffect } from "react";
import "./ReviewSummaryCard.css";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Height } from "@mui/icons-material";
import { styled } from '@mui/material/styles';

const initialProgressBarValues = {
    fiveStarProgressBarValue: 0,
    fourStarProgressBarValue: 0,
    threeStarProgressBarValue: 0,
    twoStarProgressBarValue: 0,
    oneStarProgressBarValue: 0,
};

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

const ReviewSummaryCard = ({ reviews }) => {
    const [progressBarsState, setProgressBarsState] = useState(initialProgressBarValues);

    useEffect(() => {
        const progressBarValues = calculateProgressBar(reviews);
        setProgressBarsState(progressBarValues);
    }, [reviews]);

    const calculateProgressBar = (reviews) => {
        let num5StarReviews = 0;
        let num4StarReviews = 0;
        let num3StarReviews = 0;
        let num2StarReviews = 0;
        let num1StarReviews = 0;
        let totalNumReviews = 0;

        reviews.forEach((review) => {
        
            if (review.rating == 5) {
                num5StarReviews++;
            } else if (review.rating == 4) {
                num4StarReviews++;
            } else if (review.rating == 3) {
                num3StarReviews++;
            } else if (review.rating == 2) {
                num2StarReviews++;
            } else if (review.rating == 1) {
                num1StarReviews++;
            }
            totalNumReviews++;
            
            console.log(review.rating)

        });

        if (totalNumReviews === 0) {
            return initialProgressBarValues;
        } else {
            console.log(num5StarReviews);
            console.log(totalNumReviews);
            console.log( (num5StarReviews / totalNumReviews) * 100);
            return {
                fiveStarProgressBarValue: (num5StarReviews / totalNumReviews) * 100,
                fourStarProgressBarValue: (num4StarReviews / totalNumReviews) * 100,
                threeStarProgressBarValue: (num3StarReviews / totalNumReviews) * 100,
                twoStarProgressBarValue: (num2StarReviews / totalNumReviews) * 100,
                oneStarProgressBarValue: (num1StarReviews / totalNumReviews) * 100,
            };
        }
    };

    return (
        <div className="review-summary-card">
            <div className="progress-bar-container"> 
                <div className="progress-bar five-star-bar">
                    <CustomLinearProgress variant="determinate" value={progressBarsState.fiveStarProgressBarValue} />
                </div>
                <div className="progress-bar four-star-bar">
                    <CustomLinearProgress variant="determinate" value={progressBarsState.fourStarProgressBarValue} />
                </div>
                <div className="progress-bar three-star-bar">
                    <CustomLinearProgress variant="determinate" value={progressBarsState.threeStarProgressBarValue} />
                </div>
                <div className="progress-bar two-star-bar">
                    <CustomLinearProgress variant="determinate" value={progressBarsState.twoStarProgressBarValue} />
                </div>
                <div className="progress-bar one-star-bar">
                    <CustomLinearProgress variant="determinate" value={progressBarsState.oneStarProgressBarValue} />
                </div>
            </div>
        </div>
    );
};

export default ReviewSummaryCard;