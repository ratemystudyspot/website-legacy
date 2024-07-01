import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../store';

export interface Review {
  id: number;
  user_id: number;
  study_spot_id: number;
  overall_rating: number;
  comment: string;
  created_at: string;
  quietness_rating: number;
  comfort_rating: number;
  space_rating: number;
}

// defining type for slice state
export interface ReviewsState {
  value: Array<Review>;
}

const initialState = {
  values: []
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    // TODO: add reviews reducers
  }
})

// export const { ... } = reviewsSlice.actions TEMPLATE, REPLACE WITH REDUCERS

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.reviews.values;

export default reviewsSlice.reducer;