import React, { useEffect } from "react";
import ProfileForm from "../../components/Client/Profile/ProfileForm";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { id } = useParams();
    const { isCorrect, user, useProfile, profile, useUpdateProfile, errorMSG } = useAuth(id);
    const navigate = useNavigate();

    useEffect(() => {
        useProfile(id);
        if (isCorrect) {
            navigate('/home');
        }
    }, [isCorrect, navigate]);

    return (
        <div className="profile_container">
            <div className="title">
                <h1>Profile</h1>
            </div>
            <ProfileForm user={user} profile={profile} sendData={(data) => useUpdateProfile(id, data)} errorMSG={errorMSG}/>
        </div>
    )
}

export default Profile;