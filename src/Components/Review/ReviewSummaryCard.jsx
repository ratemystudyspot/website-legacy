import { useState, useEffect } from "react";
import "./ReviewSummaryCard.css";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Height } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import useAuth from "../../hooks/useAuth";
import { createReview } from "../../Services/review";
import AddReviewCard from "./AddReviewCard";

const defaultProgressBarValue = -1;

const initialProgressBarValues = {
    fiveStarProgressBarValue: defaultProgressBarValue,
    fourStarProgressBarValue: defaultProgressBarValue,
    threeStarProgressBarValue: defaultProgressBarValue,
    twoStarProgressBarValue: defaultProgressBarValue,
    oneStarProgressBarValue: defaultProgressBarValue,
};

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

const calculateAverage = (reviews) => {
    let averageRating = 0;
    const totalNumReviews = reviews.length;

    if (totalNumReviews == 0) {
        return "N/A";
    }

    reviews.forEach((review) => {
        averageRating = averageRating + review.rating;
    })
    averageRating = (Math.round((averageRating / totalNumReviews) * 10) / 10).toFixed(1); // round to the nearest tenth
    console.log(averageRating);
    console.log(totalNumReviews);
    return averageRating;
}

const calculateProgressBar = (reviews) => {
    let num5StarReviews = 0;
    let num4StarReviews = 0;
    let num3StarReviews = 0;
    let num2StarReviews = 0;
    let num1StarReviews = 0;
    const totalNumReviews = reviews.length;

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
        // console.log(review.rating)

    });

    if (totalNumReviews === 0) {
        return initialProgressBarValues;
    } else {
        const fiveStarProgressBarValue = (num5StarReviews / totalNumReviews) * 100;
        const fourStarProgressBarValue = (num4StarReviews / totalNumReviews) * 100;
        const threeStarProgressBarValue = (num3StarReviews / totalNumReviews) * 100;
        const twoStarProgressBarValue = (num2StarReviews / totalNumReviews) * 100;
        const oneStarProgressBarValue = (num1StarReviews / totalNumReviews) * 100;
        return {
            fiveStarProgressBarValue: (fiveStarProgressBarValue == 0 ? defaultProgressBarValue : fiveStarProgressBarValue),
            fourStarProgressBarValue: (fourStarProgressBarValue == 0 ? defaultProgressBarValue : fourStarProgressBarValue),
            threeStarProgressBarValue: (threeStarProgressBarValue == 0 ? defaultProgressBarValue : threeStarProgressBarValue),
            twoStarProgressBarValue: (twoStarProgressBarValue == 0 ? defaultProgressBarValue : twoStarProgressBarValue),
            oneStarProgressBarValue: (oneStarProgressBarValue == 0 ? defaultProgressBarValue : oneStarProgressBarValue),
        };
    }
};

const ReviewSummaryCard = ({ reviews, setSummaryCardLoaded }) => {
    const [progressBarsState, setProgressBarsState] = useState(initialProgressBarValues);
    const [averageRatingState, setAverageRatingState] = useState("N/A");
    const [totalNumReviewsState, setTotalNumReviewsState] = useState(reviews.length);

    const [showAddReviewCard, setShowAddReviewCard] = useState(false);

    const handleAddReview = () => { // TODO: make it a proper popup
        if (showAddReviewCard) return (<AddReviewCard />);
    }

    useEffect(() => {
        const progressBarValues = calculateProgressBar(reviews);
        const averageRating = calculateAverage(reviews);
        setTotalNumReviewsState(reviews.length); // TODO: include totalNumReviewsState into calculations!
        setAverageRatingState(averageRating);
        setProgressBarsState(progressBarValues);

        if ((reviews.length > 0 && averageRatingState !== "N/A") || (reviews.length === 0 && averageRatingState === "N/A")) {
            setSummaryCardLoaded(true); // tells the loaders in the parent page that everything's been loaded
        }        
    }, [reviews]);

    return (
        <div className="review-summary-card">
            <div className="bar-label-container">
                <div className="labels-container">
                    <div className="bar-labels"> 5 </div>
                    <div className="bar-labels"> 4 </div>
                    <div className="bar-labels" style={{marginTop:"17px"}}> 3 </div>
                    <div className="bar-labels" style={{marginTop:"17px"}}> 2 </div>
                    <div className="bar-labels"> 1 </div>
                </div>
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
        
            {/* TODO: use button component for add review */}
            <div className="review-summary-right-container">
                <div className="average-rating-text">
                    {averageRatingState}
                </div>
                <div className="num-reviews-text">
                    {totalNumReviewsState} Reviews
                </div>
                <div> 
                <button className="add-review-button" onClick={() => setShowAddReviewCard(true)}>Add Review</button> 
            </div>
            </div>
            
            {handleAddReview()} {/* TODO: change to do another method */}
        </div>
    );
};

export default ReviewSummaryCard;