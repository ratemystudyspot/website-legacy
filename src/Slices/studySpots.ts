import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSpots, getSpotsByFeatures } from "../Services/studySpot";
import type { RootState } from '../store';

export interface StudySpot {
    id: number,
    name: string,
    description: string, // TODO: Delete column and interface
    location: string,
    features: string[],
    image_link: string,
    image_links: string[]
}

export interface StudySpotsState {
    value: Array<StudySpot>,
}

const initialState: StudySpotsState  = {
    value: [],
}

export const fetchStudySpots = createAsyncThunk<StudySpot[], void, { rejectValue: Error }> (
    'studyspot/fetchStudySpots',
    async (_, thunkAPI) => {
        try{
            const studySpots = await getSpots() //TODO: Replace here
            return studySpots;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }   
        
    } 
)

export const fetchSpotsByFeatures = createAsyncThunk<StudySpot[], string>(
    'studyspot/fetchSpotsByFeatures',
    async (features, thunkAPI) => {
      try {
        const studySpots = await getSpotsByFeatures(features);
        return studySpots; // Ensure the function returns the result
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const studySpotSlice = createSlice({
    name: 'studySpots',
    initialState,
    reducers: {
        searchStudySpot: (state, action: PayloadAction<{filterOptions: string[], searchTerm: string}>) => {

        }
        // add reducers maybe?
        
    },
    extraReducers: (builder) => {    
        builder.addCase(fetchStudySpots.fulfilled, (state, action) => {
            state.value = action.payload;
        })
    }
})

// export const {} = studySpotSlice.actions;

export default studySpotSlice.reducer;