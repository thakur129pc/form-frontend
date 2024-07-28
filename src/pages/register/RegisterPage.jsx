import { useSelector } from "react-redux";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";
import ThirdStep from "./components/ThirdStep";
import "./register.scss";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const form = useSelector((state) => state.formSlice);

  return (
    <div className="registerPage px-8 py-6">
      <div className="flex justify-start gap-2 md:gap-10 lg:gap-20 flex-wrap mb-5">
        <div
          className={`${
            form.currentStep === 1
              ? "bg-primary text-white"
              : "bg-white text-primary"
          } border border-primary rounded-lg px-14 py-2 text-md font-medium`}
        >
          Personal Details
        </div>
        <div
          className={`${
            form.currentStep === 2
              ? "bg-primary text-white"
              : "bg-white text-primary"
          } border border-primary rounded-lg px-14 py-2 text-md font-medium`}
        >
          Documents
        </div>
        <div
          className={`${
            form.currentStep === 3
              ? "bg-primary text-white"
              : "bg-white text-primary"
          } border border-primary rounded-lg px-14 py-2 text-md font-medium`}
        >
          User ID
        </div>
        <p className="flex items-center">
          <Link to="/login" className="text-secondary font-semibold">
            Back to login
          </Link>
        </p>
      </div>
      <div className="pt-5">
        {form.currentStep === 1 ? (
          <FirstStep data={form.formData.step1} />
        ) : form.currentStep === 2 ? (
          <SecondStep data={form.formData.step2} />
        ) : (
          <ThirdStep data={form.formData.step3} />
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
