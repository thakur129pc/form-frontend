import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import Button from "../../../components/Button";
import {
  nextStep,
  prevStep,
  updateFormData,
} from "../../../redux/slices/formSlice";
import { useDispatch } from "react-redux";

const SecondStep = ({ data }) => {
  const dispatch = useDispatch();

  const initialValues = {
    documents: data?.documents || [],
  };

  const validationSchema = Yup.object().shape({
    document: Yup.array()
      .of(Yup.string())
      // .of(
      //   Yup.object().shape({
      //     name: Yup.string().required("Document name is required"),
      //     type: Yup.string().required("Document type is required"),
      //     size: Yup.number().required("Document size is required"),
      //   })
      // )
      .min(1, "At least one document is required")
      .max(5, "Maximum 5 documents allowed"),
  });

  const previousStep = (values) => {
    const payload = {
      step: "step2",
      data: values,
    };
    dispatch(updateFormData(payload));
    dispatch(prevStep(2));
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = { step: "step2", data: values };
    dispatch(updateFormData(payload));
    dispatch(nextStep(2));
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
              <div className="mb-3">
                {/* Upload Documents Input Field */}
                <div className="formLabel">Document</div>
                <label htmlFor="photo" className="cursor-pointer">
                  <div className="border-[2px] border-gray-400 rounded-lg p-4 flex flex-col justify-center items-center w-[325px] gap-2">
                    <img src={"./upload.svg"} className="h-8 w-8"></img>
                    <p>Upload Documents</p>
                  </div>
                </label>
                <Field
                  type="file"
                  id="documents"
                  name="documents"
                  accept="image/*"
                  hidden
                />
                <ErrorMessage
                  name="documents"
                  component="div"
                  className="error"
                />
              </div>
              <div className="flex gap-7">
                <div className="border-[1.5px] border-gray-300 p-1 rounded-md">
                  <img src={"./pdf.svg"} className="h-8 w-8"></img>
                </div>
                <div className="border-[1.5px] border-gray-300 p-1 rounded-md">
                  <img src={"./pdf.svg"} className="h-8 w-8"></img>
                </div>
                <div className="border-[1.5px] border-gray-300 p-1 rounded-md">
                  <img src={"./pdf.svg"} className="h-8 w-8"></img>
                </div>
                <div className="border-[1.5px] border-gray-300 p-1 rounded-md">
                  <img src={"./pdf.svg"} className="h-8 w-8"></img>
                </div>
                <div className="border-[1.5px] border-gray-300 p-1 rounded-md">
                  <img src={"./pdf.svg"} className="h-8 w-8"></img>
                </div>
              </div>
            </div>
            <div className="fixed ml-[-32px] bottom-0 flex w-[100%] pb-8 justify-center gap-5">
              <Button
                onClick={() => {
                  previousStep(values);
                }}
              >
                Previous
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Next
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

SecondStep.propTypes = {
  data: PropTypes.object,
};

export default SecondStep;
