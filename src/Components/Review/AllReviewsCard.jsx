import React from "react";
import "./AllReviewsCard.scss"
import useAuth from "../../hooks/useAuth";
import ReviewCard from "./ReviewCard/ReviewCard";
import ReviewSummaryCard from "./ReviewSummaryCard/ReviewSummaryCard";

const AllReviewsCard = ({ reviews, setSummaryCardLoaded, toggleAddReviewCardVisibility, toggleEditReviewCardVisibility }) => {
    const { auth } = useAuth();
    
    let key = 0; // added to get rid of unqiue key prop warning in the ReviewCard component for the map function
    return (
        <div className="all-reviews-card">
            <ReviewSummaryCard reviews={reviews} setSummaryCardLoaded={setSummaryCardLoaded} toggleAddReviewCardVisibility={toggleAddReviewCardVisibility} />
            {(reviews.length > 0) // TODO: optimize this (if you uncomment th eocnsole log at line 69 you see how bad it is)
                ? reviews.map((review) => {
                    // for the likes + dislikes
                    var likes = [];
                    var dislikes = [];
                    var liked = false;
                    var disliked = false;
                    if (review.reactions?.length > 0) {
                        likes = review.reactions.filter(reaction => reaction.reaction === true);
                        dislikes = review.reactions.filter(reaction => reaction.reaction === false);

                        liked = likes.filter(reaction => reaction.user_id === auth?.user_info?.id).length === 1;
                        disliked = dislikes.filter(reaction => reaction.user_id === auth?.user_info?.id).length === 1;
                    }

                    // for the timestamp
                    const dateLocal = new Date(review.created_at);
                    const options = {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        // hour: 'numeric',
                        // minute: 'numeric',
                        // hour12: true 
                    };
                    const formattedDate = dateLocal.toLocaleString('en-us', options);

                    return (
                        <ReviewCard
                            key={key++}
                            review_id={review.id}
                            ratingValue={review.overall_rating}
                            description={review.comment}
                            createdAt={formattedDate}
                            isOwner={review.user_id === auth?.user_info?.id}
                            likes={likes?.length}
                            dislikes={dislikes?.length}
                            userLiked={liked}
                            userDisliked={disliked}
                            toggleEditReviewCardVisibility={toggleEditReviewCardVisibility}
                        />
                    )
                })
                : (null) // TODO: add a "be the first one to post" type of component here
            }
        </div>
    )
}

export default React.memo(AllReviewsCard);