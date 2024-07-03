import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';
import { getReviewsByStudySpot } from "../Services/review";

// ------------------ REVIEWS'S SCHEMA ---------------------------------
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

let initialState: ReviewsState = {
  value: [],
};

export const fetchReviewsByStudySpot = createAsyncThunk<Review[], number> (
  'review/fetchReviewsByStudySpot',
  async (study_spot_id, thunkAPI) => {
    try {
      const reviews = await getReviewsByStudySpot(study_spot_id);
      return reviews;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }

)

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<{review: Review}>) => {
      const { review } = action.payload;
      state.value = [review , ... state.value];
    },
    removeReview: (state, action: PayloadAction<{review_id: number}>) => {
      const { review_id } = action.payload;
      state.value = state.value.filter((review) => review.id !== review_id);
    },
    editReview: (state, action: PayloadAction<{updatedData: Review}>) => {
      const { updatedData } = action.payload
      const reviewIndex = state.value.findIndex((review) => review.id === updatedData.id);
      if (reviewIndex !== -1) {
        state.value[reviewIndex] = {...state.value[reviewIndex], ...updatedData};
      }
    }
  },
  extraReducers: (builder) => {              // FETCH REVIEWS               
    builder.addCase(fetchReviewsByStudySpot.fulfilled, (state, action) => {
      state.value = action.payload
    })  // THREEE STATES: Fulfilled (async function returned), LOADING: async func is loading, ERROR: Returned error
 
  }
})

// export const { ... } = reviewsSlice.actions TEMPLATE, REPLACE WITH REDUCERS

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.reviews.values;


export const {addReview, removeReview, editReview} = reviewsSlice.actions;

export default reviewsSlice.reducer;