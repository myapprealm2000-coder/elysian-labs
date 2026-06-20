import { r as reactExports, j as jsxRuntimeExports, h as useNavigate } from "./vendor-80nuMd8G.js";
import { u as useComposedRefs, c as cn, B as Button, b as buttonVariants } from "./button-Dx5YDvtJ.js";
import { u as useControllableState, a as useId, P as Presence, b as Primitive, c as composeEventHandlers, d as createContext2, e as Portal$1, h as hideOthers, f as createContextScope, R as ReactRemoveScroll, g as useFocusGuards, F as FocusScope, D as DismissableLayer, i as createSlot, L as Label, I as Input, j as createSlottable } from "./label-D-w3bdgr.js";
import { X, c as LoaderCircle, d as LayoutTemplate, I as Image, F as Film, P as PenLine, T as Trash2, C as Calendar, e as Plus, f as TriangleAlert, R as RefreshCw, g as FolderPlus, S as Sparkles } from "./ui-lib-DG52wkUx.js";
import { u as useCreateProject, a as useProjects, b as useDeleteProject } from "./useProjects-Dt0JeNJy.js";
import { T as TemplateType, S as SAMPLE_PROJECTS, D as DEMO_PREVIEW_GRADIENTS } from "./demoProjects-DVpkKgMR.js";
import { u as ue } from "./index-De5ctwPQ.js";
import { B as Badge } from "./badge-W0ZOSlWS.js";
import { m as motion } from "./motion-DXodcWnX.js";
import { S as Skeleton } from "./skeleton-DBZTzHkA.js";
import "./index-_B4ftgzD.js";
import "./backend-CD8jDaiY.js";
var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog$1.displayName = DIALOG_NAME;
var TRIGGER_NAME$1 = "DialogTrigger";
var DialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME$1, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME$1;
var PORTAL_NAME$1 = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME$1, {
  forceMount: void 0
});
var DialogPortal$1 = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME$1, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal$1.displayName = PORTAL_NAME$1;
var OVERLAY_NAME$1 = "DialogOverlay";
var DialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME$1, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME$1, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay$1.displayName = OVERLAY_NAME$1;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME$1, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME$1 = "DialogContent";
var DialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent$1.displayName = CONTENT_NAME$1;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME$1, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning$1, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME$1 = "DialogTitle";
var DialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME$1, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle$1.displayName = TITLE_NAME$1;
var DESCRIPTION_NAME$1 = "DialogDescription";
var DialogDescription$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME$1, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription$1.displayName = DESCRIPTION_NAME$1;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME$1,
  titleName: TITLE_NAME$1,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning$1 = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    var _a;
    const describedById = (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog$1;
var Trigger = DialogTrigger;
var Portal = DialogPortal$1;
var Overlay = DialogOverlay$1;
var Content = DialogContent$1;
var Title = DialogTitle$1;
var Description = DialogDescription$1;
var Close = DialogClose;
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
const TEMPLATES = [
  {
    type: TemplateType.blank,
    label: "Blank",
    description: "Start from scratch — video editing canvas.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutTemplate, { className: "w-6 h-6" }),
    accentClass: "text-muted-foreground",
    activeBg: "oklch(0.16 0.005 240 / 0.5)",
    activeRing: "oklch(0.35 0.005 240)",
    hoverBorder: "oklch(0.35 0.005 240)",
    glowColor: "oklch(0.35 0.005 240 / 0.15)"
  },
  {
    type: TemplateType.thumbnail,
    label: "Thumbnail",
    description: "Optimized for YouTube & social thumbnails.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-6 h-6" }),
    accentClass: "text-accent",
    activeBg: "oklch(0.14 0.06 142 / 0.45)",
    activeRing: "oklch(0.65 0.17 150)",
    hoverBorder: "oklch(0.65 0.17 150 / 0.7)",
    glowColor: "oklch(0.82 0.29 142 / 0.18)"
  },
  {
    type: TemplateType.ad,
    label: "Ad Preset",
    description: "Pre-sized for ads across major platforms.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-6 h-6" }),
    accentClass: "text-primary",
    activeBg: "oklch(0.14 0.07 270 / 0.45)",
    activeRing: "oklch(0.38 0.15 270)",
    hoverBorder: "oklch(0.38 0.15 270 / 0.7)",
    glowColor: "oklch(0.38 0.15 270 / 0.2)"
  }
];
function CreateProjectModal({
  open,
  onClose,
  onCreated
}) {
  const [name, setName] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(TemplateType.blank);
  const createProject = useCreateProject();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    try {
      const project = await createProject.mutateAsync({
        name: trimmed,
        templateType: selected
      });
      ue.success("Project created!", { description: trimmed });
      setName("");
      setSelected(TemplateType.blank);
      onClose();
      if (onCreated) onCreated(project);
    } catch {
      ue.error("Failed to create project. Please try again.");
    }
  };
  const handleClose = () => {
    if (!createProject.isPending) {
      setName("");
      setSelected(TemplateType.blank);
      onClose();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-lg border",
      style: {
        background: "oklch(0.11 0.006 240)",
        borderColor: "oklch(0.22 0.006 240)",
        boxShadow: "0 0 60px oklch(0 0 0 / 0.65), 0 0 0 1px oklch(0.22 0.006 240)"
      },
      "data-ocid": "create-project-modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DialogTitle,
            {
              className: "font-display text-xl",
              style: { color: "oklch(0.98 0 0)" },
              children: "New Project"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "font-body text-muted-foreground", children: "Name your project and choose a starting template." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "project-name",
                className: "font-display text-xs uppercase tracking-widest text-muted-foreground",
                children: "Project Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "project-name",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "My Awesome Project",
                className: "bg-input border-border focus:border-primary focus-visible:ring-0\n                focus:shadow-[0_0_12px_oklch(0.38_0.15_270_/_0.3)] font-body transition-all duration-200",
                "data-ocid": "project-name-input",
                autoFocus: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-display text-xs uppercase tracking-widest text-muted-foreground", children: "Template" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: TEMPLATES.map((tpl) => {
              const isActive = selected === tpl.type;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setSelected(tpl.type),
                  "data-ocid": `template-${tpl.type}`,
                  "aria-pressed": isActive,
                  className: "relative rounded-xl border p-3 text-left cursor-pointer transition-all duration-200",
                  style: {
                    background: isActive ? tpl.activeBg : "oklch(0.09 0.005 240)",
                    borderColor: isActive ? tpl.activeRing : "oklch(0.22 0.005 240)",
                    boxShadow: isActive ? `0 0 16px ${tpl.glowColor}` : "none",
                    outline: isActive ? `1px solid ${tpl.activeRing}` : "none"
                  },
                  onMouseEnter: (e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = tpl.hoverBorder;
                      e.currentTarget.style.boxShadow = `0 0 12px ${tpl.glowColor}`;
                    }
                  },
                  onMouseLeave: (e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "oklch(0.22 0.005 240)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block mb-2 ${tpl.accentClass}`, children: tpl.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "block font-display text-xs font-semibold leading-tight",
                        style: { color: "oklch(0.96 0 0)" },
                        children: tpl.label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "block font-body text-[10px] mt-1 leading-tight",
                        style: { color: "oklch(0.55 0.005 240)" },
                        children: tpl.description
                      }
                    ),
                    isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "absolute top-2 right-2 w-1.5 h-1.5 rounded-full",
                        style: {
                          background: tpl.activeRing,
                          boxShadow: `0 0 6px ${tpl.activeRing}`
                        }
                      }
                    )
                  ]
                },
                tpl.type
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                onClick: handleClose,
                disabled: createProject.isPending,
                className: "font-body text-muted-foreground hover:text-foreground",
                "data-ocid": "cancel-create-btn",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: !name.trim() || createProject.isPending,
                className: "font-display font-semibold transition-all duration-200",
                style: {
                  background: "linear-gradient(135deg, oklch(0.38 0.15 270) 0%, oklch(0.65 0.17 150) 100%)",
                  color: "oklch(0.98 0 0)",
                  border: "none",
                  boxShadow: name.trim() ? "0 0 16px oklch(0.38 0.15 270 / 0.4)" : "none"
                },
                "data-ocid": "submit-create-btn",
                children: createProject.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  " Creating…"
                ] }) : "Create Project"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function formatDate(ts) {
  const date = new Date(Number(ts / 1000000n));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
const TEMPLATE_META = {
  [TemplateType.blank]: {
    label: "Video",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutTemplate, { className: "w-3.5 h-3.5" }),
    badgeStyle: {
      background: "oklch(0.18 0.004 240 / 0.8)",
      border: "1px solid oklch(0.28 0.005 240)",
      color: "oklch(0.72 0.005 240)"
    },
    previewBg: "linear-gradient(135deg, oklch(0.16 0.005 240) 0%, oklch(0.12 0.004 240) 100%)",
    iconColor: "oklch(0.38 0.005 240)",
    editorRoute: "/editor/$projectId"
  },
  [TemplateType.thumbnail]: {
    label: "Thumbnail",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3.5 h-3.5" }),
    badgeStyle: {
      background: "oklch(0.16 0.06 142 / 0.7)",
      border: "1px solid oklch(0.65 0.17 150 / 0.4)",
      color: "oklch(0.82 0.17 142)"
    },
    previewBg: "linear-gradient(135deg, oklch(0.15 0.05 142) 0%, oklch(0.11 0.03 150) 100%)",
    iconColor: "oklch(0.65 0.17 150)",
    editorRoute: "/editor/$projectId/canvas"
  },
  [TemplateType.ad]: {
    label: "Ad Creative",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3.5 h-3.5" }),
    badgeStyle: {
      background: "oklch(0.16 0.07 270 / 0.7)",
      border: "1px solid oklch(0.38 0.15 270 / 0.5)",
      color: "oklch(0.62 0.14 270)"
    },
    previewBg: "linear-gradient(135deg, oklch(0.15 0.06 270) 0%, oklch(0.11 0.04 270) 100%)",
    iconColor: "oklch(0.45 0.14 270)",
    editorRoute: "/editor/$projectId/canvas"
  }
};
function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();
  const meta = TEMPLATE_META[project.templateType];
  const handleOpen = () => {
    navigate({
      to: meta.editorRoute,
      params: { projectId: project.id }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      whileHover: { y: -4, scale: 1.015 },
      transition: { duration: 0.22, ease: "easeOut" },
      className: "group relative rounded-2xl overflow-hidden cursor-pointer",
      style: {
        background: "oklch(0.12 0.006 240 / 0.9)",
        border: "1px solid oklch(0.22 0.006 240 / 0.6)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 4px 24px oklch(0 0 0 / 0.25)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease"
      },
      "data-ocid": "project-card",
      onClick: handleOpen,
      onMouseEnter: (e) => {
        const el = e.currentTarget;
        el.style.borderColor = "oklch(0.38 0.15 270 / 0.55)";
        el.style.boxShadow = "0 8px 40px oklch(0.38 0.15 270 / 0.18), 0 0 0 1px oklch(0.38 0.15 270 / 0.2)";
      },
      onMouseLeave: (e) => {
        const el = e.currentTarget;
        el.style.borderColor = "oklch(0.22 0.006 240 / 0.6)";
        el.style.boxShadow = "0 4px 24px oklch(0 0 0 / 0.25)";
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative h-40 flex items-center justify-center overflow-hidden",
            style: { background: meta.previewBg },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "opacity-[0.12] group-hover:opacity-[0.2] transition-opacity duration-400",
                  style: { color: meta.iconColor },
                  children: [
                    project.templateType === TemplateType.blank && /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutTemplate, { className: "w-20 h-20" }),
                    project.templateType === TemplateType.thumbnail && /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-20 h-20" }),
                    project.templateType === TemplateType.ad && /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-20 h-20" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500",
                  style: {
                    background: "repeating-linear-gradient(0deg,transparent,transparent 2px,oklch(0.82 0.29 142 / 0.025) 2px,oklch(0.82 0.29 142 / 0.025) 4px)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  style: {
                    background: "linear-gradient(90deg, oklch(0.38 0.15 270) 0%, oklch(0.65 0.17 150) 50%, transparent 100%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-250",
                  style: { background: "oklch(0.05 0 0 / 0.6)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        className: "h-8 font-display text-xs font-semibold gap-1.5 transition-all duration-200",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.38 0.15 270) 0%, oklch(0.65 0.17 150) 100%)",
                          color: "oklch(0.98 0 0)",
                          border: "none",
                          boxShadow: "0 0 14px oklch(0.38 0.15 270 / 0.5)"
                        },
                        "data-ocid": "project-open-btn",
                        onClick: (e) => {
                          e.stopPropagation();
                          handleOpen();
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3 h-3" }),
                          " Open"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        className: "h-8 w-8 p-0 rounded-lg transition-all duration-200",
                        style: {
                          background: "oklch(0.52 0.22 25 / 0.15)",
                          border: "1px solid oklch(0.52 0.22 25 / 0.35)",
                          color: "oklch(0.7 0.18 25)"
                        },
                        "data-ocid": "project-delete-btn",
                        onClick: (e) => {
                          e.stopPropagation();
                          onDelete(project);
                        },
                        "aria-label": "Delete project",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-display text-sm font-bold leading-tight truncate min-w-0",
                style: { color: "oklch(0.96 0 0)" },
                children: project.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: "shrink-0 text-[11px] flex items-center gap-1 font-body font-medium px-2 py-0.5 rounded-full border-0",
                style: meta.badgeStyle,
                children: [
                  meta.icon,
                  meta.label
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5",
              style: { color: "oklch(0.55 0.006 240)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-body truncate", children: [
                  "Modified ",
                  formatDate(project.updatedAt)
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between pt-1",
              style: { borderTop: "1px solid oklch(0.2 0.005 240 / 0.5)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-[11px] font-body",
                    style: { color: "oklch(0.42 0.005 240)" },
                    children: [
                      "Created ",
                      formatDate(project.createdAt)
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-1.5 h-1.5 rounded-full",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.38 0.15 270), oklch(0.65 0.17 150))"
                    }
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
function ProjectSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "oklch(0.12 0.006 240 / 0.9)",
        border: "1px solid oklch(0.22 0.006 240 / 0.5)",
        backdropFilter: "blur(16px)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-none bg-muted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3 bg-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3 bg-muted/70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2 bg-muted/50" })
        ] })
      ]
    }
  );
}
function editorPath(project) {
  const isCanvas = project.templateType === TemplateType.thumbnail || project.templateType === TemplateType.ad;
  return isCanvas ? { to: "/editor/$projectId/canvas", params: { projectId: project.id } } : { to: "/editor/$projectId", params: { projectId: project.id } };
}
function DashboardPage() {
  const { data: projects, isLoading, isError, refetch } = useProjects();
  const deleteProject = useDeleteProject();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [pendingDelete, setPendingDelete] = reactExports.useState(null);
  const handleCreated = (project) => {
    const path = editorPath(project);
    navigate({ to: path.to, params: path.params });
  };
  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteProject.mutateAsync(pendingDelete.id);
      ue.success("Project deleted", { description: pendingDelete.name });
    } catch {
      ue.error("Failed to delete project.");
    } finally {
      setPendingDelete(null);
    }
  };
  const projectCount = (projects == null ? void 0 : projects.length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: { background: "oklch(0.087 0.008 240)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "fixed inset-0 pointer-events-none overflow-hidden",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.04]",
                  style: {
                    background: "radial-gradient(circle, oklch(0.38 0.15 270) 0%, transparent 70%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.03]",
                  style: {
                    background: "radial-gradient(circle, oklch(0.65 0.17 150) 0%, transparent 70%)"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "sticky top-0 z-20",
            style: {
              background: "oklch(0.10 0.007 240 / 0.92)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid oklch(0.22 0.006 240 / 0.6)",
              boxShadow: "0 4px 24px oklch(0 0 0 / 0.3)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "font-display text-2xl font-bold tracking-tight",
                    style: { color: "oklch(0.98 0 0)" },
                    children: "My Projects"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm font-body mt-0.5",
                    style: { color: "oklch(0.62 0.006 240)" },
                    children: isLoading ? "Loading your workspace…" : isError ? "Could not load projects" : projectCount > 0 ? `${projectCount} project${projectCount !== 1 ? "s" : ""} in your workspace` : "Start building something remarkable"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => setShowCreate(true),
                  className: "font-display font-semibold gap-2 shrink-0 transition-all duration-300",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.38 0.15 270) 0%, oklch(0.65 0.17 150) 100%)",
                    color: "oklch(0.98 0 0)",
                    border: "none",
                    boxShadow: "0 0 20px oklch(0.38 0.15 270 / 0.35), 0 4px 12px oklch(0 0 0 / 0.3)"
                  },
                  "data-ocid": "create-project-trigger",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                    "Create Project"
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8 relative", children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5",
              "data-ocid": "projects-loading",
              children: ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectSkeleton, {}, id))
            }
          ),
          !isLoading && isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4 },
              className: "flex flex-col items-center justify-center py-32 text-center",
              "data-ocid": "error-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-20 h-20 rounded-2xl flex items-center justify-center mb-6",
                    style: {
                      background: "oklch(0.14 0.05 25 / 0.3)",
                      border: "1px solid oklch(0.52 0.22 25 / 0.35)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TriangleAlert,
                      {
                        className: "w-9 h-9",
                        style: { color: "oklch(0.7 0.2 25)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-display text-xl font-bold mb-2",
                    style: { color: "oklch(0.98 0 0)" },
                    children: "Failed to load projects"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-body text-sm mb-8 max-w-xs",
                    style: { color: "oklch(0.62 0.006 240)" },
                    children: "There was an error connecting to the backend. Please try again."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => refetch(),
                    variant: "outline",
                    className: "font-display font-semibold gap-2 transition-all duration-200",
                    style: {
                      border: "1px solid oklch(0.28 0.006 240)",
                      color: "oklch(0.78 0.006 240)",
                      background: "transparent"
                    },
                    "data-ocid": "retry-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                      " Retry"
                    ]
                  }
                )
              ]
            }
          ),
          !isLoading && !isError && projectCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, ease: "easeOut" },
                className: "flex flex-col items-center justify-center py-20 text-center",
                "data-ocid": "empty-state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-28 h-28 rounded-3xl flex items-center justify-center",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.14 0.04 270 / 0.6) 0%, oklch(0.12 0.03 150 / 0.4) 100%)",
                          border: "1px solid oklch(0.28 0.08 270 / 0.4)",
                          boxShadow: "0 0 40px oklch(0.38 0.15 270 / 0.12), inset 0 1px 0 oklch(0.98 0 0 / 0.05)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          FolderPlus,
                          {
                            className: "w-12 h-12",
                            style: { color: "oklch(0.55 0.14 270)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        animate: { scale: [1, 1.15, 1] },
                        transition: {
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut"
                        },
                        className: "absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.82 0.17 142) 0%, oklch(0.65 0.17 150) 100%)",
                          boxShadow: "0 0 14px oklch(0.82 0.29 142 / 0.6)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Sparkles,
                          {
                            className: "w-3.5 h-3.5",
                            style: { color: "oklch(0.08 0 0)" }
                          }
                        )
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-display text-2xl font-bold mb-3",
                      style: { color: "oklch(0.98 0 0)" },
                      children: "No projects yet"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-body max-w-sm mb-10 leading-relaxed",
                      style: { color: "oklch(0.62 0.006 240)" },
                      children: "Create your first project to get started — build stunning thumbnails, design high-converting ads, or edit your next viral video."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: () => setShowCreate(true),
                      size: "lg",
                      className: "font-display font-semibold gap-2 h-12 px-8 text-base transition-all duration-300 hover:scale-[1.03]",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.38 0.15 270) 0%, oklch(0.65 0.17 150) 100%)",
                        color: "oklch(0.98 0 0)",
                        border: "none",
                        boxShadow: "0 0 28px oklch(0.38 0.15 270 / 0.4), 0 8px 20px oklch(0 0 0 / 0.3)"
                      },
                      "data-ocid": "empty-create-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }),
                        "Create your first project"
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 32 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.2, ease: "easeOut" },
                className: "mt-4",
                "data-ocid": "demo-projects-section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-px flex-1",
                        style: { background: "oklch(0.22 0.006 240 / 0.5)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Sparkles,
                        {
                          className: "w-3.5 h-3.5",
                          style: { color: "oklch(0.65 0.17 150)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-display text-sm font-semibold",
                          style: { color: "oklch(0.62 0.006 240)" },
                          children: "Example Projects"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-px flex-1",
                        style: { background: "oklch(0.22 0.006 240 / 0.5)" }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-body mb-5 text-center",
                      style: { color: "oklch(0.48 0.005 240)" },
                      children: "Here's what your projects could look like. Create yours to get started."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5",
                      "data-ocid": "demo-projects-grid",
                      children: SAMPLE_PROJECTS.map((demo, i) => {
                        const bg = DEMO_PREVIEW_GRADIENTS[demo.templateType];
                        const typeLabel = demo.templateType === "thumbnail" ? "Thumbnail" : demo.templateType === "ad" ? "Ad Creative" : "Video";
                        const TypeIcon = demo.templateType === "thumbnail" ? Image : demo.templateType === "ad" ? Film : LayoutTemplate;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            initial: { opacity: 0, y: 20 },
                            animate: { opacity: 1, y: 0 },
                            transition: {
                              delay: 0.3 + i * 0.06,
                              duration: 0.35,
                              ease: "easeOut"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "button",
                              {
                                type: "button",
                                onClick: () => navigate({
                                  to: "/editor/$projectId/canvas",
                                  params: { projectId: demo.id },
                                  search: { demo: "true" }
                                }),
                                className: "group relative w-full rounded-2xl overflow-hidden cursor-pointer text-left",
                                style: {
                                  background: "oklch(0.12 0.006 240 / 0.9)",
                                  border: "1px solid oklch(0.22 0.006 240 / 0.5)",
                                  backdropFilter: "blur(16px)",
                                  boxShadow: "0 4px 24px oklch(0 0 0 / 0.22)",
                                  opacity: 0.88
                                },
                                "data-ocid": `demo-project-card.${i + 1}`,
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "div",
                                    {
                                      className: "absolute top-3 right-3 z-10 text-[9px] font-bold px-2 py-0.5 rounded-full",
                                      style: {
                                        background: "oklch(0.11 0.006 240 / 0.85)",
                                        border: "1px solid oklch(0.28 0.006 240 / 0.7)",
                                        color: "oklch(0.58 0.006 240)",
                                        fontFamily: "Inter, sans-serif",
                                        backdropFilter: "blur(8px)"
                                      },
                                      children: "Demo"
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "div",
                                    {
                                      className: "relative h-36 flex items-center justify-center overflow-hidden",
                                      style: { background: bg },
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          TypeIcon,
                                          {
                                            className: "w-16 h-16 opacity-20",
                                            style: { color: "white" }
                                          }
                                        ),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "div",
                                          {
                                            className: "absolute inset-0",
                                            style: {
                                              background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.015) 3px,rgba(255,255,255,0.015) 6px)"
                                            }
                                          }
                                        )
                                      ]
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "h3",
                                      {
                                        className: "font-display text-sm font-bold leading-tight truncate min-w-0",
                                        style: { color: "oklch(0.88 0 0)" },
                                        children: demo.name
                                      }
                                    ) }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        TypeIcon,
                                        {
                                          className: "w-3 h-3",
                                          style: { color: "oklch(0.5 0.006 240)" }
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          className: "text-xs font-body",
                                          style: { color: "oklch(0.5 0.006 240)" },
                                          children: typeLabel
                                        }
                                      )
                                    ] }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                      "div",
                                      {
                                        className: "pt-1 flex items-center justify-between",
                                        style: {
                                          borderTop: "1px solid oklch(0.2 0.005 240 / 0.4)"
                                        },
                                        children: [
                                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                                            "span",
                                            {
                                              className: "text-[11px] font-body",
                                              style: { color: "oklch(0.38 0.005 240)" },
                                              children: "Example project"
                                            }
                                          ),
                                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                                            "span",
                                            {
                                              className: "text-[11px] font-display font-semibold",
                                              style: { color: "oklch(0.55 0.12 270)" },
                                              children: "Open →"
                                            }
                                          )
                                        ]
                                      }
                                    )
                                  ] })
                                ]
                              }
                            )
                          },
                          demo.id
                        );
                      })
                    }
                  )
                ]
              }
            )
          ] }),
          !isLoading && !isError && projectCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.3 },
              className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5",
              "data-ocid": "projects-grid",
              children: projects.map((project, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ProjectCard,
                    {
                      project,
                      onDelete: (p) => setPendingDelete(p)
                    }
                  )
                },
                project.id
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CreateProjectModal,
          {
            open: showCreate,
            onClose: () => setShowCreate(false),
            onCreated: handleCreated
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialog,
          {
            open: !!pendingDelete,
            onOpenChange: (v) => !v && setPendingDelete(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              AlertDialogContent,
              {
                className: "border",
                style: {
                  background: "oklch(0.11 0.006 240)",
                  borderColor: "oklch(0.24 0.008 240)",
                  boxShadow: "0 0 60px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.24 0.008 240)"
                },
                "data-ocid": "delete-confirm-dialog",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AlertDialogTitle,
                      {
                        className: "font-display text-lg",
                        style: { color: "oklch(0.98 0 0)" },
                        children: "Delete Project?"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      AlertDialogDescription,
                      {
                        className: "font-body",
                        style: { color: "oklch(0.62 0.006 240)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: "font-semibold",
                              style: { color: "oklch(0.98 0 0)" },
                              children: [
                                '"',
                                pendingDelete == null ? void 0 : pendingDelete.name,
                                '"'
                              ]
                            }
                          ),
                          " ",
                          "will be permanently deleted. This action cannot be undone."
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AlertDialogCancel,
                      {
                        className: "font-body transition-all duration-200",
                        style: {
                          background: "transparent",
                          border: "1px solid oklch(0.26 0.006 240)",
                          color: "oklch(0.78 0.006 240)"
                        },
                        "data-ocid": "delete-cancel-btn",
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AlertDialogAction,
                      {
                        onClick: handleConfirmDelete,
                        disabled: deleteProject.isPending,
                        className: "font-display font-semibold transition-all duration-200",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.52 0.22 25) 0%, oklch(0.44 0.2 20) 100%)",
                          color: "oklch(0.98 0 0)",
                          border: "none",
                          boxShadow: "0 0 16px oklch(0.52 0.22 25 / 0.4)"
                        },
                        "data-ocid": "delete-confirm-btn",
                        children: deleteProject.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                          " Deleting…"
                        ] }) : "Delete Project"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
export {
  DashboardPage
};
