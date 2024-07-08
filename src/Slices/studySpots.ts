import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSpots, getSpotsByFeatures, getSpotsByTime } from "../Services/studySpot";
import type { RootState } from '../store';
import { getCurrentDate } from "../Components/StudyCard/ListOfStudySpotCards";
import fetchAndStoreStudySpots from "../Data/StudySpotsData";
import StudySpotsData from "../Data/StudySpotsData";
// import StudySpots from "../SampleData/StudySpots";

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
        
        console.log("WORKING")
        try{
            const studySpots = await getSpots() //TODO: Replace here
            // const studySpots = await  fetchAndStoreStudySpots()
       
            return studySpots;
        } catch (error) {
            
            console.log("NOT WORKING?")
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

// TODO: make filter and search coexist!!!
export const filterSpots = createAsyncThunk<StudySpot[], string[]>(
    'studyspot/filterSpots',
    async (filterSelected, thunkAPI) => {
        try {
            const allSpots = StudySpotsData

            const featureCards =
              (filterSelected.length === 0 || (filterSelected.length === 1 && filterSelected.includes('open-now')))
                ? allSpots
                : await getSpotsByFeatures(filterSelected.filter(filter => filter !== 'open-now')); // get all spots with all selected filters (excluding open-now filter)
    
            if (filterSelected.includes('open-now')) { // if open-now selected, find opened spots PLUS with given filters 
              const { currentDayOfWeek, currentTime24h } = getCurrentDate();
              const openCards = await getSpotsByTime(currentDayOfWeek, currentTime24h);
    
              const featureCardsIDs = featureCards.map(featureCard => featureCard.id) // get ids of all spots from filters (excluding open-now filter)
              const filteredCards = openCards.filter(openCard => featureCardsIDs.includes(openCard.id)) // get all opened spots AND with given filters (excluding open-now filter)

              return filteredCards;

            } else { // if code reaches this line, means that all cards are shown (dangerous code here: query search overrides this setCards line -> check Banner.jsx's search functions)
              const allCards = featureCards;
              return allCards;
            }
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
) 

// try {
//     if (searchTerm.length === 0) {
//       await setFilterOptions([]);
//       await setCards(StudySpots);
//     }
//     if (searchTerm.length > 0) {
//       const queriedStudySpots = StudySpots.filter((studySpot) => {
//         return studySpot.name.toLowerCase().match(searchTerm);
//       })
//       await setFilterOptions([]);
//       await setCards(queriedStudySpots);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// searchStudySpot: (state, action: PayloadAction<{searchTerm: string, setFilterOptions: (param: string[]) => void}>) => {
export const studySpotSlice = createSlice({
    name: 'studySpots',
    initialState,
    reducers: {
        searchStudySpot: (state, action: PayloadAction<{searchTerm: string}>) => {
            const {searchTerm} = action.payload
            try {
                if (searchTerm.length === 0) {
                    // setFilterOptions([]);
                    // setCards(StudySpots);]
                    state.value = StudySpotsData;
                    return;
                }
                if (searchTerm.length > 0) {
                    const queriedStudySpots = StudySpotsData.filter((studySpot) => {
                        return studySpot.name.toLowerCase().match(searchTerm);
                    })
                    // setFilterOptions([]);
                    state.value = queriedStudySpots;
                }
            } catch (error) {
                console.error(error);
            }
        }
        // add reducers maybe?
        
    },
    extraReducers: (builder) => {    
        builder.addCase(fetchStudySpots.fulfilled, (state, action) => {
            state.value = action.payload;
        })
        builder.addCase(filterSpots.fulfilled, (state, action) => {
            state.value = action.payload;
        })
    }
})

export const {searchStudySpot} = studySpotSlice.actions;

export default studySpotSlice.reducer;