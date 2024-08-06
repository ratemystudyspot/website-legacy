// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { createReaction, updateReaction } from "../Services/reaction";

// ------------------ REACTION'S SCHEMA ---------------------------------
export interface Reaction {
  id: number;
  review_id: number;
  user_id: number;
  reaction: boolean;
}
// I think Ray commented this out? Keep for now just in case


// defining type for slice state
// export interface ReactionsState {
//   value: Array<Reaction>;
//   status: 'idle' | 'loading' | 'fulfilled' | 'failed';
// }

// let initialState: ReactionsState = {
//   value: [],
//   status: 'idle',
// };

// export const saveReaction = createAsyncThunk<Reaction, { id: number, user_id: number, reaction: boolean, access_token: string }>(
//   'reaction/saveReaction',
//   async ({ id, user_id, reaction, access_token }, thunkAPI) => {
//     try {
//       const savedReaction = await createReaction(id, user_id, reaction, access_token);
//       return savedReaction;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const editReaction = createAsyncThunk<Reaction, { body: Partial<Reaction>, access_token: string }>(
//   'reaction/editReaction',
//   async ({ body, access_token }, thunkAPI) => {
//     try {
//       const updatedReaction = await updateReaction(body, access_token);
//       return updatedReaction;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const reviewsSlice = createSlice({
//   name: 'reviews',
//   initialState,
//   reducers: {
//     // TODO: add reducers
//   },
//   extraReducers: (builder) => {                             
//     builder.addCase(saveReaction.fulfilled, (state, action) => { // save reaction
//       state.value = action.payload;
//       state.status = 'fulfilled';
//     });  // THREEE STATES: Fulfilled (async function returned), LOADING: async func is loading, ERROR: Returned error
//     builder.addCase(editReaction.fulfilled, (state, action) => {
//       state.value = state.value.filter(item => item.id !== action.payload.id); // gets rid of old review
//       state.value = [action.payload, ...state.value]; // adds updated review
//       state.status = 'fulfilled';
//     })
//   }
// })

// export const { ... } = reviewsSlice.actions TEMPLATE, REPLACE WITH REDUCERS

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.reviews.values;


// export const {
// } = reviewsSlice.actions;

// export default reviewsSlice.reducer;