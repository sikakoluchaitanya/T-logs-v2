"use client";

import { useEffect, useRef } from "react";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<any>(null);

  const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");

          // Max dimensions based on desired resolution
          const MAX_WIDTH = 1600;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // Use WebP format for near-lossless compression
          let compressedBase64 = canvas.toDataURL("image/webp", 1); // '1' for near-lossless quality

          // Alternatively, use PNG format for truly lossless compression
          // let compressedBase64 = canvas.toDataURL("image/png");

          // Dynamically adjust quality to keep the image under 1MB
          while (compressedBase64.length > 1_000_000) {
            compressedBase64 = canvas.toDataURL("image/webp", 0.9); // Reduce quality slightly
          }

          resolve(compressedBase64);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initQuill = async () => {
      const Quill = (await import("quill")).default;
      await import("quill/dist/quill.snow.css");

      if (!quillRef.current || editorRef.current) return;

      // Custom image handler
      const imageHandler = async () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const file = input.files?.[0];
          if (file) {
            const compressedBase64 = await compressImage(file);
            const range = editorRef.current.getSelection(true);
            editorRef.current.insertEmbed(
              range.index,
              "image",
              compressedBase64
            );
          }
        };
      };

      editorRef.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [
                { header: "1" },
                { header: "2" },
                { header: "3" },
                { header: "4" },
                { header: "5" },
                { header: "6" },
                {
                  font: [],
                },
              ],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              [
                "link",
                "image",
                "bold",
                "italic",
                "underline",
                "strike",
                "code-block",
                "clean",
              ],
              [{ color: [] }, { background: [] }],
              [{ indent: "-1" }, { indent: "+1" }],
            ],
            handlers: {
              image: imageHandler,
            },
          },
        },
      });

      editorRef.current.root.innerHTML = value || "";

      editorRef.current.on("text-change", () => {
        onChange(editorRef.current.root.innerHTML);
      });
    };

    initQuill();

    return () => {
      if (editorRef.current) {
        editorRef.current.off("text-change");
      }
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.root.innerHTML) {
      editorRef.current.root.innerHTML = value || "";
    }
  }, [value]);

  return <div ref={quillRef} style={{ height: "400px" }}></div>;
};

export default QuillEditor;
