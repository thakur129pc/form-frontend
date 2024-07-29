import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./login.scss";
import { loginUser } from "../../redux/apis/authAPI";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { useState } from "react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setIsLoading(true);
    loginUser(values).then((res) => {
      setIsLoading(false);
      if (res.success) {
        navigate("/profile");
      } else {
        if (res?.message) {
          alert(res.message);
        } else {
          alert("Internal server error.");
        }
      }
      setSubmitting(false);
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="loginPage m-auto px-8 max-w-md border-blue-200 border self-center text-center w-[300px] sm:w-[350px] md:w-[380px] lg:w-[380px]">
        <h3 className="my-14 font-bold">LOGIN</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-8">
                <Field type="text" name="username" placeholder="User ID" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </div>
              <div className="mb-8">
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <Button type="submit" disabled={isSubmitting} color="secondary">
                Login
              </Button>
              <p className="my-8">
                <Link to="/register" className="text-secondary font-semibold">
                  Create Account
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default LoginPage;
