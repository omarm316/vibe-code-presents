import { type CSSProperties, type PropsWithChildren, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export const SCENE_WIDTH = 1600;
export const SCENE_HEIGHT = 900;
export const CAMERA_EASE = [0.22, 1, 0.36, 1] as const;

export type CameraTarget = {
  x: number;
  y: number;
  zoom: number;
};

type ViewportSize = {
  width: number;
  height: number;
};

type SceneContainerProps = PropsWithChildren<{
  centerX: number;
  centerY: number;
  localStage: number;
  isActive: boolean;
  isPast: boolean;
  width?: number;
  height?: number;
  className?: string;
}>;

type RevealProps = PropsWithChildren<{
  show: boolean;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  scale?: number;
  blur?: number;
  style?: CSSProperties;
  layout?: boolean;
}>;

type ImagePlaceholderProps = {
  src?: string;
  alt: string;
  label: string;
  caption?: string;
  ratio?: string;
  className?: string;
};

export function getCameraTransform(target: CameraTarget, viewport: ViewportSize) {
  const fitScale = Math.min(viewport.width / SCENE_WIDTH, viewport.height / SCENE_HEIGHT);
  const scale = fitScale * target.zoom;

  return {
    x: viewport.width / 2 - target.x * scale,
    y: viewport.height / 2 - target.y * scale,
    scale
  };
}

export function SceneContainer({
  centerX,
  centerY,
  localStage,
  isActive,
  isPast,
  width = SCENE_WIDTH,
  height = SCENE_HEIGHT,
  className,
  children
}: SceneContainerProps) {
  const isVisible = localStage > 0 || isPast;

  return (
    <motion.section
      className={["scene-shell", className].filter(Boolean).join(" ")}
      style={{
        width,
        height,
        left: centerX - width / 2,
        top: centerY - height / 2
      }}
      animate={{
        opacity: isVisible ? (isActive ? 1 : isPast ? 0.12 : 0) : 0,
        scale: isActive ? 1 : isPast ? 0.988 : 0.96,
        filter: isVisible ? (isActive ? "blur(0px)" : "blur(2px)") : "blur(18px)"
      }}
      transition={{
        duration: 0.6,
        ease: CAMERA_EASE
      }}
    >
      <div className="scene-plate">{children}</div>
    </motion.section>
  );
}

export function Reveal({
  show,
  className,
  delay = 0,
  duration = 0.46,
  x = 0,
  y = 18,
  scale = 0.985,
  blur = 10,
  style,
  layout = false,
  children
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {show ? (
        <motion.div
          className={className}
          style={style}
          layout={layout}
          initial={
            reducedMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  x,
                  y,
                  scale,
                  filter: `blur(${blur}px)`
                }
          }
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)"
          }}
          exit={
            reducedMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  x,
                  y: y * 0.45,
                  scale,
                  filter: `blur(${blur}px)`
                }
          }
          transition={{
            duration,
            delay,
            ease: CAMERA_EASE
          }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function ImagePlaceholder({
  src,
  alt,
  label,
  caption,
  ratio = "4 / 3",
  className
}: ImagePlaceholderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMissing, setIsMissing] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoaded(false);
      setIsMissing(true);
      return;
    }

    let isActive = true;
    const image = new window.Image();

    image.onload = () => {
      if (!isActive) {
        return;
      }

      setIsLoaded(true);
      setIsMissing(false);
    };

    image.onerror = () => {
      if (!isActive) {
        return;
      }

      setIsLoaded(false);
      setIsMissing(true);
    };

    image.src = src;

    return () => {
      isActive = false;
    };
  }, [src]);

  return (
    <div className={["image-placeholder", className].filter(Boolean).join(" ")}>
      <div
        className="image-frame"
        style={{ aspectRatio: ratio }}
      >
        {isLoaded ? (
          <img
            className="image-asset"
            src={src}
            alt={alt}
          />
        ) : (
          <div className="image-fallback">
            <div className="image-fallback-inner">
              <span className="image-fallback-label">{label}</span>
              <span className="image-fallback-path">{src ?? "Asset pending"}</span>
              <span className="image-fallback-note">
                {isMissing ? "Placeholder active until the source image is added." : "Loading image…"}
              </span>
            </div>
          </div>
        )}
      </div>
      {caption ? <div className="image-caption">{caption}</div> : null}
    </div>
  );
}
