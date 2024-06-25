import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./AllReviewsCard.css"
import ReviewCard from "./ReviewCard";
import { getReactionsByReview } from "../../Services/reaction";
import ReviewSummaryCard from "./ReviewSummaryCard";

const AllReviewsCard = ({ reviews, setSummaryCardLoaded, toggleAddReviewCardVisibility }) => {
    const { auth } = useAuth();
    const [reactions, setReactions] = useState([]);

    useEffect(() => {
        const getReactions = async (review_id) => {
            try {
                const foundReactions = await getReactionsByReview(review_id);
                setReactions(foundReactions);
            } catch (error) {
                console.error(error);
            }
        }
        
        if (reviews.length > 0 && reactions.length === 0) reviews.map((review) => getReactions(review.id))
    }, [reviews]);

    return (
        <div className="all-reviews-card">
            <ReviewSummaryCard reviews={reviews} setSummaryCardLoaded={setSummaryCardLoaded} toggleAddReviewCardVisibility={toggleAddReviewCardVisibility} />
            {(reviews.length > 0)
                ? reviews.map((review) => {
                    // for the likes + dislikes
                    var likes, dislikes = [];
                    var liked, disliked = false;
                    if (reactions.length > 0) {
                        likes = reactions.filter(reaction => reaction.reaction === true);
                        dislikes = reactions.filter(reaction => reaction.reaction === false);

                        liked = likes.filter(reaction => reaction.user_id === review.user_id).length === 1;
                        disliked = dislikes.filter(reaction => reaction.user_id === review.user_id).length === 1
                    }

                    // for the timestamp
                    const dateLocal = new Date(review.created_at);
                    const options = {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true // This will format the time in 12-hour format (with AM/PM)
                    };
                    const formattedDate = dateLocal.toLocaleString('en-us', options);

                    return (
                        <ReviewCard
                            review_id={review.id}
                            ratingValue={review.overall_rating}
                            description={review.comment}
                            createdAt={formattedDate}
                            isOwner={review.user_id === auth?.user_info?.id}
                            likes={likes} // TODO: add a system to like and dislike
                            dislikes={dislikes}
                            userLiked={liked}
                            userDisliked={disliked}
                        />
                    )
                })
                : (null) // TODO: add a "be the first one to post" type of component here
            }
        </div>
    )
}

export default AllReviewsCard;