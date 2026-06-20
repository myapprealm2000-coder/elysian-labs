import { useAdCreatorStore } from "@/store/adCreatorStore";
import type { ImageCanvasElement } from "@/store/adCreatorStore";
import { Link, Upload, X } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: "image" | "video";
}

export function UploadsTab() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { addElement, canvasSize } = useAdCreatorStore();

  const ALLOWED_IMAGE_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ]);

  function handleFiles(raw: FileList | null) {
    if (!raw) return;
    const added: UploadedFile[] = [];
    let rejected = 0;
    for (const f of Array.from(raw)) {
      const isImage = ALLOWED_IMAGE_TYPES.has(f.type);
      const isVideo = f.type.startsWith("video/");
      if (!isImage && !isVideo) {
        rejected++;
        continue;
      }
      const url = URL.createObjectURL(f);
      const type = isVideo ? "video" : "image";
      added.push({
        id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        name: f.name,
        url,
        type,
      });
    }
    if (rejected > 0) {
      import("sonner").then(({ toast }) =>
        toast.error(
          "Only image files are supported (JPG, PNG, WebP, GIF, SVG)",
        ),
      );
    }
    setFiles((prev) => [...prev, ...added]);
  }

  function addToCanvas(file: UploadedFile) {
    if (file.type !== "image") return;
    const el: Omit<ImageCanvasElement, "id"> = {
      type: "image",
      name: file.name,
      x: canvasSize.width * 0.2,
      y: canvasSize.height * 0.2,
      width: 400,
      height: 400,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      src: file.url,
      filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        hue: 0,
      },
      shadow: null,
      backgroundRemoved: false,
      mask: null,
    };
    addElement(el);
  }

  function addFromUrl() {
    if (!urlInput.trim()) return;
    const file: UploadedFile = {
      id: `url-${Date.now()}`,
      name: urlInput.split("/").pop() ?? "Image",
      url: urlInput.trim(),
      type: "image",
    };
    setFiles((prev) => [...prev, file]);
    setUrlInput("");
    addToCanvas(file);
  }

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      {/* Drop Zone */}
      <motion.div
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        animate={{
          borderColor: dragging
            ? "rgba(37,99,235,0.7)"
            : "rgba(255,255,255,0.1)",
        }}
        className="relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-blue-500/40 transition-colors"
        onClick={() => fileRef.current?.click()}
      >
        <motion.div
          animate={{ scale: dragging ? 1.2 : 1 }}
          className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center"
        >
          <Upload className="w-5 h-5 text-blue-400" />
        </motion.div>
        <p className="text-xs text-center text-muted-foreground">
          {dragging ? "Drop to upload" : "Drop files or click to upload"}
        </p>
        <p className="text-[10px] text-muted-foreground/60">Images & Videos</p>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,video/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </motion.div>

      {/* From URL */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addFromUrl()}
            placeholder="Paste image URL…"
            className="w-full pl-8 pr-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <button
          type="button"
          onClick={addFromUrl}
          className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg text-xs text-blue-400 transition-all"
        >
          Add
        </button>
      </div>

      {/* Uploaded files grid */}
      {files.length > 0 && (
        <div className="overflow-y-auto flex-1 pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
            Uploads ({files.length})
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {files.map((f) => (
              <button
                key={f.id}
                type="button"
                className="group relative aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-blue-500/40 transition-all cursor-pointer"
                onClick={() => addToCanvas(f)}
              >
                <img
                  src={f.url}
                  alt={f.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFiles((prev) => prev.filter((u) => u.id !== f.id));
                  }}
                  className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-2.5 h-2.5 text-white" />
                </button>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
