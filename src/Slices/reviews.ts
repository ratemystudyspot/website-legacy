import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getReviewsByStudySpot, createReview, editReview } from "../Services/review";
import { Reaction } from "./reaction";

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
  reactions: Array<Reaction>;
}

// defining type for slice state
export interface ReviewsState {
  value: Array<Review>;
  status: 'idle' | 'loading' | 'fulfilled' | 'failed';
}

let initialState: ReviewsState = {
  value: [],
  status: 'idle',
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

export const saveReview = createAsyncThunk<Review, {user_id, study_spot_id, overall_rating, rating_body, comment, access_token}> (
  'review/saveReview',
  async ({user_id, study_spot_id, overall_rating, rating_body, comment, access_token}, thunkAPI) => {
    try {
      const savedReview = await createReview(user_id, study_spot_id, overall_rating, rating_body, comment, access_token);
      return savedReview;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateReview = createAsyncThunk<Review, {id, user_id, overall_rating, rating_body, comment, access_token}> (
  'review/updateReview',
  async ({id, user_id, overall_rating, rating_body, comment, access_token}, thunkAPI) => {
    try {
      const updatedReview = await editReview(id, user_id, overall_rating, rating_body, comment, access_token);
      return updatedReview;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
    changeReview: (state, action: PayloadAction<{updatedData: Review}>) => {
      const { updatedData } = action.payload
      const reviewIndex = state.value.findIndex((review) => review.id === updatedData.id);
      if (reviewIndex !== -1) {
        state.value[reviewIndex] = {...state.value[reviewIndex], ...updatedData};
      }
    },
    clearReviews: (state) => {
      state.value = []
    },
    addOneReaction: (state, action: PayloadAction<{reaction: Reaction}>) => {
      const { reaction } = action.payload;
      const reviewIndex = state.value.findIndex((review) => review.id === reaction?.review_id);
      if (reviewIndex !== -1) {
        state.value[reviewIndex] = {
          ...state.value[reviewIndex], 
          reactions: [reaction, ...state.value[reviewIndex].reactions]};
      }
    },
    addReactions: (state, action: PayloadAction<{reactions: Array<Reaction>}>) => {
      const { reactions } = action.payload;
      const reviewIndex = state.value.findIndex((review) => review.id === reactions[0]?.review_id);
      if (reviewIndex !== -1) {
        state.value[reviewIndex] = {...state.value[reviewIndex], reactions};
      }
    },
    removeReaction: (state, action: PayloadAction<{reaction: Partial<Reaction>}>) => {
      const { reaction } = action.payload;
      const reviewIndex = state.value.findIndex((review) => review.id === reaction?.review_id);
      if (reviewIndex !== -1) {
        const updatedReactions = state.value[reviewIndex].reactions.filter(item => item.id !== reaction.id)
        
        state.value[reviewIndex] = {
          ...state.value[reviewIndex], 
          reactions: updatedReactions
        };
      }
    },
    changeReaction: (state, action: PayloadAction<{reaction: Reaction}>) => {
      const { reaction } = action.payload;
      const reviewIndex = state.value.findIndex((review) => review.id === reaction?.review_id);
      if (reviewIndex !== -1) {
        const updatedReactions = state.value[reviewIndex].reactions.map(item => 
          item.id === reaction.id ? reaction : item
        )

        state.value[reviewIndex] = {
          ...state.value[reviewIndex], 
          reactions: updatedReactions
        };
      }
    },
  },
  extraReducers: (builder) => {              // FETCH REVIEWS               
    builder.addCase(fetchReviewsByStudySpot.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = 'fulfilled';
    });  // THREEE STATES: Fulfilled (async function returned), LOADING: async func is loading, ERROR: Returned error
    builder.addCase(saveReview.fulfilled, (state, action) => {
      state.value = [action.payload, ...state.value];
      state.status = 'fulfilled';
    }) 
    builder.addCase(updateReview.fulfilled, (state, action) => {
      state.value = state.value.filter(item => item.id !== action.payload.id); // gets rid of old review
      state.value = [action.payload, ...state.value]; // adds updated review
      state.status = 'fulfilled';
    })
  }

})

// export const { ... } = reviewsSlice.actions TEMPLATE, REPLACE WITH REDUCERS

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.reviews.values;


export const {
  addReview, 
  removeReview, 
  changeReview,
  clearReviews,
  addOneReaction,
  addReactions, 
  removeReaction,
  changeReaction,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;