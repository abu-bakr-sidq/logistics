"use client";

import {
  createElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export enum Tag {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  P = "p",
}

type VaporizeTextCycleProps = {
  texts: string[];
  font?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
  };
  color?: string;
  spread?: number;
  density?: number;
  animation?: {
    vaporizeDuration?: number;
    fadeInDuration?: number;
    waitDuration?: number;
  };
  direction?: "left-to-right" | "right-to-left";
  alignment?: "left" | "center" | "right";
  tag?: Tag;
};

type Particle = {
  startX: number;
  startY: number;
  x: number;
  y: number;
  alpha: number;
  delay: number;
};

type TextLayout = {
  text: string;
  font: string;
  color: string;
  textX: number;
  textY: number;
  align: CanvasTextAlign;
};

function parseColor(color: string) {
  const rgbaMatch = color.match(
    /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/,
  );
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);

  if (rgbaMatch) {
    const [, r, g, b, a] = rgbaMatch;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }

  return "rgba(2, 6, 23, 1)";
}

function rgbaWithAlpha(color: string, alpha: number) {
  return color.replace(/[\d.]+\)$/, `${alpha})`);
}

function easeOutExpo(value: number) {
  return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);
}

function useRevealTrigger(ref: React.RefObject<HTMLElement | null>) {
  const [trigger, setTrigger] = useState(0);
  const wasVisibleRef = useRef(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisibleRef.current) {
          setTrigger((current) => current + 1);
        }

        wasVisibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "0px", threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return trigger;
}

const SeoElement = memo(function SeoElement({
  tag = Tag.P,
  text,
}: {
  tag?: Tag;
  text: string;
}) {
  const style = useMemo(
    () => ({
      position: "absolute" as const,
      width: 0,
      height: 0,
      overflow: "hidden",
      userSelect: "none" as const,
      pointerEvents: "none" as const,
    }),
    [],
  );

  const safeTag = Object.values(Tag).includes(tag) ? tag : Tag.P;

  return createElement(safeTag, { style }, text);
});

function drawSolidText(ctx: CanvasRenderingContext2D, layout: TextLayout) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.font = layout.font;
  ctx.fillStyle = layout.color;
  ctx.textAlign = layout.align;
  ctx.textBaseline = "middle";
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.fillText(layout.text, layout.textX, layout.textY);
}

function buildParticles({
  ctx,
  layout,
  density,
  spread,
}: {
  ctx: CanvasRenderingContext2D;
  layout: TextLayout;
  density: number;
  spread: number;
}) {
  const canvas = ctx.canvas;
  const particles: Particle[] = [];

  drawSolidText(ctx, layout);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const sampleRate = Math.max(1, Math.round(4 - Math.min(density, 8) * 0.32));
  const textCenterX = canvas.width / 2;

  for (let y = 0; y < canvas.height; y += sampleRate) {
    for (let x = 0; x < canvas.width; x += sampleRate) {
      const index = (y * canvas.width + x) * 4;
      const alpha = data[index + 3] / 255;

      if (alpha < 0.18) {
        continue;
      }

      const angle = Math.random() * Math.PI * 2;
      const distance = 18 + Math.random() * spread * 15;
      const startX = x + Math.cos(angle) * distance;
      const startY = y + Math.sin(angle) * distance;
      const horizontalDelay = Math.abs(x - textCenterX) / canvas.width;

      particles.push({
        startX,
        startY,
        x,
        y,
        alpha,
        delay: horizontalDelay * 0.18 + Math.random() * 0.12,
      });
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  return particles;
}

function drawParticles({
  ctx,
  particles,
  color,
  progress,
  dpr,
}: {
  ctx: CanvasRenderingContext2D;
  particles: Particle[];
  color: string;
  progress: number;
  dpr: number;
}) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.save();
  ctx.scale(dpr, dpr);
  const particleFadeOut = 1 - Math.max(0, Math.min(1, (progress - 0.48) / 0.52));

  particles.forEach((particle) => {
    const localProgress = Math.min(
      1,
      Math.max(0, (progress - particle.delay) / (1 - particle.delay)),
    );
    const eased = easeOutExpo(localProgress);
    const x = particle.startX + (particle.x - particle.startX) * eased;
    const y = particle.startY + (particle.y - particle.startY) * eased;
    const alpha = particle.alpha * eased * particleFadeOut;

    if (alpha <= 0.01) {
      return;
    }

    ctx.fillStyle = rgbaWithAlpha(color, alpha);
    ctx.fillRect(x / dpr, y / dpr, Math.max(1, 1.15 / dpr), Math.max(1, 1.15 / dpr));
  });

  ctx.restore();
}

export default function VaporizeTextCycle({
  texts,
  font = {
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "46px",
    fontWeight: 600,
  },
  color = "rgb(2, 6, 23)",
  spread = 3,
  density = 6,
  animation = {
    vaporizeDuration: 1.05,
    fadeInDuration: 0.5,
  },
  alignment = "center",
  tag = Tag.H2,
}: VaporizeTextCycleProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const layoutRef = useRef<TextLayout | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const revealTrigger = useRevealTrigger(wrapperRef);
  const text = texts[0] ?? "";
  const duration =
    ((animation.vaporizeDuration ?? 1.05) + (animation.fadeInDuration ?? 0.5)) *
    1000;
  const visibleTextStyle = useMemo<CSSProperties>(
    () => ({
      color,
      fontFamily: font.fontFamily,
      fontSize: `clamp(28px, 4vw, ${font.fontSize ?? "46px"})`,
      fontWeight: font.fontWeight ?? 600,
      lineHeight: 1.12,
      letterSpacing: "0",
      textAlign: alignment,
      animation:
        revealTrigger > 0
          ? `affhan-solid-text-settle ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) both`
          : "none",
    }),
    [
      alignment,
      color,
      duration,
      font.fontFamily,
      font.fontSize,
      font.fontWeight,
      revealTrigger,
    ],
  );

  const prepareCanvas = useCallback(
    (shouldBuildParticles: boolean) => {
      const canvas = canvasRef.current;

      if (!canvas || !size.width || !size.height) {
        return;
      }

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return;
      }

      const dpr =
        typeof window !== "undefined"
          ? Math.min(window.devicePixelRatio || 1, 2)
          : 1;
      const configuredSize = Number.parseInt(font.fontSize ?? "46", 10);
      const baseFont = `${font.fontWeight ?? 600} ${configuredSize * dpr}px ${
        font.fontFamily ?? "Inter, Arial, sans-serif"
      }`;

      canvas.style.width = `${size.width}px`;
      canvas.style.height = `${size.height}px`;
      canvas.width = Math.floor(size.width * dpr);
      canvas.height = Math.floor(size.height * dpr);

      ctx.font = baseFont;
      const measuredWidth = ctx.measureText(text).width / dpr;
      const fitScale = Math.min(1, (size.width * 0.96) / measuredWidth);
      const finalFontSize = Math.max(24, configuredSize * fitScale);
      const layout: TextLayout = {
        text,
        color: parseColor(color),
        font: `${font.fontWeight ?? 600} ${finalFontSize * dpr}px ${
          font.fontFamily ?? "Inter, Arial, sans-serif"
        }`,
        textX:
          alignment === "center"
            ? canvas.width / 2
            : alignment === "right"
              ? canvas.width
              : 0,
        textY: canvas.height / 2,
        align: alignment,
      };

      layoutRef.current = layout;

      if (shouldBuildParticles) {
        particlesRef.current = buildParticles({
          ctx,
          layout,
          density,
          spread,
        });
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    [
      alignment,
      color,
      density,
      font.fontFamily,
      font.fontSize,
      font.fontWeight,
      size.height,
      size.width,
      spread,
      text,
    ],
  );

  useEffect(() => {
    const element = wrapperRef.current;

    if (!element) {
      return;
    }

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    const resizeObserver = new ResizeObserver(updateSize);
    const frameId = requestAnimationFrame(updateSize);

    resizeObserver.observe(element);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    prepareCanvas(false);
  }, [prepareCanvas]);

  useEffect(() => {
    if (revealTrigger === 0 || !size.width || !size.height) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    prepareCanvas(true);

    const layout = layoutRef.current;
    const particles = particlesRef.current;
    const dpr =
      typeof window !== "undefined"
        ? Math.min(window.devicePixelRatio || 1, 2)
        : 1;

    if (!layout || !particles.length) {
      return;
    }

    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min(1, (time - startTime) / duration);

      drawParticles({
        ctx,
        particles,
        color: layout.color,
        progress,
        dpr,
      });

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, prepareCanvas, revealTrigger, size.height, size.width]);

  return (
    <div
      ref={wrapperRef}
      className="relative flex h-full w-full items-center justify-center overflow-visible"
    >
      <canvas
        className="absolute inset-0 block h-full w-full"
        ref={canvasRef}
      />
      {createElement(
        tag,
        {
          key: `solid-${revealTrigger}`,
          className: "relative z-10 max-w-full whitespace-normal",
          style: visibleTextStyle,
        },
        text,
      )}
      <SeoElement tag={tag} text={text} />
    </div>
  );
}
