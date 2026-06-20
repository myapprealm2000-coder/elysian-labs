// ─── AI Simulator — Realistic mock results with realistic delays ───────────────

function delay(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export interface SimulatedCaption {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  confidence: number;
  speaker?: string;
}

export async function simulateAICaptions(): Promise<SimulatedCaption[]> {
  await delay(4000);
  return [
    {
      id: "cap-1",
      text: "Welcome to Elysian Labs — your creative studio.",
      startTime: 0,
      endTime: 3.2,
      confidence: 0.98,
    },
    {
      id: "cap-2",
      text: "Today we're building something incredible.",
      startTime: 3.4,
      endTime: 6.1,
      confidence: 0.97,
    },
    {
      id: "cap-3",
      text: "Start by uploading your media files to the timeline.",
      startTime: 6.3,
      endTime: 9.8,
      confidence: 0.95,
    },
    {
      id: "cap-4",
      text: "Drag and drop clips to arrange your story.",
      startTime: 10.0,
      endTime: 13.2,
      confidence: 0.99,
    },
    {
      id: "cap-5",
      text: "Apply cinematic filters with a single click.",
      startTime: 13.5,
      endTime: 16.4,
      confidence: 0.96,
    },
    {
      id: "cap-6",
      text: "Add text overlays, stickers, and audio tracks.",
      startTime: 16.6,
      endTime: 19.9,
      confidence: 0.94,
    },
    {
      id: "cap-7",
      text: "Export in 4K at up to 60 frames per second.",
      startTime: 20.1,
      endTime: 23.0,
      confidence: 0.98,
    },
    {
      id: "cap-8",
      text: "Share your masterpiece with the world.",
      startTime: 23.2,
      endTime: 25.8,
      confidence: 0.99,
    },
  ];
}

export interface SimulatedCutout {
  maskQuality: string;
  edgeSmoothness: string;
  confidence: number;
  processingFrames: number;
  backgroundRemoved: boolean;
}

export async function simulateBackgroundRemoval(): Promise<SimulatedCutout> {
  await delay(3000);
  return {
    maskQuality: "ultra",
    edgeSmoothness: "99.2%",
    confidence: 0.992,
    processingFrames: 240,
    backgroundRemoved: true,
  };
}

export interface SimulatedClipTemplate {
  id: string;
  title: string;
  duration: number;
  style: string;
  thumbnail: string;
  transition: string;
}

export async function simulateScriptToVideo(
  _script: string,
): Promise<SimulatedClipTemplate[]> {
  await delay(5000);
  return [
    {
      id: "stv-1",
      title: "Opening Hook",
      duration: 3,
      style: "cinematic",
      thumbnail: "",
      transition: "fade-in",
    },
    {
      id: "stv-2",
      title: "Problem Statement",
      duration: 6,
      style: "documentary",
      thumbnail: "",
      transition: "dissolve",
    },
    {
      id: "stv-3",
      title: "Key Points",
      duration: 8,
      style: "dynamic",
      thumbnail: "",
      transition: "slide-left",
    },
    {
      id: "stv-4",
      title: "Demo / Evidence",
      duration: 10,
      style: "screen-recording",
      thumbnail: "",
      transition: "zoom",
    },
    {
      id: "stv-5",
      title: "CTA",
      duration: 4,
      style: "bold",
      thumbnail: "",
      transition: "flash",
    },
    {
      id: "stv-6",
      title: "Outro",
      duration: 3,
      style: "branded",
      thumbnail: "",
      transition: "fade-out",
    },
  ];
}

export interface SimulatedUpscaleResult {
  quality: string;
  enhancement: string;
  sharpness: string;
  noiseReduction: string;
  originalResolution: string;
  outputResolution: string;
}

export async function simulateUpscale(): Promise<SimulatedUpscaleResult> {
  await delay(4000);
  return {
    quality: "4K",
    enhancement: "400%",
    sharpness: "92%",
    noiseReduction: "78%",
    originalResolution: "720p",
    outputResolution: "3840×2160",
  };
}

export async function simulateHookGenerator(): Promise<string[]> {
  await delay(3000);
  return [
    "You won't believe what happens at 0:47...",
    "This single trick changed everything for creators.",
    "Most people skip this step — don't make that mistake.",
    "Watch the first 3 seconds before you scroll away.",
    "We tried this for 30 days. Here's what happened.",
  ];
}

export interface SimulatedTTSResult {
  waveformData: number[];
  duration: number;
  voice: string;
  wordCount: number;
  sampleRate: number;
}

export async function simulateTextToSpeech(
  text: string,
  voice: string,
): Promise<SimulatedTTSResult> {
  await delay(3000);
  const wordCount = text.trim().split(/\s+/).length;
  const duration = wordCount * 0.4; // ~0.4s per word
  const sampleCount = Math.ceil(duration * 30);
  const waveformData = Array.from(
    { length: sampleCount },
    () => Math.random() * 0.8 + 0.1,
  );
  return {
    waveformData,
    duration,
    voice,
    wordCount,
    sampleRate: 44100,
  };
}
