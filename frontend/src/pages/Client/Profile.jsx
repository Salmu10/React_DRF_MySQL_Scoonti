import React, { useEffect } from "react";
import ProfileForm from "../../components/Client/Profile/ProfileForm";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { id } = useParams();
    const { user, useProfile, profile, useUpdateProfile } = useAuth(id);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(user);
        useProfile(id);
    }, []);

    return (
        <div className="profile_container">
            <div className="title">
                <h2>Profile</h2>
            </div>
            <ProfileForm user={user} profile={profile} sendData={(data) => useUpdateProfile(id, data)}/>
                {/* sendData={(data) => useUpdateProfile(id, data)} */}
        </div>
    )
}

export default Profile;