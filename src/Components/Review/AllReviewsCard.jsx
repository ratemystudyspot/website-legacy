import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import "./AllReviewsCard.css"
import ReviewCard from "./ReviewCard";
import { getReactionsByReview } from "../../Services/reaction";

const AllReviewsCard = ({ reviews }) => {
    const { auth } = useAuth();

    const getReactions = async (review_id) => {
        try {
            return await getReactionsByReview(review_id);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="all-reviews-card">
            {(reviews.length > 0)
                ? reviews.map((review) => {
                    // for the likes + dislikes
                    const reactions = getReactions(review.id);
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
                            ratingValue={review.rating}
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
            {/* <ReviewCard /> */}
        </div>
    )
}

export default AllReviewsCard;