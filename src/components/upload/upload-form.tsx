"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-action";

const schema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine((file) => file.type === "application/pdf", "File must be a PDF"),
});

const UploadForm: React.FC = () => {
  const { startUpload } = useUploadThing("pdfUploader");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      const errors = validatedFields.error.flatten().fieldErrors.file;
      toast.error("Invalid file", {
        description: errors?.join(", ") ?? "File is invalid",
      });
      return;
    }

    const uploadPromise = (): Promise<{ name: string }> =>
      new Promise((resolve, reject) => {
        startUpload([file as File])
          .then((resp) => {
            if (!resp) {
              reject(new Error("Upload failed to start"));
              return;
            }
            generatePdfSummary(resp).then((data) => {
              console.log(data);
              resolve({ name: (file as File).name });
            });
          })
          .catch((err: unknown) => {
            reject(
              err instanceof Error ? err : new Error("Unknown upload error")
            );
          });
      });

    toast.promise(uploadPromise(), {
      loading: "Uploading file...",
      success: (data) => `${data.name} has been uploaded successfully`,
      error: (err) => err.message ?? "An error occurred during upload",
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex justify-end items-center gap-1.5">
          <Input
            type="file"
            name="file"
            id="file"
            accept="application/pdf"
            required
            className=""
          />
          <Button type="submit">Upload Your PDF</Button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
