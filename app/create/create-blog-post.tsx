"use client";

import { BlogTagsPicker } from "@/components/blog-tags-picker";
import QuillEditor from "@/components/QuillEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/utils/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import RequiredStar from "@/components/user-components/RequiredStar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CreateBlogPost = () => {
  const router = useRouter();

  const [editorValue, setEditorValue] = useState<string>("");

  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const [image, setImage] = useState<string | null>(null);

  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
  };

  // Callback function to handle the selected tags from the child
  const handleTagSelection = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post("/api/create", {
        title,
        description: editorValue,
        tags: selectedTags,
        image,
      });

      if (response.status === 201) {
        toast.success("Blog post created successfully");
        setTitle("");
        setEditorValue("");
        setSelectedTags([]);
        setImage(null);
        router.push("/");
      }
    } catch (error: any) {
      if (error?.status === 400) toast.error(error.response.data.message);
      else if (error?.status === 401) toast.error(error.response.data.message);
      else if (error?.status === 500) toast.error(error.response.data.message);
      else toast.error("Failed to create blog post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="mb-4 text-2xl font-bold tracking-tight">Post Blog</h1>
      <p className="mb-4 text-muted-foreground">
        <Link href="/" className="hover:underline-offset-4 hover:underline">
          Home
        </Link>{" "}
        &gt;{" "}
        <span className="font-medium text-muted-foreground">Create Post</span>
      </p>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="block text-sm font-medium">
              Title
              <RequiredStar />
            </Label>
            <Input
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <Label htmlFor="image" className="block text-sm font-medium">
              Cover Image
              <RequiredStar />
            </Label>
            <UploadDropzone
              className=""
              config={{
                appendOnPaste: true,
                mode: "auto",
              }}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImage(res[0].ufsUrl);
                toast.success("Image uploaded successfully");
                // console.log("Files: ", res);
                setImageUploading(false);
              }}
              onUploadError={(error: Error) => {
                toast.error(`ERROR! ${error.message}`);
                setImageUploading(false);
              }}
              onUploadBegin={(name) => {
                toast.info("Uploading image...");
                setImageUploading(true);
              }}
              onUploadProgress={(progress) => {
                // console.log("Progress: ", progress);
                // toast.info(`Uploading image... ${progress}%`);
              }}
            />
            <input type="hidden" name="image" value={image || ""} />
          </div>

          {image && (
            <div className="space-y-2">
              <div>
                <Label htmlFor="image" className="block text-sm font-medium">
                  Preview
                </Label>
                <p className="text-sm text-muted-foreground">
                  The image quality is slightly compressed and it could have
                  preview issues.
                </p>
              </div>
              <div className="relative rounded-md image-container">
                <div>
                  <Image
                    src={image}
                    alt={`${" "}image-uploaded-successfully`}
                    width={200}
                    height={50}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div
                  className="absolute top-0 right-0 z-10 p-1 shadow-md cursor-pointer cross bg-background"
                  onClick={() => setImage(null)}
                >
                  <X />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="tags" className="block text-sm font-medium">
              Select Related Topics
              <RequiredStar />
            </Label>
            <BlogTagsPicker
              selectedTags={selectedTags}
              onTagSelection={handleTagSelection}
            />
            <input type="hidden" name="tags" value={selectedTags} />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Description
              <RequiredStar />
            </label>
            <QuillEditor value={editorValue} onChange={handleEditorChange} />
            <input type="hidden" name="description" value={editorValue} />
          </div>

          <Button
            variant="default"
            type="submit"
            size="lg"
            className={cn(
              "cursor-pointer w-full py-8 px-2 bg-primary text-primary-foreground hover:bg-primary/90   rounded-md",
              imageUploading || submitting
                ? "opacity-50 cursor-not-allowed"
                : ""
            )}
            disabled={imageUploading || submitting}
          >
            Submit
          </Button>

          <Button
            variant="outline"
            type="reset"
            size="lg"
            className="w-full px-2 py-6 cursor-pointer"
            onClick={() => {
              setTitle("");
              setEditorValue("");
              setSelectedTags([]);
              setImage(null);
            }}
          >
            Reset
          </Button>
        </form>
        {/* TODO: remove later */}
        <div className="h-10"></div>
      </div>
    </section>
  );
};

export default CreateBlogPost;
