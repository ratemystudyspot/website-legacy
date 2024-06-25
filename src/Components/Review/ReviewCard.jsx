import { Rating } from "@mui/material";
import { IconButton, Button } from '@mui/material';
import "./ReviewCard.css"
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import { Padding } from "maplibre-gl";
import { editReview } from "../../Services/review";
import useAuth from "../../hooks/useAuth";

// Add state management!!!
const handleEditReview = async (review_id, user_id, rating, comment, access_token) => {
    try {
        await editReview(review_id, user_id, rating, comment, access_token);
    } catch (error) {
        console.error(error);
    }
}

const ReviewCard = ({ review_id = -1, ratingValue = 0, description, createdAt = 0, isOwner = false, likes = 0, dislikes = 0, userLiked = false, userDisliked = false }) => {
    const { auth } = useAuth();
    const user_id = auth?.user_info?.id;
    const newRating = 4; // TODO: change this
    const newComment = "new comment" //TODO: change this
    const access_token = auth?.access_token;

    return (
        <div className="review-card">
            <div className="review-header">
                <Rating
                    value={ratingValue}
                    precision={1}
                    size="large"
                    readOnly
                />
                <div className="review-recency">
                    {createdAt}
                </div>
            </div>

            <div className="review-description">
                {description}
            </div>

            <div style={{justifyContent: isOwner ? "space-between" : "flex-end"}} className="review-buttons">
                <Button
                    className="edit-button"
                    style={{display: isOwner ? 'block' : 'none'}}
                    onClick={() => handleEditReview( // TODO: currently will edit the review as soon as you click button --> but idealy we should be editting in a popup
                        review_id,
                        user_id,
                        newRating,
                        newComment,
                        access_token)}
                >
                    <EditIcon style={{ marginRight: "5px", marginBottom: "3px", width: "20px" }} />
                    Edit
                </Button>
                <div className="thumbs-container">
                    <div className="thumbs-up-container">
                        <IconButton sx={{ top: "7px" }} className="thumb-button">
                            <ThumbUpIcon />
                        </IconButton>
                        {0}
                    </div>

                    <div className="thumbs-down-container">
                        <IconButton sx={{ top: "7px" }} className="thumb-button">
                            <ThumbDownIcon />
                        </IconButton>
                        {0}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReviewCard;