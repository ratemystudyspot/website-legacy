import { useState, useEffect } from "react";
import "./ReviewSummaryCard.scss";
import { Rating } from "@mui/material";
import CustomLinearProgress from "./CustomLinearProgress";
import CustomRating from "../CustomRating";

const defaultProgressBarValue = -1;

const initialProgressBarValues = {
    fiveStarProgressBarValue: defaultProgressBarValue,
    fourStarProgressBarValue: defaultProgressBarValue,
    threeStarProgressBarValue: defaultProgressBarValue,
    twoStarProgressBarValue: defaultProgressBarValue,
    oneStarProgressBarValue: defaultProgressBarValue,
};

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

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const progressBarValues = calculateProgressBar(reviews);
        const averageRating = calculateAverage(reviews);
        setTotalNumReviewsState(reviews.length); // TODO: include totalNumReviewsState into calculations!
        setAverageRating(averageRating);
        setProgressBarsState(progressBarValues);
        setSummaryCardLoaded(true);
    }, [reviews]);

    return (
        <div className="review-summary-box">
            <div className="review-summary-box__left-container">
                <div className="review-summary-box__labels-container">
                    <div className="review-summary-box__bar-labels"> 5 </div>
                    <div className="review-summary-box__bar-labels"> 4 </div>
                    <div className="review-summary-box__bar-labels"> 3 </div>
                    <div className="review-summary-box__bar-labels"> 2 </div>
                    <div className="review-summary-box__bar-labels"> 1 </div>
                </div>
                <div className="review-summary-box__progress-bar-container">
                    <div className="review-summary-box__progress-bar--five-star-bar">
                        <CustomLinearProgress variant="determinate" value={progressBarsState.fiveStarProgressBarValue} />
                    </div>
                    <div className="review-summary-box__progress-bar--four-star-bar">
                        <CustomLinearProgress variant="determinate" value={progressBarsState.fourStarProgressBarValue} />
                    </div>
                    <div className="review-summary-box__progress-bar--three-star-bar">
                        <CustomLinearProgress variant="determinate" value={progressBarsState.threeStarProgressBarValue} />
                    </div>
                    <div className="review-summary-box__progress-bar--two-star-bar">
                        <CustomLinearProgress variant="determinate" value={progressBarsState.twoStarProgressBarValue} />
                    </div>
                    <div className="review-summary-box__progress-bar--one-star-bar">
                        <CustomLinearProgress variant="determinate" value={progressBarsState.oneStarProgressBarValue} />
                    </div>
                </div>
            </div>

            {/* TODO: use button component for add review */}
            <div className="review-summary-box__right-container">
                <div className="review-summary-box__average-rating-text">
                    {averageRating}
                </div>
                <CustomRating
                    value={(averageRating === "N/A") ? null : averageRating}
                    precision={0.1}
                    size="small"
                    readOnly
                />
                <div className="review-summary-box__num-reviews-text">
                    {totalNumReviewsState} Reviews
                </div>
                <div>
                    <button className="review-summary-box__add-review-button" onClick={toggleAddReviewCardVisibility}>Add Review</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewSummaryCard;