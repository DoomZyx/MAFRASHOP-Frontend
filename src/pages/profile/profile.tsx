import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./profile.scss";
import Nav from "../../components/nav/nav";
import HeroBg from "../../components/shop/herobg/heroBg";
import Loader from "../../components/loader/loader";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfilePersonalForm from "../../components/profile/ProfilePersonalForm";
import ProfileCompanyForm from "../../components/profile/ProfileCompanyForm";
import ProfileAccountInfo from "../../components/profile/ProfileAccountInfo";

function Profile() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="profile-loading">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <HeroBg />
      <Nav />
      <div className="profile-page">
        <div className="profile-container">
          <ProfileHeader />
          <ProfilePersonalForm />
          {user?.isPro && <ProfileCompanyForm />}
          <ProfileAccountInfo />
        </div>
      </div>
    </>
  );
}

export default Profile;
