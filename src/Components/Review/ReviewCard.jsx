import { Rating } from "@mui/material";
import { IconButton, Button } from '@mui/material';
import "./ReviewCard.css"
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import { Padding } from "maplibre-gl";

// Add state management!!!

const ReviewCard = (ratingValue, description, isOwner=false, likes=0, dislikes=0, userLiked=false, userDisliked=false) => {
    
    return (
        <div className="review-card">
            <div className="review-header">
                <Rating
                    name="read-only"
                    value={4.5}  // change rating here!!!
                    precision={0.1}
                    size="large"
                    readOnly
                />
                <div className="review-recency">
                    2 months ago
                </div>
            </div>
            
            <div className="review-description">
                YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP 
                YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP 
                YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP YAP 
            </div>
            
            <div className="review-buttons">
                <Button className="edit-button">
                    <EditIcon style={{marginRight:"5px", marginBottom:"3px", width:"20px"}} />
                    Edit
                </Button>
                <div className="thumbs-container">
                    <div className="thumbs-up-container">
                        <IconButton sx={{top:"7px"}} className="thumb-button">
                            <ThumbUpIcon />
                        </IconButton>
                        {0}
                    </div>
                  
                    <div className="thumbs-down-container">
                        <IconButton sx={{top:"7px"}} className="thumb-button">
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