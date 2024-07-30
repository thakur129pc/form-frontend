import PropTypes from "prop-types";

const PreviewFile = ({ file, setShowFile }) => {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setShowFile(false)}
    >
      <div
        className="flex items-center justify-center z-50 w-[450px] bg-white p-5 rounded-md overflow-y-auto overflow-x-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={file}
          title="PDF Preview"
          width="100%"
          height="600px"
          style={{ border: "none" }}
          className="border-2"
        />
      </div>
    </div>
  );
};

PreviewFile.propTypes = {
  file: PropTypes.any,
  setShowFile: PropTypes.func,
};

export default PreviewFile;
