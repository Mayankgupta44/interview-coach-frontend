import Button from "../ui/Button";

export default function ResumeUploadCard({
  resumeFile,
  setResumeFile,
  onUpload,
  uploading,
  uploadInfo,
}) {
  return (
    <div className="rounded-xl bg-appBg p-5">
      <h3 className="text-sm font-semibold text-textPrimary">
        Upload PDF Resume
      </h3>

      <p className="mt-1 text-sm text-textSecondary">
        Upload a PDF resume. Text will be extracted automatically and shown below.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          className="block w-full rounded-xl bg-card px-4 py-3 text-sm text-textSecondary shadow-inner cursor-pointer"
        />

        <Button
          className="sm:w-auto"
          onClick={onUpload}
          disabled={!resumeFile}
          loading={uploading}
        >
          Upload
        </Button>
      </div>

      {uploadInfo && (
        <div className="mt-4 rounded-xl bg-card p-4 shadow-soft">
          <p className="text-sm font-medium text-textPrimary">
            {uploadInfo.originalFileName}
          </p>

          <p
            className={`mt-1 text-xs ${
              uploadInfo.extractionSuccess ? "text-success" : "text-danger"
            }`}
          >
            {uploadInfo.extractionSuccess
              ? "Text extracted successfully"
              : "Text extraction failed"}
          </p>

          {uploadInfo.extractionError && (
            <p className="mt-2 text-sm text-danger">
              {uploadInfo.extractionError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}