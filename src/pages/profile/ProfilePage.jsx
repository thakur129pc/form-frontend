import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../../redux/apis/userApi";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../../components/Loader";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    Cookies.remove("accessToken");
    navigate("/login");
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchUserDetails()).then((res) => {
      setIsLoading(false);
      if (!res.success) {
        if (res?.message) {
          alert(res.message);
        } else {
          alert("Internal server error.");
        }
      }
    });
  }, [dispatch]);

  return (
    <div className="p-10">
      <div>
        <h2 className="py-2 text-2xl font-medium">Personal Information</h2>
        <div className="relative">
          <hr className="w-2/3 border-t-2 border-gray-700" />
          <div className="max-w-[225px] max-h-[225px] overflow-clip pt-3 sm:absolute sm:pt-0 right-[10%]">
            <img
              src={user?.photo || "./img.png"}
              className={user?.photo ? "object-contain" : "h-48 w-48"}
            ></img>
          </div>
        </div>
        <div className="flex pt-3">
          <h2 className="w-[180px] font-medium t ">Full Name :</h2>
          <p>{user?.fullName}</p>
        </div>
        <div className="flex pt-3">
          <h2 className="w-[180px] font-medium t ">Date of Birth :</h2>
          <p>{user?.dateOfBirth?.split("T")[0]}</p>
        </div>
        <div className="flex pt-3">
          <h2 className="w-[180px] font-medium t ">Father&apos;s Name :</h2>
          <p>{user?.fatherName}</p>
        </div>
        <div className="flex pt-3">
          <h2 className="w-[180px] font-medium t ">Marital Status :</h2>
          <p>{user?.maritalStatus ? "Married" : "Unmarried"}</p>
        </div>
        <div className="flex pt-3">
          <h2 className="w-[180px] font-medium t ">Phone Number :</h2>
          <p>{user?.phoneNumber}</p>
        </div>
        <div className="flex pt-3">
          <h2 className="w-[180px] font-medium t ">Gender :</h2>
          <p>{user?.gender}</p>
        </div>
        <div className="flex pt-3">
          <h2 className="w-[180px] font-medium t ">Mother&apos;s Name :</h2>
          <p>{user?.motherName}</p>
        </div>
        {user?.maritalStatus && (
          <div className="flex pt-3">
            <h2 className="w-[180px] font-medium t ">Spouse Name :</h2>
            <p>{user?.spouseName}</p>
          </div>
        )}
        <div className="flex pt-3">
          <h2 className="w-[180px] font-medium t ">Email :</h2>
          <p>{user?.email}</p>
        </div>
        <div className="flex pt-3">
          <h2 className="w-[180px] font-medium t ">Current Address :</h2>
          <p>
            {user?.currentAddress?.street}, {user?.currentAddress?.locality},{" "}
            {user?.currentAddress?.district}, {user?.currentAddress?.state},{" "}
            {user?.currentAddress?.pin}
          </p>
        </div>
        <div className="flex pt-3">
          <h2 className="w-[180px] font-medium t ">Permanent Address :</h2>
          <p>
            {user?.permanentAddress?.street}, {user?.permanentAddress?.locality}
            , {user?.permanentAddress?.district},{" "}
            {user?.permanentAddress?.state}, {user?.permanentAddress?.pin}
          </p>
        </div>
      </div>
      <div className="pt-2 pb-5">
        <h2 className="py-2 text-2xl font-medium">Documents</h2>
        <hr className="w-full border-t-2 border-gray-700" />
        <div className="flex pt-3">
          <h2 className="w-[180px] font-medium t ">Documents :</h2>
          <p>{user?.email}</p>
        </div>
      </div>
      <Button onClick={() => logoutUser()}>Logout</Button>
      {isLoading && <Loader />}
    </div>
  );
};

export default ProfilePage;
