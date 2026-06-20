import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";
import { TemplateType } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  Edit3,
  Film,
  Image,
  LayoutTemplate,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";

interface ProjectCardProps {
  project: Project;
  onDelete: (project: Project) => void;
}

function formatDate(ts: bigint): string {
  const date = new Date(Number(ts / 1_000_000n));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const TEMPLATE_META: Record<
  TemplateType,
  {
    label: string;
    icon: React.ReactNode;
    badgeStyle: React.CSSProperties;
    previewBg: string;
    iconColor: string;
    editorRoute: string;
  }
> = {
  [TemplateType.blank]: {
    label: "Video",
    icon: <LayoutTemplate className="w-3.5 h-3.5" />,
    badgeStyle: {
      background: "oklch(0.18 0.004 240 / 0.8)",
      border: "1px solid oklch(0.28 0.005 240)",
      color: "oklch(0.72 0.005 240)",
    },
    previewBg:
      "linear-gradient(135deg, oklch(0.16 0.005 240) 0%, oklch(0.12 0.004 240) 100%)",
    iconColor: "oklch(0.38 0.005 240)",
    editorRoute: "/editor/$projectId",
  },
  [TemplateType.thumbnail]: {
    label: "Thumbnail",
    icon: <Image className="w-3.5 h-3.5" />,
    badgeStyle: {
      background: "oklch(0.16 0.06 142 / 0.7)",
      border: "1px solid oklch(0.65 0.17 150 / 0.4)",
      color: "oklch(0.82 0.17 142)",
    },
    previewBg:
      "linear-gradient(135deg, oklch(0.15 0.05 142) 0%, oklch(0.11 0.03 150) 100%)",
    iconColor: "oklch(0.65 0.17 150)",
    editorRoute: "/editor/$projectId/canvas",
  },
  [TemplateType.ad]: {
    label: "Ad Creative",
    icon: <Film className="w-3.5 h-3.5" />,
    badgeStyle: {
      background: "oklch(0.16 0.07 270 / 0.7)",
      border: "1px solid oklch(0.38 0.15 270 / 0.5)",
      color: "oklch(0.62 0.14 270)",
    },
    previewBg:
      "linear-gradient(135deg, oklch(0.15 0.06 270) 0%, oklch(0.11 0.04 270) 100%)",
    iconColor: "oklch(0.45 0.14 270)",
    editorRoute: "/editor/$projectId/canvas",
  },
};

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const navigate = useNavigate();
  const meta = TEMPLATE_META[project.templateType];

  const handleOpen = () => {
    navigate({
      to: meta.editorRoute as never,
      params: { projectId: project.id } as never,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "oklch(0.12 0.006 240 / 0.9)",
        border: "1px solid oklch(0.22 0.006 240 / 0.6)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 4px 24px oklch(0 0 0 / 0.25)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      data-ocid="project-card"
      onClick={handleOpen}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "oklch(0.38 0.15 270 / 0.55)";
        el.style.boxShadow =
          "0 8px 40px oklch(0.38 0.15 270 / 0.18), 0 0 0 1px oklch(0.38 0.15 270 / 0.2)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "oklch(0.22 0.006 240 / 0.6)";
        el.style.boxShadow = "0 4px 24px oklch(0 0 0 / 0.25)";
      }}
    >
      {/* Preview Area */}
      <div
        className="relative h-40 flex items-center justify-center overflow-hidden"
        style={{ background: meta.previewBg }}
      >
        {/* Large background icon */}
        <div
          className="opacity-[0.12] group-hover:opacity-[0.2] transition-opacity duration-400"
          style={{ color: meta.iconColor }}
        >
          {project.templateType === TemplateType.blank && (
            <LayoutTemplate className="w-20 h-20" />
          )}
          {project.templateType === TemplateType.thumbnail && (
            <Image className="w-20 h-20" />
          )}
          {project.templateType === TemplateType.ad && (
            <Film className="w-20 h-20" />
          )}
        </div>

        {/* Scan-line shimmer on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
          style={{
            background:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,oklch(0.82 0.29 142 / 0.025) 2px,oklch(0.82 0.29 142 / 0.025) 4px)",
          }}
        />

        {/* Top accent line on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.38 0.15 270) 0%, oklch(0.65 0.17 150) 50%, transparent 100%)",
          }}
        />

        {/* Action overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-250"
          style={{ background: "oklch(0.05 0 0 / 0.6)" }}
        >
          <Button
            size="sm"
            className="h-8 font-display text-xs font-semibold gap-1.5 transition-all duration-200"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.38 0.15 270) 0%, oklch(0.65 0.17 150) 100%)",
              color: "oklch(0.98 0 0)",
              border: "none",
              boxShadow: "0 0 14px oklch(0.38 0.15 270 / 0.5)",
            }}
            data-ocid="project-open-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
          >
            <Edit3 className="w-3 h-3" /> Open
          </Button>
          <Button
            size="sm"
            className="h-8 w-8 p-0 rounded-lg transition-all duration-200"
            style={{
              background: "oklch(0.52 0.22 25 / 0.15)",
              border: "1px solid oklch(0.52 0.22 25 / 0.35)",
              color: "oklch(0.7 0.18 25)",
            }}
            data-ocid="project-delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project);
            }}
            aria-label="Delete project"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-display text-sm font-bold leading-tight truncate min-w-0"
            style={{ color: "oklch(0.96 0 0)" }}
          >
            {project.name}
          </h3>
          <Badge
            className="shrink-0 text-[11px] flex items-center gap-1 font-body font-medium px-2 py-0.5 rounded-full border-0"
            style={meta.badgeStyle}
          >
            {meta.icon}
            {meta.label}
          </Badge>
        </div>

        <div
          className="flex items-center gap-1.5"
          style={{ color: "oklch(0.55 0.006 240)" }}
        >
          <Calendar className="w-3 h-3 shrink-0" />
          <span className="text-xs font-body truncate">
            Modified {formatDate(project.updatedAt)}
          </span>
        </div>

        <div
          className="flex items-center justify-between pt-1"
          style={{ borderTop: "1px solid oklch(0.2 0.005 240 / 0.5)" }}
        >
          <span
            className="text-[11px] font-body"
            style={{ color: "oklch(0.42 0.005 240)" }}
          >
            Created {formatDate(project.createdAt)}
          </span>
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.38 0.15 270), oklch(0.65 0.17 150))",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
