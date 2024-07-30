import { Formik, Form, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import Button from "../../../components/Button";
import {
  nextStep,
  prevStep,
  updateFormData,
} from "../../../redux/slices/formSlice";
import { useDispatch } from "react-redux";
import { convertToBase64 } from "../../../utils/base64";
import { useState } from "react";
import PreviewFile from "../../../components/PreviewFile";

const SecondStep = ({ data }) => {
  const [filesPreview, setFilesPreview] = useState(data?.documents || []);
  const [previewIndex, setPreviewIndex] = useState();
  const [showFile, setShowFile] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    documents: data?.documents || [],
  };

  const validationSchema = Yup.object().shape({
    documents: Yup.array()
      .min(1, "Please upload at least one file")
      .max(5, "You can upload a maximum of 5 files")
      .required("Required"),
  });

  const previousStep = (values) => {
    const payload = {
      step: "step2",
      data: values,
    };
    dispatch(updateFormData(payload));
    dispatch(prevStep(2));
  };

  const handleFileChange = async (event, setFieldValue) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    if (filesArray.length > 5 || filesArray.length + filesPreview.length > 5) {
      alert("You can only upload up to 5 documents.");
      event.target.value = "";
      return;
    }
    for (const file of filesArray) {
      const fileSizeKB = file.size / 1024;
      if (fileSizeKB >= 350) {
        alert(
          `File ${
            file.name
          } is too large. Please upload a PDF smaller than ${350}KB.`
        );
        return;
      }
    }
    if (filesArray.length) {
      const blobFiles = await Promise.all(
        filesArray.map(async (file) => {
          return await convertToBase64(file);
        })
      );
      if (filesPreview.length) {
        setFieldValue("documents", [...blobFiles, ...filesPreview]);
        setFilesPreview([...blobFiles, ...filesPreview]);
      } else {
        setFieldValue("documents", blobFiles);
        setFilesPreview(blobFiles);
      }
    } else {
      setFieldValue("documents", []);
    }
  };

  const handleDeleteFile = (index, setFieldValue) => {
    const files = [...filesPreview];
    files.splice(index, 1);
    setFilesPreview(files);
    setFieldValue("documents", files);
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
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <div className="flex">
            <div className="flex-1/3">
              <div className="mb-3">
                {/* Upload Documents Input Field */}
                <div className="formLabel">Document</div>
                <label htmlFor="documents" className="cursor-pointer">
                  <div className="w-[275px] sm:w-[325px] border-[2px] border-gray-400 rounded-lg p-4 flex flex-col justify-center items-center gap-2">
                    <img src={"./upload.svg"} className="h-8 w-8"></img>
                    <p className="text-gray-500 font-semibold">
                      {filesPreview.length
                        ? `${filesPreview.length} documents uploaded`
                        : "Upload Documents"}
                    </p>
                  </div>
                </label>
                <input
                  id="documents"
                  name="documents"
                  multiple
                  type="file"
                  accept=".pdf"
                  onChange={(event) => {
                    handleFileChange(event, setFieldValue);
                  }}
                  className="hidden"
                />
                <ErrorMessage
                  name="documents"
                  component="div"
                  className="error"
                />
              </div>
              <div className="flex gap-7 flex-wrap">
                {filesPreview.map((file, index) => (
                  <div
                    key={index}
                    className="border-[1.5px] border-gray-300 p-1 rounded-md cursor-pointer relative"
                    onClick={() => {
                      setShowFile(true);
                      setPreviewIndex(index);
                    }}
                  >
                    <img src={"./pdf.svg"} className="h-8 w-8"></img>
                    <div
                      className="absolute top-[-8px] right-[-8px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFile(index, setFieldValue);
                      }}
                    >
                      <img src={"./redCross.svg"} className="h-4 w-4"></img>
                      <div></div>
                    </div>
                  </div>
                ))}
                {showFile && (
                  <PreviewFile
                    file={filesPreview[previewIndex]}
                    setShowFile={setShowFile}
                  />
                )}
              </div>
            </div>
            <div className="fixed ml-[-32px] bottom-0 flex w-[100%] p-8 justify-center gap-5">
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
