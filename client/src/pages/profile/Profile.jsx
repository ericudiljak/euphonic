import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; 
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {

  const [openUpdate, setOpenUpdate ] = useState(false)
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => makeRequest.get('/users/find/' + userId).then((res) => res.data),
  });

  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ['relationship'],
    queryFn: () => makeRequest.get('/relationships?followedUserId=' + userId).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) {
        return makeRequest.delete('/relationships?userId='+ userId);
      }
      return makeRequest.post('/relationships', { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries('relationship');
    },
    onError: (error) => {
      console.error('Error following:', error);
    },
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  if (!data) {
    return <div>No user data found</div>;
  }

  return (
    <div className="profile">
      { isLoading ? (
        "loading"
      ) : (
        <>
      <div className="images">
        <img
          src={"/upload/"+data.coverPic}
          alt="Cover"
          className="cover"
        />
        <img
          src={"/upload/" + data.profilePic}
          alt="Profile"
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href={data.facebook || "http://facebook.com"}>
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href={data.instagram || "http://instagram.com"}>
              <InstagramIcon fontSize="large" />
            </a>
            <a href={data.twitter || "http://twitter.com"}>
              <TwitterIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data.website}</span>
              </div>
            </div>
            {rIsLoading ? "Loading..." : userId === currentUser.id ? (
              <button onClick={()=>setOpenUpdate(true)}>Update</button>
            ) : (
              <button onClick={handleFollow}>
                {relationshipData.includes(currentUser.id) ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts userId={userId}/>
      </div>
      </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  );
};

export default Profile;
