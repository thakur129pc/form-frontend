import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import Button from "../../../components/Button";
import { prevStep, updateFormData } from "../../../redux/slices/formSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../redux/apis/formAPI";

const ThirdStep = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useSelector((state) => state.formSlice);
  const formData = {
    ...form.formData.step1,
    ...form.formData.step2,
    ...form.formData.step3,
  };

  const initialValues = {
    username: data?.username || "",
    password: data?.password || "",
    confirmPassword: data?.confirmPassword || "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username cannot exceed 20 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const previousStep = (values) => {
    const payload = {
      step: "step3",
      data: values,
    };
    dispatch(updateFormData(payload));
    dispatch(prevStep(3));
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      step: "step3",
      data: values,
    };
    dispatch(updateFormData(payload));
    registerUser({ ...formData, ...values }).then((res) => {
      if (res.success) {
        alert(res?.message);
        navigate("/login");
      } else {
        if (res?.message) {
          alert(res.message);
        } else {
          alert("Internal server error.");
        }
      }
    });
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
          <div className="flex">
            <div className="flex-1/3">
              {/* User Name Input Field */}
              <div className="flex-1 mb-3 flex-col">
                <label htmlFor="username" className="formLabel">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="formField"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </div>
              {/* Create Password Input Field */}
              <div className="flex-1 mb-3 flex-col">
                <label htmlFor="password" className="formLabel">
                  Create Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="formField"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              {/* Confirm Password Input Field */}
              <div className="flex-1 mb-3 flex-col">
                <label htmlFor="confirmPassword" className="formLabel">
                  Confirm Password
                </label>
                <Field
                  type="text"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="formField"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 flex w-[100%] pb-5 justify-center gap-5">
            <Button
              onClick={() => {
                previousStep(values);
              }}
            >
              Previous
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Register
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

ThirdStep.propTypes = {
  data: PropTypes.object,
};

export default ThirdStep;
