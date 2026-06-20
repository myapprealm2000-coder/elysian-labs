import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProject } from "@/hooks/useProjects";
import type { Project } from "@/types";
import { TemplateType } from "@/types";
import { Film, Image, LayoutTemplate, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (project: Project) => void;
}

interface TemplateOption {
  type: TemplateType;
  label: string;
  description: string;
  icon: React.ReactNode;
  accentClass: string;
  activeBg: string;
  activeRing: string;
  hoverBorder: string;
  glowColor: string;
}

const TEMPLATES: TemplateOption[] = [
  {
    type: TemplateType.blank,
    label: "Blank",
    description: "Start from scratch — video editing canvas.",
    icon: <LayoutTemplate className="w-6 h-6" />,
    accentClass: "text-muted-foreground",
    activeBg: "oklch(0.16 0.005 240 / 0.5)",
    activeRing: "oklch(0.35 0.005 240)",
    hoverBorder: "oklch(0.35 0.005 240)",
    glowColor: "oklch(0.35 0.005 240 / 0.15)",
  },
  {
    type: TemplateType.thumbnail,
    label: "Thumbnail",
    description: "Optimized for YouTube & social thumbnails.",
    icon: <Image className="w-6 h-6" />,
    accentClass: "text-accent",
    activeBg: "oklch(0.14 0.06 142 / 0.45)",
    activeRing: "oklch(0.65 0.17 150)",
    hoverBorder: "oklch(0.65 0.17 150 / 0.7)",
    glowColor: "oklch(0.82 0.29 142 / 0.18)",
  },
  {
    type: TemplateType.ad,
    label: "Ad Preset",
    description: "Pre-sized for ads across major platforms.",
    icon: <Film className="w-6 h-6" />,
    accentClass: "text-primary",
    activeBg: "oklch(0.14 0.07 270 / 0.45)",
    activeRing: "oklch(0.38 0.15 270)",
    hoverBorder: "oklch(0.38 0.15 270 / 0.7)",
    glowColor: "oklch(0.38 0.15 270 / 0.2)",
  },
];

export function CreateProjectModal({
  open,
  onClose,
  onCreated,
}: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<TemplateType>(TemplateType.blank);
  const createProject = useCreateProject();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    try {
      const project = await createProject.mutateAsync({
        name: trimmed,
        templateType: selected,
      });
      toast.success("Project created!", { description: trimmed });
      setName("");
      setSelected(TemplateType.blank);
      onClose();
      if (onCreated) onCreated(project);
    } catch {
      toast.error("Failed to create project. Please try again.");
    }
  };

  const handleClose = () => {
    if (!createProject.isPending) {
      setName("");
      setSelected(TemplateType.blank);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        className="sm:max-w-lg border"
        style={{
          background: "oklch(0.11 0.006 240)",
          borderColor: "oklch(0.22 0.006 240)",
          boxShadow:
            "0 0 60px oklch(0 0 0 / 0.65), 0 0 0 1px oklch(0.22 0.006 240)",
        }}
        data-ocid="create-project-modal"
      >
        <DialogHeader>
          <DialogTitle
            className="font-display text-xl"
            style={{ color: "oklch(0.98 0 0)" }}
          >
            New Project
          </DialogTitle>
          <DialogDescription className="font-body text-muted-foreground">
            Name your project and choose a starting template.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          {/* Name Input */}
          <div className="space-y-2">
            <Label
              htmlFor="project-name"
              className="font-display text-xs uppercase tracking-widest text-muted-foreground"
            >
              Project Name
            </Label>
            <Input
              id="project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Project"
              className="bg-input border-border focus:border-primary focus-visible:ring-0
                focus:shadow-[0_0_12px_oklch(0.38_0.15_270_/_0.3)] font-body transition-all duration-200"
              data-ocid="project-name-input"
              autoFocus
            />
          </div>

          {/* Template Selector */}
          <div className="space-y-2">
            <Label className="font-display text-xs uppercase tracking-widest text-muted-foreground">
              Template
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {TEMPLATES.map((tpl) => {
                const isActive = selected === tpl.type;
                return (
                  <button
                    key={tpl.type}
                    type="button"
                    onClick={() => setSelected(tpl.type)}
                    data-ocid={`template-${tpl.type}`}
                    aria-pressed={isActive}
                    className="relative rounded-xl border p-3 text-left cursor-pointer transition-all duration-200"
                    style={{
                      background: isActive
                        ? tpl.activeBg
                        : "oklch(0.09 0.005 240)",
                      borderColor: isActive
                        ? tpl.activeRing
                        : "oklch(0.22 0.005 240)",
                      boxShadow: isActive
                        ? `0 0 16px ${tpl.glowColor}`
                        : "none",
                      outline: isActive
                        ? `1px solid ${tpl.activeRing}`
                        : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.borderColor = tpl.hoverBorder;
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          `0 0 12px ${tpl.glowColor}`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.borderColor = "oklch(0.22 0.005 240)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "none";
                      }
                    }}
                  >
                    <span className={`block mb-2 ${tpl.accentClass}`}>
                      {tpl.icon}
                    </span>
                    <span
                      className="block font-display text-xs font-semibold leading-tight"
                      style={{ color: "oklch(0.96 0 0)" }}
                    >
                      {tpl.label}
                    </span>
                    <span
                      className="block font-body text-[10px] mt-1 leading-tight"
                      style={{ color: "oklch(0.55 0.005 240)" }}
                    >
                      {tpl.description}
                    </span>
                    {isActive && (
                      <span
                        className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                        style={{
                          background: tpl.activeRing,
                          boxShadow: `0 0 6px ${tpl.activeRing}`,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={createProject.isPending}
              className="font-body text-muted-foreground hover:text-foreground"
              data-ocid="cancel-create-btn"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || createProject.isPending}
              className="font-display font-semibold transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.38 0.15 270) 0%, oklch(0.65 0.17 150) 100%)",
                color: "oklch(0.98 0 0)",
                border: "none",
                boxShadow: name.trim()
                  ? "0 0 16px oklch(0.38 0.15 270 / 0.4)"
                  : "none",
              }}
              data-ocid="submit-create-btn"
            >
              {createProject.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating…
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
