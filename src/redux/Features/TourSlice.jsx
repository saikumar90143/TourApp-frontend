import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TourApi from "../Api/TourApi";

// create post
export const CreateTour = createAsyncThunk(
  "api/create",
  async (tourdata, thunkAPI) => {
    try {
      return TourApi.CreateTour(tourdata);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update tour

export const UpdateTour = createAsyncThunk(
  "api/update",
  async (updataData, thunkAPI) => {
    try {
      return TourApi.UpdateTour(updataData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete tour

export const DeleteTour = createAsyncThunk(
  "api/delete",
  async (id, thunkAPI) => {
    try {
      return TourApi.DeleteTour(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  get posts

export const GetTours = createAsyncThunk("api/getposts", async (page,thunkAPI) => {
  try {
    return TourApi.GetAllTours(page);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// get single tour

export const GetTour = createAsyncThunk("api/gettour", async (id, thunkAPI) => {
  try {
    return TourApi.SingleTour(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// liketour

export const LikePost=createAsyncThunk('api/like',
async(id,thunkAPI)=>{
  try {
     return TourApi.LikeTour(id)
  } catch (error) {
    const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message;
  return thunkAPI.rejectWithValue(message);
  }
}
)

// get tour by title

export const SearchTitle = createAsyncThunk(
  "api/search",
  async (search, thunkAPI) => {
    try {
      return TourApi.SearchByTitle(search);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get tour by tag

export const SearchTag=createAsyncThunk("api/searchtag",
async(tag,thunkAPI)=>{
  try {
    return TourApi.SearchBytag(tag)
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message;
  return thunkAPI.rejectWithValue(message);
  }
 
}
)

// user tour

export const GetToursByUser = createAsyncThunk(
  "api/usertours",
  async (id, thunkAPI) => {
    try {
      return TourApi.UserTour(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// releated tours

export const ReleatedTours=createAsyncThunk("api/releatedtour",
async(tags,thunkAPI)=>{
  try {
    return TourApi.ReleatedTour(tags)
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message;
  return thunkAPI.rejectWithValue(message);
  }
}
)

const initialState = {
  tours: [],
  tour: {},
  tags:[],
  Releatedtours:[],
  userTours: [],
  isLoading: false,
  isError: false,
  currentPage:1,
  numberofPages:null
};

const TourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setCurrentPage:(state,action)=>{
      state.currentPage=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // create tours
      .addCase(CreateTour.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(CreateTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tours = [...state.tours, action.payload];
      })
      .addCase(CreateTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // update tour
      .addCase(UpdateTour.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(UpdateTour.fulfilled, (state, action) => {
        const update = state.userTours.map((item) =>
          item._id === action.meta.arg ? action.payload : item
        );
        const newdata = state.tours.map((item) =>
          item._id === action.meta.arg ? action.payload : item
        );

        return {
          ...state,
          userTours: update,
          tours: [...state.tours, newdata],
          isLoading: false,
        };
      })
      .addCase(UpdateTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // like tour
      .addCase(LikePost.pending, (state, action) => {
     
      })

      .addCase(LikePost.fulfilled, (state, action) => {
        console.log('action: ', action);
       
        state.tours = state.tours.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );

      })
      .addCase(LikePost.rejected, (state, action) => {
        
        state.isError = action.payload;
      })

      // delete tour
      .addCase(DeleteTour.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(DeleteTour.fulfilled, (state, action) => {
        console.log("action: ", action);

        state.isLoading = false;
        state.userTours = state.userTours.filter(
          (item) => item._id !== action.meta.arg
        );
        state.tours = state.tours.filter(
          (item) => item._id !== action.meta.arg
        );
      })
      .addCase(DeleteTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // get all tours

      .addCase(GetTours.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(GetTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tours = action.payload.data
        state.numberofPages=action.payload.numberOfPages
        state.currentPage=action.payload.currentPage
      })
      .addCase(GetTours.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // get tour by title

      .addCase(SearchTitle.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(SearchTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tours = action.payload;
      })
      .addCase(SearchTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // get tour by tag

    .addCase(SearchTag.pending,(state,action)=>{
      state.isLoading=true
    })

    .addCase(SearchTag.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tags = action.payload;
    })

    .addCase(SearchTag.rejected, (state, action) => {
      state.isError = action.payload;
    })

    // releated tours

    .addCase(ReleatedTours.pending,(state,action)=>{
      state.isLoading=true
    })

    .addCase(ReleatedTours.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Releatedtours = action.payload;
    })

    .addCase(ReleatedTours.rejected, (state, action) => {
      state.isError = action.payload;
    })

      // get singletour
      .addCase(GetTour.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(GetTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tour = action.payload;
      })

      .addCase(GetTour.rejected, (state, action) => {
        state.isError = action.payload;
      })

      // get usertour
      .addCase(GetToursByUser.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(GetToursByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userTours = action.payload;
      })

      .addCase(GetToursByUser.rejected, (state, action) => {
        state.isError = action.payload;
      });
  },
});

export const {setCurrentPage} = TourSlice.actions;

export default TourSlice.reducer;
