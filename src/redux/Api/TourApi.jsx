import axios from "axios";
const API="http://tourapp-wv8m.onrender.com"
// create post
export const CreateTour = async (TourData) => {
  const response = await axios.post(`${API}/api/posts/create`, TourData);
  return response.data;
};

// update tour

export const UpdateTour=async(updateData)=>{
  const response=await axios.patch(`${API}/api/posts/tour/${updateData._id}`,updateData)
  return response.data
}

// delete tour

export const DeleteTour=async(id)=>{
  const response=await axios.delete(`${API}/api/posts/tour/${id}`)
  return response.data
}

// get all posts
export const GetAllTours = async (page) => {
  const response = await axios.get(`${API}/api/posts/allposts?page=${page}`);
  return response.data;
};

// get single tour

export const SingleTour=async(id)=>{
  const response=await axios.get(`${API}/api/posts/singletour/${id}`)
  return response.data
}

// user tours

export const UserTour=async(id)=>{
    const response=await axios.get(`${API}/api/posts/usertours/${id}`)
    return response.data
}

// search by title

export const SearchByTitle=async(search)=>{
  const response=await axios.get(`${API}/api/posts/search?searchQuery=${search}`)
  return response.data
}

// search by tag

export const SearchBytag=async(tag)=>{
  const response=await axios.get(`${API}/api/posts/searchtag/${tag}`)
  return response.data
}

// releated tours

export const ReleatedTour=async(tags)=>{
  const response=await axios.post(`${API}/api/posts/releatedtour`,tags)
  return response.data
}

// liket tour

export const LikeTour=async(id)=>{
  const response=await axios.patch(`${API}/api/posts/tour/like/${id}`)
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
