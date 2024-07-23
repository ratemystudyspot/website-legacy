// ------------------ REACTION'S SCHEMA ---------------------------------
export interface Reaction {
  id: number;
  review_id: number;
  user_id: number;
  reaction: boolean;
}