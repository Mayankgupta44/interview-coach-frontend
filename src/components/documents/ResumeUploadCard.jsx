import Button from "../ui/Button";

export default function ResumeUploadCard({
  resumeFile,
  setResumeFile,
  onUpload,
  uploading,
  uploadInfo,
}) {
  return (
    <div className="rounded-xl bg-[#0f172a] border border-white/10 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-white">
        Upload PDF Resume
      </h3>

      <p className="mt-1 text-sm text-gray-400">
        Upload a PDF resume. Text will be extracted automatically and shown below.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          className="block w-full rounded-xl bg-[#020617] px-4 py-3 text-sm text-gray-400 border border-white/10 cursor-pointer"
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
        <div className="mt-4 rounded-xl bg-[#020617] p-4 border border-white/10">
          <p className="text-sm font-medium text-white">
            {uploadInfo.originalFileName}
          </p>

          <p
            className={`mt-1 text-xs ${
              uploadInfo.extractionSuccess ? "text-green-400" : "text-red-400"
            }`}
          >
            {uploadInfo.extractionSuccess
              ? "Text extracted successfully"
              : "Text extraction failed"}
          </p>

          {uploadInfo.extractionError && (
            <p className="mt-2 text-sm text-red-400">
              {uploadInfo.extractionError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}