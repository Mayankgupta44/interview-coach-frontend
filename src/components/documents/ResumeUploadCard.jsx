import Button from "../ui/Button";

export default function ResumeUploadCard({
  resumeFile,
  setResumeFile,
  onUpload,
  uploading,
  uploadInfo,
}) {
  return (
    <div
      className="rounded-xl bg-appBg dark:bg-white/5 backdrop-blur-md p-5 
      shadow-soft dark:shadow-blue-500/10"
    >
      <h3 className="text-sm font-semibold text-textPrimary dark:text-white">
        Upload PDF Resume
      </h3>

      <p className="mt-1 text-sm text-textSecondary dark:text-gray-300">
        Upload a PDF resume. Text will be extracted automatically and shown
        below.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          className="block w-full rounded-xl bg-card dark:bg-white/5 
          px-4 py-3 text-sm text-textSecondary dark:text-gray-300 
          shadow-inner cursor-pointer 
          border border-transparent dark:border-white/10"
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
        <div className="mt-4 rounded-xl bg-card dark:bg-[rgba(15,23,42,0.7)] 
        p-4 shadow-soft dark:shadow-blue-500/10">
          <p className="text-sm font-medium text-textPrimary dark:text-white">
            {uploadInfo.originalFileName}
          </p>

          <p
            className={`mt-1 text-xs ${
              uploadInfo.extractionSuccess ? "text-success dark:text-green-400" : "text-danger dark:text-red-400"
            }`}
          >
            {uploadInfo.extractionSuccess
              ? "Text extracted successfully"
              : "Text extraction failed"}
          </p>

          {uploadInfo.extractionError && (
            <p className="mt-2 text-sm text-danger dark:text-red-400">
              {uploadInfo.extractionError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
