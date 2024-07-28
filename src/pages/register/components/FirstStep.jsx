import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import Button from "../../../components/Button";
import { nextStep, updateFormData } from "../../../redux/slices/formSlice";
import { useDispatch } from "react-redux";

const FirstStep = ({ data }) => {
  const dispatch = useDispatch();
  const initialValues = {
    fullName: data?.fullName || "",
    gender: data?.gender || "",
    dateOfBirth: data?.dateOfBirth || "",
    fatherName: data?.fatherName || "",
    motherName: data?.motherName || "",
    maritalStatus: data?.maritalStatus || "",
    spouseName: data?.spouseName || "",
    phoneNumber: data?.phoneNumber || "",
    email: data?.email || "",
    currentAddress: {
      street: data?.currentAddress?.street || "",
      locality: data?.currentAddress?.locality || "",
      state: data?.currentAddress?.state || "",
      district: data?.currentAddress?.district || "",
      pin: data?.currentAddress?.pin || "",
    },
    permanentAddress: {
      street: data?.permanentAddress?.street || "",
      locality: data?.permanentAddress?.locality || "",
      state: data?.permanentAddress?.state || "",
      district: data?.permanentAddress?.district || "",
      pin: data?.permanentAddress?.pin || "",
    },
    photo: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Name is required"),
    gender: Yup.string().required("Please select gender"),
    dateOfBirth: Yup.date().required("DOB is required"),
    fatherName: Yup.string().required("Father name is required"),
    motherName: Yup.string().required("Mother name is required"),
    maritalStatus: Yup.boolean().required("Please select martial status"),
    spouseName: Yup.string(),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .typeError("Phone number must be a number"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    currentAddress: Yup.object({
      street: Yup.string().required("Street is required"),
      locality: Yup.string().required("Locality is required"),
      state: Yup.string().required("State is required"),
      district: Yup.string().required("District is required"),
      pin: Yup.string()
        .length(6, "Pin code must be exactly 6 digits")
        .matches(/^\d+$/, "Pin code must contain only numbers")
        .required("Pin code is required"),
    }),
    permanentAddress: Yup.object({
      street: Yup.string().required("Street is required"),
      locality: Yup.string().required("Locality is required"),
      state: Yup.string().required("State is required"),
      district: Yup.string().required("District is required"),
      pin: Yup.string()
        .length(6, "Pin code must be exactly 6 digits")
        .matches(/^\d+$/, "Pin code must contain only numbers")
        .required("Pin code is required"),
    }),
    photo: Yup.mixed(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = { step: "step1", data: values };
    dispatch(updateFormData(payload));
    dispatch(nextStep(1));
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <div className="flex gap-2 flex-wrap-reverse md:gap-14">
            <div className="flex-1">
              <div className="flex justify-between flex-col gap-2 md:flex-row md:gap-6 mb-3">
                {/* Full Name Input Field */}
                <div className="flex-1 flex-col">
                  <label htmlFor="fullName" className="formLabel">
                    Full Name (As per Aadhar)
                  </label>
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="formField"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Gender Input Field */}
                <div className="flex-1">
                  <label htmlFor="gender" className="formLabel">
                    Gender
                  </label>
                  <div className="flex items-center gap-10 h-10">
                    <div className="flex gap-1 items-center">
                      <Field
                        type="radio"
                        name="gender"
                        value="Male"
                        id="Male"
                      />
                      <label htmlFor="Male" className="formLabel">
                        Male
                      </label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Field
                        type="radio"
                        name="gender"
                        value="Female"
                        id="Female"
                      />
                      <label htmlFor="Female" className="formLabel">
                        Female
                      </label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Field
                        type="radio"
                        name="gender"
                        value="Other"
                        id="Other"
                      />
                      <label htmlFor="Other" className="formLabel">
                        Other
                      </label>
                    </div>
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="flex-1">
                  {/* DOB Input Field */}
                  <label htmlFor="dateOfBirth" className="formLabel">
                    Date of Birth
                  </label>
                  <Field
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="formField"
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="flex justify-between flex-col gap-2 md:flex-row md:gap-6 mb-3">
                {/* Father's Name Input Field */}
                <div className="flex-1 flex-col">
                  <label htmlFor="fatherName" className="formLabel">
                    Father&apos;s Name
                  </label>
                  <Field
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    className="formField"
                  />
                  <ErrorMessage
                    name="fatherName"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="flex-1 flex-col">
                  {/* Mother's Name Input Field */}
                  <label htmlFor="motherName" className="formLabel">
                    Mothers Name
                  </label>
                  <Field
                    type="text"
                    id="motherName"
                    name="motherName"
                    className="formField"
                  />
                  <ErrorMessage
                    name="motherName"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="flex-1"></div>
              </div>
              <div className="flex justify-between flex-col gap-2 md:flex-row md:gap-6 mb-3">
                {/* Martial Status Input Field */}
                <div className="flex-1">
                  <label htmlFor="gender" className="formLabel">
                    Martial Status
                  </label>
                  <div className="flex items-center gap-10 h-10">
                    <div className="flex gap-1 items-center">
                      <Field
                        type="radio"
                        name="maritalStatus"
                        value="true"
                        id="yes"
                      />
                      <label htmlFor="yes" className="formLabel">
                        Yes
                      </label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Field
                        type="radio"
                        name="maritalStatus"
                        value="false"
                        id="no"
                      />
                      <label htmlFor="no" className="formLabel">
                        No
                      </label>
                    </div>
                  </div>
                  <ErrorMessage
                    name="maritalStatus"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Spouse Name Input Field */}
                <div className="flex-1 flex-col">
                  <label htmlFor="spouseName" className="formLabel">
                    Spouse Name
                  </label>
                  <Field
                    type="text"
                    id="spouseName"
                    name="spouseName"
                    className="formField"
                  />
                  <ErrorMessage
                    name="spouseName"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="flex-1"></div>
              </div>
              <div className="flex justify-between flex-col gap-2 md:flex-row md:gap-6 mb-3">
                {/* Phone Number Input Field */}
                <div className="flex-1 flex-col">
                  <label htmlFor="phoneNumber" className="formLabel">
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="formField"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="flex-1 flex-col">
                  {/* Email Input Field */}
                  <label htmlFor="email" className="formLabel">
                    Email
                  </label>
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    className="formField"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="flex-1"></div>
              </div>
              <div className="flex justify-between flex-col gap-2 md:flex-row md:gap-6 mb-3">
                {/* Current Address Input Field */}
                <div className="flex-1 flex-col">
                  <div className="formLabel">Current Address</div>
                </div>
              </div>
              <div className="flex justify-between flex-col gap-2 md:flex-row md:gap-6 mb-4">
                {/* Current Street Input Field */}
                <div className="flex-1 flex-col">
                  <Field
                    type="text"
                    id="currentStreet"
                    name="currentAddress.street"
                    className="formField"
                    placeholder="Street"
                  />
                  <ErrorMessage
                    name="currentAddress.street"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Current Locality Input Field */}
                <div className="flex-1 flex-col">
                  <Field
                    type="text"
                    id="currentLocality"
                    name="currentAddress.locality"
                    className="formField"
                    placeholder="Locality"
                  />
                  <ErrorMessage
                    name="currentAddress.locality"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="flex justify-between flex-col gap-2 md:flex-row md:gap-6 mb-3">
                {/* Current State Input Field */}
                <div className="flex-1 flex-col">
                  <Field
                    type="text"
                    id="currentState"
                    name="currentAddress.state"
                    className="formField"
                    placeholder="State"
                  />
                  <ErrorMessage
                    name="currentAddress.state"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Current District Input Field */}
                <div className="flex-1 flex-col">
                  <Field
                    type="text"
                    id="currentDistrict"
                    name="currentAddress.district"
                    className="formField"
                    placeholder="District"
                  />
                  <ErrorMessage
                    name="currentAddress.district"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Current Pin Input Field */}
                <div className="flex-1 flex-col">
                  <Field
                    type="text"
                    id="currentPin"
                    name="currentAddress.pin"
                    className="formField"
                    placeholder="Pin"
                  />
                  <ErrorMessage
                    name="currentAddress.pin"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="flex justify-between flex-col gap-2 md:flex-row md:gap-6 mb-3">
                {/* Permanent Address Input Field */}
                <div className="flex-1 flex-col">
                  <div className="formLabel">Permanent Address</div>
                </div>
              </div>
              <div className="flex justify-between flex-col gap-2 md:flex-row md:gap-6 mb-4">
                {/* Permanent Street Input Field */}
                <div className="flex-1 flex-col">
                  <Field
                    type="text"
                    id="permanentStreet"
                    name="permanentAddress.street"
                    className="formField"
                    placeholder="Street"
                  />
                  <ErrorMessage
                    name="permanentAddress.street"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Permanent Locality Input Field */}
                <div className="flex-1 flex-col">
                  <Field
                    type="text"
                    id="permanentLocality"
                    name="permanentAddress.locality"
                    className="formField"
                    placeholder="Locality"
                  />
                  <ErrorMessage
                    name="permanentAddress.locality"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="flex justify-between flex-col gap-2 md:flex-row md:gap-6 mb-3">
                {/* Permanent State Input Field */}
                <div className="flex-1 flex-col">
                  <Field
                    type="text"
                    id="permanentState"
                    name="permanentAddress.state"
                    className="formField"
                    placeholder="State"
                  />
                  <ErrorMessage
                    name="permanentAddress.state"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Permanent District Input Field */}
                <div className="flex-1 flex-col">
                  <Field
                    type="text"
                    id="permanentDistrict"
                    name="permanentAddress.district"
                    className="formField"
                    placeholder="District"
                  />
                  <ErrorMessage
                    name="permanentAddress.district"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Permanent Pin Input Field */}
                <div className="flex-1 flex-col">
                  <Field
                    type="text"
                    id="permanentPin"
                    name="permanentAddress.pin"
                    className="formField"
                    placeholder="Pin"
                  />
                  <ErrorMessage
                    name="permanentAddress.pin"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="formLabel">Photo</div>
              <label htmlFor="photo" className="cursor-pointer">
                <div className="border-[1.5px] border-gray-600 rounded-lg p-4 flex flex-col justify-center items-center w-[325px] gap-2">
                  <img
                    src={values?.photo || "./camera.svg"}
                    className="h-24 w-24"
                  ></img>
                  <p className="formLabel">Upload Image</p>
                </div>
              </label>
              <Field
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                hidden
              />
              <ErrorMessage name="image" component="div" className="error" />
            </div>
          </div>
          <div className="fixed bottom-0 flex w-[100%] pb-5 justify-center">
            <Button type="submit" disabled={isSubmitting}>
              Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

FirstStep.propTypes = {
  data: PropTypes.object,
};

export default FirstStep;
