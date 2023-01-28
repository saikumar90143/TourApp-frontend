import axios from "axios";

// create post
export const CreateTour = async (TourData) => {
  const response = await axios.post("/api/posts/create", TourData);
  return response.data;
};

// update tour

export const UpdateTour=async(updateData)=>{
  const response=await axios.patch(`/api/posts/tour/${updateData._id}`,updateData)
  return response.data
}

// delete tour

export const DeleteTour=async(id)=>{
  const response=await axios.delete(`/api/posts/tour/${id}`)
  return response.data
}

// get all posts
export const GetAllTours = async (page) => {
  const response = await axios.get(`/api/posts/allposts?page=${page}`);
  return response.data;
};

// get single tour

export const SingleTour=async(id)=>{
  const response=await axios.get(`/api/posts/singletour/${id}`)
  return response.data
}

// user tours

export const UserTour=async(id)=>{
    const response=await axios.get(`/api/posts/usertours/${id}`)
    return response.data
}

// search by title

export const SearchByTitle=async(search)=>{
  const response=await axios.get(`/api/posts/search?searchQuery=${search}`)
  return response.data
}

// search by tag

export const SearchBytag=async(tag)=>{
  const response=await axios.get(`/api/posts/searchtag/${tag}`)
  return response.data
}

// releated tours

export const ReleatedTour=async(tags)=>{
  const response=await axios.post('/api/posts/releatedtour',tags)
  return response.data
}

// liket tour

export const LikeTour=async(id)=>{
  const response=await axios.patch(`/api/posts/tour/like/${id}`)
  return response.data
}

const TourApi = {
  CreateTour,
  GetAllTours,
  SingleTour,
  UserTour,
  UpdateTour,
  DeleteTour,
  SearchByTitle,
  SearchBytag,
  ReleatedTour,
  LikeTour
};

export default TourApi;
