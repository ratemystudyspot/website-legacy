import "./AllReviewsCard.css"
import ReviewCard from "./ReviewCard";

const AllReviewsCard = (reviews) => {
    
    return (
        <div className="all-reviews-card">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
        </div>
    )
}

export default AllReviewsCard;