import { useAdCreatorStore } from "@/store/adCreatorStore";
import { Palette, Plus, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

export function BrandHubTab() {
  const { brand, setBrand } = useAdCreatorStore();
  const logoRef = useRef<HTMLInputElement>(null);

  function handleLogoUpload(files: FileList | null) {
    if (!files?.[0]) return;
    const url = URL.createObjectURL(files[0]);
    setBrand({ logoUrl: url });
  }

  function addColor() {
    const input = document.createElement("input");
    input.type = "color";
    input.value = "#2563eb";
    input.click();
    input.addEventListener("change", () => {
      setBrand({ colors: [...brand.colors, input.value] });
    });
  }

  function removeColor(idx: number) {
    setBrand({ colors: brand.colors.filter((_, i) => i !== idx) });
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-full pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
      {/* Logo */}
      <section>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
          Logo
        </p>
        <button
          type="button"
          className="h-20 w-full rounded-xl border border-dashed border-white/20 hover:border-blue-500/40 flex items-center justify-center cursor-pointer transition-colors relative overflow-hidden"
          onClick={() => logoRef.current?.click()}
        >
          {brand.logoUrl ? (
            <img
              src={brand.logoUrl}
              alt="Brand logo"
              className="max-h-16 max-w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Upload className="w-5 h-5 text-muted-foreground" />
              <p className="text-[10px] text-muted-foreground">Upload Logo</p>
            </div>
          )}
          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleLogoUpload(e.target.files)}
          />
        </button>
      </section>

      {/* Colors */}
      <section>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
          Brand Colors
        </p>
        <div className="flex flex-wrap gap-2">
          {brand.colors.map((c, i) => (
            <motion.button
              key={c}
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={c}
              onClick={() => removeColor(i)}
              className="w-8 h-8 rounded-full border-2 border-white/20 hover:border-white/50 transition-all relative group"
              style={{ background: c }}
            />
          ))}
          <motion.button
            type="button"
            aria-label="Add color"
            whileHover={{ scale: 1.1 }}
            onClick={addColor}
            className="w-8 h-8 rounded-full border-2 border-dashed border-white/30 hover:border-blue-500/60 flex items-center justify-center transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-muted-foreground" />
          </motion.button>
        </div>
      </section>

      {/* Fonts */}
      <section>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
          Brand Fonts
        </p>
        <div className="flex flex-col gap-1.5">
          {brand.fonts.map((f, i) => (
            <div
              key={f}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/10"
            >
              <span
                className="text-xs text-foreground"
                style={{ fontFamily: f }}
              >
                {f}
              </span>
              <span className="text-[9px] text-muted-foreground">
                {i === 0 ? "Display" : "Body"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Apply */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
      >
        <Palette className="w-3.5 h-3.5" />
        Apply Brand Kit
      </motion.button>

      {/* Consistency Toggle */}
      <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
        <div>
          <p className="text-xs font-medium text-foreground">
            Brand Consistency
          </p>
          <p className="text-[10px] text-muted-foreground">
            Auto-apply to new elements
          </p>
        </div>
        <div className="w-9 h-5 bg-blue-500/20 border border-blue-500/40 rounded-full relative cursor-pointer">
          <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-blue-400 rounded-full" />
        </div>
      </div>
    </div>
  );
}
