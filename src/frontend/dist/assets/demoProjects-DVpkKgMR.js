var TemplateType = /* @__PURE__ */ ((TemplateType2) => {
  TemplateType2["ad"] = "ad";
  TemplateType2["thumbnail"] = "thumbnail";
  TemplateType2["blank"] = "blank";
  return TemplateType2;
})(TemplateType || {});
const DEMO_LAYER_COMPOSITIONS = [
  [
    {
      id: "dl-1",
      name: "Background",
      type: "rect",
      visible: true,
      locked: true,
      color: "#101820"
    },
    {
      id: "dl-2",
      name: "Gradient Overlay",
      type: "rect",
      visible: true,
      locked: false,
      color: "#0047ab"
    },
    {
      id: "dl-3",
      name: "Brand Accent Bar",
      type: "rect",
      visible: true,
      locked: false,
      color: "#50c878"
    },
    {
      id: "dl-4",
      name: "Hero Image",
      type: "image",
      visible: true,
      locked: false,
      color: "#334155"
    },
    {
      id: "dl-5",
      name: "Photo Frame",
      type: "rect",
      visible: true,
      locked: false,
      color: "#1e293b"
    },
    {
      id: "dl-6",
      name: "Glow Circle",
      type: "circle",
      visible: true,
      locked: false,
      color: "#50c878"
    },
    {
      id: "dl-7",
      name: "Hero Title",
      type: "text",
      visible: true,
      locked: false,
      color: "#a78bfa"
    },
    {
      id: "dl-8",
      name: "Subtitle",
      type: "text",
      visible: true,
      locked: false,
      color: "#a78bfa"
    },
    {
      id: "dl-9",
      name: "Badge",
      type: "rect",
      visible: true,
      locked: false,
      color: "#00ff00"
    },
    {
      id: "dl-10",
      name: "Badge Label",
      type: "text",
      visible: true,
      locked: false,
      color: "#a78bfa"
    },
    {
      id: "dl-11",
      name: "CTA Button",
      type: "rect",
      visible: true,
      locked: false,
      color: "#0047ab"
    },
    {
      id: "dl-12",
      name: "CTA Text",
      type: "text",
      visible: true,
      locked: false,
      color: "#a78bfa"
    }
  ],
  [
    {
      id: "dl2-1",
      name: "Background",
      type: "rect",
      visible: true,
      locked: true,
      color: "#101820"
    },
    {
      id: "dl2-2",
      name: "Top Bar",
      type: "rect",
      visible: true,
      locked: false,
      color: "#0047ab"
    },
    {
      id: "dl2-3",
      name: "Accent Shape Left",
      type: "circle",
      visible: true,
      locked: false,
      color: "#50c878"
    },
    {
      id: "dl2-4",
      name: "Accent Shape Right",
      type: "circle",
      visible: true,
      locked: false,
      color: "#0047ab"
    },
    {
      id: "dl2-5",
      name: "Category Badge",
      type: "rect",
      visible: true,
      locked: false,
      color: "#7c4d00"
    },
    {
      id: "dl2-6",
      name: "Category Text",
      type: "text",
      visible: true,
      locked: false,
      color: "#a78bfa"
    },
    {
      id: "dl2-7",
      name: "Article Title",
      type: "text",
      visible: true,
      locked: false,
      color: "#a78bfa"
    },
    {
      id: "dl2-8",
      name: "Author Name",
      type: "text",
      visible: true,
      locked: false,
      color: "#a78bfa"
    },
    {
      id: "dl2-9",
      name: "Publish Date",
      type: "text",
      visible: true,
      locked: false,
      color: "#a78bfa"
    },
    {
      id: "dl2-10",
      name: "Bottom Bar",
      type: "rect",
      visible: true,
      locked: false,
      color: "#50c878"
    }
  ],
  [
    {
      id: "dl3-1",
      name: "Background",
      type: "rect",
      visible: true,
      locked: true,
      color: "#101820"
    },
    {
      id: "dl3-2",
      name: "Side Accent",
      type: "rect",
      visible: true,
      locked: false,
      color: "#0047ab"
    },
    {
      id: "dl3-3",
      name: "Decorative Star",
      type: "image",
      visible: true,
      locked: false,
      color: "#06b6d4"
    },
    {
      id: "dl3-4",
      name: "Profile Photo",
      type: "image",
      visible: true,
      locked: false,
      color: "#06b6d4"
    },
    {
      id: "dl3-5",
      name: "Name",
      type: "text",
      visible: true,
      locked: false,
      color: "#a78bfa"
    },
    {
      id: "dl3-6",
      name: "Role / Title",
      type: "text",
      visible: true,
      locked: false,
      color: "#a78bfa"
    },
    {
      id: "dl3-7",
      name: "Website URL",
      type: "text",
      visible: true,
      locked: false,
      color: "#a78bfa"
    },
    {
      id: "dl3-8",
      name: "Divider Line",
      type: "rect",
      visible: true,
      locked: false,
      color: "#50c878"
    }
  ]
];
function isoToBigintNs(iso) {
  return BigInt(new Date(iso).getTime()) * 1000000n;
}
const SAMPLE_PROJECTS = [
  {
    id: "demo-1",
    name: "YouTube Thumbnail — Gaming Review",
    templateType: TemplateType.thumbnail,
    createdAt: isoToBigintNs("2026-04-01"),
    updatedAt: isoToBigintNs("2026-04-20"),
    isDemoProject: true
  },
  {
    id: "demo-2",
    name: "Instagram Brand Kit",
    templateType: TemplateType.ad,
    createdAt: isoToBigintNs("2026-03-15"),
    updatedAt: isoToBigintNs("2026-04-18"),
    isDemoProject: true
  },
  {
    id: "demo-3",
    name: "TikTok Promo Storyboard",
    templateType: TemplateType.blank,
    createdAt: isoToBigintNs("2026-03-20"),
    updatedAt: isoToBigintNs("2026-04-15"),
    isDemoProject: true
  },
  {
    id: "demo-4",
    name: "Course Launch Banner",
    templateType: TemplateType.thumbnail,
    createdAt: isoToBigintNs("2026-03-25"),
    updatedAt: isoToBigintNs("2026-04-10"),
    isDemoProject: true
  },
  {
    id: "demo-5",
    name: "Twitter Ads Campaign",
    templateType: TemplateType.ad,
    createdAt: isoToBigintNs("2026-02-10"),
    updatedAt: isoToBigintNs("2026-04-05"),
    isDemoProject: true
  },
  {
    id: "demo-6",
    name: "LinkedIn Professional Header",
    templateType: TemplateType.thumbnail,
    createdAt: isoToBigintNs("2026-02-20"),
    updatedAt: isoToBigintNs("2026-03-30"),
    isDemoProject: true
  }
];
const DEMO_PREVIEW_GRADIENTS = {
  [TemplateType.thumbnail]: "linear-gradient(135deg, #0047ab 0%, #50c878 100%)",
  [TemplateType.ad]: "linear-gradient(135deg, #6c5ce7 0%, #fd79a8 100%)",
  [TemplateType.blank]: "linear-gradient(135deg, #ff6b35 0%, #e63946 100%)"
};
export {
  DEMO_PREVIEW_GRADIENTS as D,
  SAMPLE_PROJECTS as S,
  TemplateType as T,
  DEMO_LAYER_COMPOSITIONS as a
};
