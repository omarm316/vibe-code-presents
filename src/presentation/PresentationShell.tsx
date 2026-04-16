import { startTransition, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getCameraTransform, SceneContainer } from "./primitives";
import { preludeCamera, timeline, totalPresentationSteps, worldBounds } from "./scenes";

type ViewportState = {
  width: number;
  height: number;
};

function getViewportState(): ViewportState {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

function getInitialStepFromUrl() {
  const stepValue = new URLSearchParams(window.location.search).get("step");

  if (!stepValue) {
    return 0;
  }

  const parsedStep = Number(stepValue);

  if (!Number.isFinite(parsedStep)) {
    return 0;
  }

  return Math.max(0, Math.min(Math.round(parsedStep), totalPresentationSteps));
}

function getCameraTargetForStep(currentStep: number) {
  if (currentStep === 0) {
    return preludeCamera;
  }

  const activeScene = timeline.find((scene) => currentStep >= scene.startStep && currentStep <= scene.endStep);
  return activeScene?.camera(currentStep - activeScene.startStep + 1) ?? preludeCamera;
}

function getTrailPath() {
  return timeline.reduce((path, scene, index) => {
    if (index === 0) {
      return `M ${scene.position.x} ${scene.position.y}`;
    }

    const previous = timeline[index - 1];
    const controlX = (previous.position.x + scene.position.x) / 2;
    const controlYOffset = index % 2 === 0 ? 180 : -180;

    return `${path} C ${controlX} ${previous.position.y + controlYOffset}, ${controlX} ${scene.position.y - controlYOffset}, ${scene.position.x} ${scene.position.y}`;
  }, "");
}

export function PresentationShell() {
  const [currentStep, setCurrentStep] = useState(() => getInitialStepFromUrl());
  const [viewport, setViewport] = useState<ViewportState>(() => getViewportState());

  useEffect(() => {
    const handleResize = () => {
      setViewport(getViewportState());
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        startTransition(() => {
          setCurrentStep((previousStep) => Math.min(previousStep + 1, totalPresentationSteps));
        });
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        startTransition(() => {
          setCurrentStep((previousStep) => Math.max(previousStep - 1, 0));
        });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (currentStep === 0) {
      url.searchParams.delete("step");
    } else {
      url.searchParams.set("step", String(currentStep));
    }

    window.history.replaceState({}, "", url);
  }, [currentStep]);

  const camera = getCameraTargetForStep(currentStep);
  const transform = getCameraTransform(camera, viewport);
  const worldVisible = currentStep > 0;

  return (
    <main
      className="presentation-app"
      onClick={() => {
        startTransition(() => {
          setCurrentStep((previousStep) => Math.min(previousStep + 1, totalPresentationSteps));
        });
      }}
      role="application"
      aria-label="Continuous presentation"
    >
      <div className="presentation-ambient">
        <div className="ambient-glow ambient-glow-left" />
        <div className="ambient-glow ambient-glow-right" />
        <div className="ambient-grid" />
      </div>

      <motion.div
        className="presentation-world"
        animate={{
          x: transform.x,
          y: transform.y,
          scale: transform.scale,
          opacity: worldVisible ? 1 : 0
        }}
        transition={{
          x: { duration: 0.95, ease: [0.2, 0.9, 0.15, 1] },
          y: { duration: 0.95, ease: [0.2, 0.9, 0.15, 1] },
          scale: { duration: 0.95, ease: [0.2, 0.9, 0.15, 1] },
          opacity: { duration: 0.35 }
        }}
      >
        <svg
          className="world-backdrop"
          width={worldBounds.width}
          height={worldBounds.height}
          viewBox={`0 0 ${worldBounds.width} ${worldBounds.height}`}
          fill="none"
        >
          <defs>
            <linearGradient
              id="worldTrail"
              x1="0"
              x2={worldBounds.width}
              y1="0"
              y2={worldBounds.height}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="rgba(247, 240, 225, 0.14)" />
              <stop
                offset="0.45"
                stopColor="rgba(157, 214, 198, 0.18)"
              />
              <stop
                offset="1"
                stopColor="rgba(255, 111, 111, 0.1)"
              />
            </linearGradient>
          </defs>
          <path
            d={getTrailPath()}
            stroke="url(#worldTrail)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {timeline.map((scene) => (
            <g key={scene.id}>
              <circle
                cx={scene.position.x}
                cy={scene.position.y}
                r="14"
                className="world-node-core"
              />
              <circle
                cx={scene.position.x}
                cy={scene.position.y}
                r="54"
                className="world-node-ring"
              />
            </g>
          ))}
        </svg>

        {timeline.map((scene) => {
          const localStage =
            currentStep < scene.startStep
              ? 0
              : currentStep > scene.endStep
                ? scene.stageCount
                : currentStep - scene.startStep + 1;

          return (
            <SceneContainer
              key={scene.id}
              centerX={scene.position.x}
              centerY={scene.position.y}
              localStage={localStage}
              isActive={currentStep >= scene.startStep && currentStep <= scene.endStep}
              isPast={currentStep > scene.endStep}
            >
              {scene.render({
                localStage,
                isActive: currentStep >= scene.startStep && currentStep <= scene.endStep,
                isPast: currentStep > scene.endStep
              })}
            </SceneContainer>
          );
        })}
      </motion.div>
    </main>
  );
}
