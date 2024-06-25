import { useState, useEffect } from "react";
import "./ReviewSummaryCard.css";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Height } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { Rating } from "@mui/material";
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
    minWidth: '100px',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#FAAF00' : '#308fe8',
    },
}));

const calculateAverage = (reviews) => {
    let averageRating = 0;
    const totalNumReviews = reviews.length;

    if (totalNumReviews == 0) {
        return "N/A";
    }

    reviews.forEach((review) => {
        averageRating = averageRating + review.overall_rating;
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
        const overall_rating = review.overall_rating;
        switch (overall_rating) {
            case 5:
                num5StarReviews++;
                break;
            case 4:
                num4StarReviews++;
                break;
            case 3:
                num3StarReviews++;
                break;
            case 2:
                num2StarReviews++;
                break;
            case 1:
                num1StarReviews++;
                break;
            default:
                console.warn(`Unexpected rating value: ${overall_rating}`);
                break;
        }
        // console.log(overall_rating)

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

const ReviewSummaryCard = ({ reviews, setSummaryCardLoaded, toggleAddReviewCardVisibility}) => {
    const [progressBarsState, setProgressBarsState] = useState(initialProgressBarValues);
    const [averageRating, setAverageRating] = useState("N/A");
    const [totalNumReviewsState, setTotalNumReviewsState] = useState(reviews.length);

    const [showAddReviewCard, setShowAddReviewCard] = useState(false);

    const [counter, setCounter] = useState(0);

    const handleAddReview = () => { // TODO: make it a proper popup
        if (showAddReviewCard) return (<AddReviewCard />);
    }

    useEffect(() => {
        const progressBarValues = calculateProgressBar(reviews);
        const averageRating = calculateAverage(reviews);
        setTotalNumReviewsState(reviews.length); // TODO: include totalNumReviewsState into calculations!
        setAverageRating(averageRating);
        setProgressBarsState(progressBarValues);
    }, [reviews]);

    // useEffect for counter to give ample to for components to load up
    useEffect(() => {
        if (counter >= 2) return;

        const intervalId = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
        }, 1000);

        console.log(counter)

        if ((counter === 1) && ((reviews.length > 0 && averageRating !== "N/A") || (reviews.length === 0 && averageRating === "N/A"))) {
            console.log("here,", counter===2)
            setSummaryCardLoaded(true); // tells the loaders in the parent page that everything's been loaded
        }

        return () => clearInterval(intervalId);
    }, [counter])

    return (
        <div className="review-summary-card">
            <div className="review-summary-left-container">
                <div className="labels-container">
                    <div className="bar-labels"> 5 </div>
                    <div className="bar-labels"> 4 </div>
                    <div className="bar-labels" style={{ marginTop: "17px" }}> 3 </div>
                    <div className="bar-labels" style={{ marginTop: "17px" }}> 2 </div>
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
                    {averageRating}
                </div>
                <Rating
                    value={averageRating}
                    precision={0.1}
                    size="small"
                    readOnly
                />
                <div className="num-reviews-text">
                    {totalNumReviewsState} Reviews
                </div>
                <div>
                    <button className="add-review-button" onClick={toggleAddReviewCardVisibility}>Add Review</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewSummaryCard;