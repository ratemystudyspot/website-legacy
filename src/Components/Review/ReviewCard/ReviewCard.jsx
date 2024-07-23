import { Rating } from "@mui/material";
import "./ReviewCard.scss";
import { IconButton, Button } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import { editReview } from "../../../Services/review";
import useAuth from "../../../hooks/useAuth";
import { createReaction, getReactionsByFilter, updateReaction, deleteReaction } from "../../../Services/reaction";
import CustomRating from "../CustomRating";

// TODO: optimiation - should probably only save to backend once user exits page (results in less calls to backend)
const handleReaction = async (user_liked, user_disliked, review_id, user_id, reaction, access_token) => { // reaction: true = like, false = dislike    
    try {
        if ((user_liked && !reaction) || (user_disliked && reaction)) { // two truth cases: user previously liked and wants to dislike OR user previously disliked and wants to like
            const foundReaction = (await getReactionsByFilter({ review_id, user_id }))[0]; // find the specific reaction's id to update (indexed at 0 since service function returns array)
            await updateReaction({ id: foundReaction.id, reaction }, access_token); // update that specific reaction to the opposite react
            // updated_reaction(true); // tell app to refresh reactions
            return;
        }

        if ((user_liked && reaction) || (user_disliked && !reaction)) { // undo the liking and disling of a post
            const foundReaction = (await getReactionsByFilter({ review_id, user_id }))[0]; // find the specific reaction's id to update (indexed at 0 since service function returns array)
            await deleteReaction(foundReaction.id, access_token); // delete that specific reaction
            // updated_reaction(true); // tell app to refresh reactions
            return;
        }

        await createReaction(review_id, user_id, reaction, access_token); // if user hasn't liked or dislike a given review, create a reaction
        // updated_reaction(true); // tell app to refresh reactions
    } catch (error) {
        console.error(error);
    }
}

const ReviewCard = ({ review_id = -1, ratingValue = 0, description, createdAt = 0, isOwner = false, likes, dislikes, userLiked = false, userDisliked = false, toggleEditReviewCardVisibility }) => {
    const { auth } = useAuth();
    const user_id = auth?.user_info?.id;
    const access_token = auth?.user_info?.id;

    return (
        <div className="review-box">
            <div className="review-box__header">
                <CustomRating
                    value={ratingValue}
                    precision={1}
                    size="small"
                    readOnly
                />
                <div className="review-box__date">
                    {createdAt}
                </div>
            </div>

            <div className="review-box__description">
                {description}
            </div>

            <div style={{ justifyContent: isOwner ? "space-between" : "flex-end" }} className="review-box__buttons">
                <Button
                    className="review-box__edit-button"
                    style={{ display: isOwner ? 'block' : 'none' }}
                    onClick={toggleEditReviewCardVisibility}
                >
                    <EditIcon style={{ marginRight: "5px", marginBottom: "3px", width: "20px" }} />
                    Edit
                </Button>
                <div className="review-box__thumbs-container">
                    <div
                        className="review-box__thumbs-up-container"
                        onClick={() => handleReaction(userLiked, userDisliked, review_id, user_id, true, access_token)}
                    >
                        <IconButton
                            sx={{ top: "7px" }}
                            className={userLiked ? "review-box__thumbs-button--liked" : "review-box__thumbs-button"}
                        >
                            <ThumbUpIcon />
                        </IconButton>
                        {likes}
                    </div>

                    <div
                        className="review-box__thumbs-down-container"
                        onClick={() => handleReaction(userLiked, userDisliked, review_id, user_id, false, access_token)}
                    >
                        <IconButton
                            sx={{ top: "7px" }}
                            className={userDisliked ? "review-box__thumbs-button--disliked" : "review-box__thumbs-button"}
                        >
                            <ThumbDownIcon />
                        </IconButton>
                        {dislikes}
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ReviewCard;