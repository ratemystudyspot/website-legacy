import { useEffect, useState } from "react";
import "./AllReviewsCard.scss"
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { getReactionsByFilter } from "../../Services/reaction";
import ReviewSummaryCard from "./ReviewSummaryCard";

const AllReviewsCard = ({ reviews, setSummaryCardLoaded, toggleAddReviewCardVisibility }) => {
    const { auth } = useAuth();
    const { id } = useParams();
    const [reactions, setReactions] = useState([]);
    const [reactionsLoaded, setReactionsLoaded] = useState(false);
    const [reactionUpdate, setReactionUpdate] = useState(false);

    // load all reactions in this study spot
    useEffect(() => {
        const getReactions = async (review_id) => {
            try {
                return await getReactionsByFilter({ review_id });
            } catch (error) {
                console.error(error);
            }
        }

        const settingReactions = async () => {
            try {
                const foundReactions = await Promise.all(reviews.map((review) => getReactions(review.id)));
                setReactions(foundReactions);
                setReactionUpdate(false); // reset reaction update useState
            } catch (error) {
                console.error(error);
            }
        }
        
        if (reviews.length > 0 && reviews[0].study_spot_id === id && (reactions.length === 0 || reactionUpdate)) settingReactions(); // update reactions only at the very beginning OR when user likes/dislikes a review for optimization // TODO: can further optimize by only update the specific review's reactions
    }, [reactionUpdate]);

    useEffect(() => {
        setReactionsLoaded(true);
    }, [reviews, reactions])

    let key = 0; // added to get rid of unqiue key prop warning in the ReviewCard component for the map function
    return (
        <div className="all-reviews-card">
            <ReviewSummaryCard reviews={reviews} setSummaryCardLoaded={setSummaryCardLoaded} toggleAddReviewCardVisibility={toggleAddReviewCardVisibility} />
            {(reactionsLoaded && reviews.length > 0) // TODO: optimize this (if you uncomment th eocnsole log at line 69 you see how bad it is)
                ? reviews.map((review) => {
                    // for the likes + dislikes
                    var likes = [];
                    var dislikes = [];
                    var liked = false;
                    var disliked = false;
                    if (reactions.length > 0) {
                        likes = reactions[key].filter(reaction => reaction.reaction === true);
                        dislikes = reactions[key].filter(reaction => reaction.reaction === false);

                        liked = likes.filter(reaction => reaction.user_id === auth?.user_info?.id).length === 1;
                        disliked = dislikes.filter(reaction => reaction.user_id === auth?.user_info?.id).length === 1;
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
                            setReactionUpdate={setReactionUpdate}
                        />
                    )
                })
                : (null) // TODO: add a "be the first one to post" type of component here
            }
        </div>
    )
}

export default AllReviewsCard;