import { AnimatePresence, motion } from "framer-motion";

import {
  CAMERA_EASE,
  type CameraTarget,
  ImagePlaceholder,
  Reveal,
  SCENE_HEIGHT,
  SCENE_WIDTH
} from "./primitives";

type SceneRenderProps = {
  localStage: number;
  isActive: boolean;
  isPast: boolean;
};

export type SceneDefinition = {
  id: string;
  title: string;
  stageCount: number;
  position: {
    x: number;
    y: number;
  };
  camera: (localStage: number) => CameraTarget;
  render: (props: SceneRenderProps) => JSX.Element;
};

type SequenceItem = {
  label: string;
  x: number;
  y: number;
  tone: "stable" | "break";
  strength?: number;
  width: number;
};

const sequenceItems: SequenceItem[] = [
  { label: "Build", x: 56, y: 0, tone: "stable", width: 154 },
  { label: "Fix", x: 226, y: 0, tone: "stable", width: 82 },
  { label: "Add", x: 376, y: 0, tone: "stable", width: 100 },
  { label: "Add", x: 516, y: 0, tone: "stable", width: 100 },
  { label: "Fix", x: 664, y: 0, tone: "stable", width: 82 },
  { label: "Add", x: 806, y: 0, tone: "stable", width: 100 },
  { label: "Break", x: 966, y: -4, tone: "break", strength: 1, width: 166 },
  { label: "Fix", x: 1144, y: 0, tone: "stable", width: 82 },
  { label: "Break", x: 1298, y: 10, tone: "break", strength: 2, width: 166 },
  { label: "Break", x: 1410, y: -12, tone: "break", strength: 3, width: 166 },
  { label: "Break", x: 1512, y: 16, tone: "break", strength: 4, width: 166 }
];

const toolNames = ["Claude", "Codex", "Cursor", "Antigravity"];

const sceneFourEvidence = [
  { word: "apps", icon: "phone" },
  { word: "games", icon: "controller" },
  { word: "tools", icon: "dashboard" },
  { word: "sites", icon: "browser" }
] as const;

const practicalColumns = [
  {
    label: "Quick build",
    prompt: "Create an interactive theme park game with paths, rides, guests, UI...",
    project: "March Yakness Bracket Site",
    assetSrc: "/assets/slide-9-march-yakness.png",
    qrSrc: "/assets/slide-9-march-yakness-qr.svg",
    assetLabel: "March Yakness Bracket Site",
    assetCaption: "Bracket site example"
  },
  {
    label: "Structured spec",
    prompt: "Write a detailed product spec for an interactive theme park game... Ask me about key decisions similar products don't agree on.",
    project: "Pong Rush Game",
    assetSrc: "/assets/slide-9-pong-rush.png",
    qrSrc: "/assets/slide-9-pong-rush-qr.svg",
    assetLabel: "Pong Rush Game",
    assetCaption: "Game example"
  },
  {
    label: "Planned system",
    prompt: "Prompt 1: product spec\nPrompt 2: before building, plan structure, docs, consistency",
    project: "Internal Monitoring Tool",
    assetSrc: "/assets/slide-9-monitoring-tool.png",
    qrSrc: undefined,
    assetLabel: "Internal Monitoring Tool",
    assetCaption: "Operational tool example"
  },
  {
    label: "Full system design",
    prompt: "Prompt 1: product spec\nPrompt 2: planning docs + system rules",
    project: "Lift & Learn App",
    assetSrc: "/assets/slide-9-lift-and-learn.png",
    qrSrc: undefined,
    assetLabel: "Lift & Learn App",
    assetCaption: "Learning product example"
  }
] as const;

const slide9PromptColumns = [
  {
    heading: "Prompt 1",
    body:
      "Write a detailed product spec for an interactive isometric theme park simulation game that runs in the browser. Include park building, navigation, guests, rides, paths, scenery, UI, economy, cleanliness, queueing, and happiness systems. Ask me about key product decisions before finalizing."
  },
  {
    heading: "Prompt 2",
    body:
      "Before building, design a document system that defines how the product is built and maintained."
  }
] as const;

const documentRules = [
  "AGENTS.md",
  "architecture.md",
  "README.md",
  "accounts.md",
  "LOCAL_DEV.md",
  "setup.md"
] as const;

const maintainabilityRules = [
  "Enforce reuse over recreation",
  "Define boundaries between systems",
  "Keep naming consistent",
  "Update docs when structure changes",
  "Remove outdated systems instead of duplicating"
] as const;

const workflowRules = [
  "Start from docs before coding",
  "Update docs first when structure changes",
  "Flag conflicts with the existing system",
  "Adapt the request or update the system"
] as const;

function sceneCenterCamera(position: { x: number; y: number }, zoom = 1): CameraTarget {
  return {
    x: position.x,
    y: position.y,
    zoom
  };
}

function SceneOne({ localStage }: SceneRenderProps) {
  const activeEmotion = getSlideOneEmotion(localStage);

  return (
    <div className="scene scene-one">
      <div className="sequence-stage">
        <div className="sequence-row">
          {sequenceItems.map((item, index) => {
            const visible = localStage >= index + 1;

            return (
              <div
                className="sequence-item-wrap"
                key={`${item.label}-${index}`}
              >
                <Reveal
                  show={visible}
                  x={12}
                  y={18}
                  delay={0.02}
                  className={[
                    "sequence-item",
                    item.tone === "break" ? `sequence-item-break sequence-item-break-${item.strength}` : "sequence-item-stable"
                  ].join(" ")}
                  style={{
                    left: item.x,
                    top: item.y
                  }}
                >
                  <span>{item.label}</span>
                </Reveal>
                {index < sequenceItems.length - 1 ? (
                  <Reveal
                    show={localStage >= index + 2}
                    x={6}
                    y={0}
                    className="sequence-arrow"
                    style={{
                      left: getSequenceArrowLeft(item, sequenceItems[index + 1]),
                      top: getSequenceArrowTop(item, sequenceItems[index + 1])
                    }}
                  >
                    <span>→</span>
                  </Reveal>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="sequence-baseline" />
      </div>

      <AnimatePresence mode="wait">
        {activeEmotion ? (
          <motion.div
            key={activeEmotion.id}
            className={[
              "reaction-card",
              activeEmotion.size === "large" ? "reaction-card-large" : "reaction-card-small"
            ].join(" ")}
            style={{
              left: activeEmotion.x,
              top: activeEmotion.y
            }}
            initial={{
              opacity: 0,
              y: 18,
              scale: 0.96
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.98
            }}
            transition={{
              duration: activeEmotion.size === "large" ? 0.56 : 0.38,
              ease: CAMERA_EASE
            }}
          >
            <ImagePlaceholder
              src={activeEmotion.assetSrc}
              alt={activeEmotion.alt}
              label={activeEmotion.label}
              caption={activeEmotion.caption}
              ratio={activeEmotion.size === "large" ? "16 / 10" : "4 / 3"}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SceneTwo({ localStage }: SceneRenderProps) {
  return (
    <div className="scene scene-two">
      <Reveal
        show={localStage >= 1}
        className="scene-two-visual"
      >
        <ImagePlaceholder
          src="/assets/slide-2-dory.png"
          alt="Dory placeholder"
          label="Dory image"
          caption="Centered concept anchor"
          ratio="1 / 1"
        />
      </Reveal>

      <Reveal
        show={localStage >= 2}
        className="headline-stack scene-two-copy"
        delay={0.08}
      >
        <h1 className="headline">
          <span className="headline-line">Eagerly helpful</span>
          <span className="headline-line">Can’t follow the plot</span>
        </h1>
      </Reveal>
    </div>
  );
}

function SceneThree({ localStage }: SceneRenderProps) {
  return (
    <div className="scene scene-three">
      <Reveal
        show={localStage >= 1}
        className="scene-three-arc"
      >
        <svg
          className="story-arc"
          viewBox="0 0 1400 360"
          fill="none"
        >
          <motion.path
            d="M74 252C214 252 274 126 412 126C548 126 660 242 794 242C930 242 988 162 1114 162"
            stroke="url(#storyArcGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: CAMERA_EASE }}
          />
          <motion.path
            d="M1114 162C1170 162 1224 172 1268 198C1298 214 1326 236 1350 262"
            stroke="url(#storyArcFade)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="10 18"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.88 }}
            transition={{ duration: 0.8, delay: 0.28, ease: CAMERA_EASE }}
          />
          <defs>
            <linearGradient
              id="storyArcGradient"
              x1="74"
              x2="1114"
              y1="252"
              y2="162"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="rgba(247, 240, 225, 0.9)" />
              <stop
                offset="0.7"
                stopColor="rgba(157, 214, 198, 0.95)"
              />
              <stop
                offset="1"
                stopColor="rgba(255, 111, 111, 0.8)"
              />
            </linearGradient>
            <linearGradient
              id="storyArcFade"
              x1="1114"
              x2="1350"
              y1="162"
              y2="262"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="rgba(255, 111, 111, 0.76)" />
              <stop
                offset="1"
                stopColor="rgba(255, 111, 111, 0)"
              />
            </linearGradient>
          </defs>
        </svg>
      </Reveal>

      <Reveal
        show={localStage >= 2}
        className="headline-stack scene-three-copy"
        delay={0.06}
      >
        <h1 className="headline">
          <span className="headline-line">Starts strong</span>
          <span className="headline-line">Never reaches the ending</span>
        </h1>
      </Reveal>
    </div>
  );
}

function SceneFour({ localStage }: SceneRenderProps) {
  const visibleEvidenceCount = Math.max(0, Math.min(localStage - 1, sceneFourEvidence.length));

  return (
    <div className="scene scene-four">
      <div className="scene-four-copy">
        <Reveal
          show={localStage >= 1}
          className="scene-four-line scene-four-line-primary"
        >
          <span>I kept hitting this</span>
        </Reveal>

        <div className="scene-four-line scene-four-line-secondary">
          <Reveal
            show={localStage >= 1}
            className="scene-four-prefix"
          >
            <span>Across</span>
          </Reveal>

          {sceneFourEvidence.map((item, index) => (
            <Reveal
              key={item.word}
              show={localStage >= index + 2}
              className="scene-four-term"
              delay={index * 0.04}
            >
              <span>{index < sceneFourEvidence.length - 1 ? `${item.word},` : item.word}</span>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="evidence-grid">
        {sceneFourEvidence.map((item, index) => (
          <div
            key={item.word}
            className="evidence-slot"
          >
            <Reveal
              show={localStage >= index + 2}
              className="evidence-card"
              delay={index * 0.05}
            >
              <EvidenceIcon kind={item.icon} />
            </Reveal>
          </div>
        ))}
      </div>

      <Reveal
        show={localStage >= visibleEvidenceCount + 2}
        className="tool-row"
      >
        {toolNames.map((tool, index) => (
          <span
            key={tool}
            className="tool-chip"
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            {tool}
          </span>
        ))}
      </Reveal>
    </div>
  );
}

function SceneFive({ localStage }: SceneRenderProps) {
  return (
    <div className="scene scene-five">
      <div className="pattern-layout">
        <div className="pattern-labels">
          <Reveal
            show={localStage >= 1}
            className="pattern-line"
          >
            Partial updates
          </Reveal>
          <Reveal
            show={localStage >= 2}
            className="pattern-line"
            delay={0.04}
          >
            Duplication
          </Reveal>
          <Reveal
            show={localStage >= 3}
            className="pattern-line"
            delay={0.08}
          >
            System drift
          </Reveal>
        </div>

        <Reveal
          show={localStage >= 1}
          className="pattern-diagram"
        >
          <svg
            viewBox="0 0 700 440"
            fill="none"
            className="diagram-svg"
          >
            <motion.path
              d="M154 224H320"
              stroke="rgba(247, 240, 225, 0.4)"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: CAMERA_EASE }}
            />
            <motion.circle
              cx="110"
              cy="224"
              r="42"
              className="diagram-node diagram-node-core"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: CAMERA_EASE }}
            />

            {localStage >= 2 ? (
              <>
                <motion.path
                  d="M320 224C396 224 420 134 502 134"
                  stroke="rgba(157, 214, 198, 0.7)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: CAMERA_EASE }}
                />
                <motion.path
                  d="M320 224C394 224 422 314 514 314"
                  stroke="rgba(247, 240, 225, 0.42)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.56, delay: 0.04, ease: CAMERA_EASE }}
                />
                <motion.circle
                  cx="542"
                  cy="130"
                  r="34"
                  className="diagram-node diagram-node-positive"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.36, delay: 0.06, ease: CAMERA_EASE }}
                />
                <motion.circle
                  cx="550"
                  cy="316"
                  r="30"
                  className="diagram-node diagram-node-neutral"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.36, delay: 0.12, ease: CAMERA_EASE }}
                />
              </>
            ) : null}

            {localStage >= 3 ? (
              <>
                <motion.path
                  d="M502 134C566 134 610 188 654 188"
                  stroke="rgba(255, 111, 111, 0.75)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="16 18"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.54, ease: CAMERA_EASE }}
                />
                <motion.path
                  d="M514 314C566 332 602 294 648 250"
                  stroke="rgba(255, 111, 111, 0.48)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.54, delay: 0.08, ease: CAMERA_EASE }}
                />
                <motion.circle
                  cx="664"
                  cy="186"
                  r="24"
                  className="diagram-node diagram-node-break"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.34, delay: 0.12, ease: CAMERA_EASE }}
                />
                <motion.circle
                  cx="660"
                  cy="248"
                  r="20"
                  className="diagram-node diagram-node-break-soft"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.34, delay: 0.18, ease: CAMERA_EASE }}
                />
              </>
            ) : null}
          </svg>
        </Reveal>
      </div>
    </div>
  );
}

function SceneSix({ localStage }: SceneRenderProps) {
  const isStructured = localStage >= 2;
  const isUnified = localStage >= 3;

  return (
    <div className="scene scene-six">
      <div className="contrast-copy">
        <motion.div
          className="contrast-line contrast-line-left"
          animate={{
            x: isUnified ? 250 : 0,
            y: isUnified ? -8 : 0,
            opacity: localStage >= 1 ? 1 : 0
          }}
          transition={{ duration: 0.55, ease: CAMERA_EASE }}
        >
          From tasking
        </motion.div>
        <motion.div
          className="contrast-line contrast-line-right"
          animate={{
            x: isUnified ? -250 : 0,
            y: isUnified ? 8 : 0,
            opacity: isStructured ? 1 : 0
          }}
          transition={{ duration: 0.55, ease: CAMERA_EASE }}
        >
          To directing
        </motion.div>
      </div>

      <div className="contrast-layout">
        <motion.div
          className="contrast-column contrast-column-chaos"
          animate={{
            opacity: localStage >= 1 ? 1 : 0.3,
            x: isUnified ? -40 : 0
          }}
          transition={{ duration: 0.5, ease: CAMERA_EASE }}
        >
          <ScatteredSystem />
        </motion.div>
        <motion.div
          className="contrast-column contrast-column-order"
          animate={{
            opacity: isStructured ? 1 : 0.24,
            x: isUnified ? 40 : 0
          }}
          transition={{ duration: 0.5, ease: CAMERA_EASE }}
        >
          <DirectedSystem highlight={isStructured} />
        </motion.div>
      </div>
    </div>
  );
}

function SceneSeven({ localStage }: SceneRenderProps) {
  const isPlanned = localStage >= 2;

  return (
    <div className="scene scene-seven">
      <Reveal
        show={localStage >= 1}
        className="headline-stack scene-seven-copy"
      >
        <h1 className="headline">
          <span className="headline-line">Don’t rush to build</span>
          <span className="headline-line">Ask how it should work first</span>
        </h1>
      </Reveal>

      <div className="flow-comparison">
        <motion.div
          className="flow-row flow-row-old"
          animate={{
            opacity: localStage >= 1 ? (isPlanned ? 0.38 : 1) : 0,
            y: isPlanned ? -44 : 0,
            scale: isPlanned ? 0.92 : 1
          }}
          transition={{ duration: 0.52, ease: CAMERA_EASE }}
        >
          <FlowNode label="Describe" />
          <span className="flow-arrow">→</span>
          <FlowNode label="Build" />
        </motion.div>

        <motion.div
          className="flow-row flow-row-new"
          animate={{
            opacity: isPlanned ? 1 : 0,
            y: isPlanned ? 0 : 28,
            scale: isPlanned ? 1 : 0.96
          }}
          transition={{ duration: 0.56, ease: CAMERA_EASE }}
        >
          <FlowNode label="Describe" />
          <span className="flow-arrow">→</span>
          <FlowNode
            label="Plan"
            emphasis
          />
          <span className="flow-arrow">→</span>
          <FlowNode label="Build" />
        </motion.div>
      </div>
    </div>
  );
}

function SceneEight({ localStage }: SceneRenderProps) {
  return (
    <div className="scene scene-eight">
      <Reveal
        show={localStage >= 1}
        className="headline-stack scene-eight-copy"
      >
        <h1 className="headline">
          <span className="headline-line">Stay focused</span>
          <span className="headline-line">Reinforce what matters as things grow</span>
        </h1>
      </Reveal>

      <div className="growth-compare">
        <Reveal
          show={localStage >= 2}
          className="growth-panel growth-panel-drift"
        >
          <GrowthGraph aligned={false} />
        </Reveal>
        <Reveal
          show={localStage >= 3}
          className="growth-panel growth-panel-aligned"
        >
          <GrowthGraph aligned />
        </Reveal>
      </div>
    </div>
  );
}

function SceneNine({ localStage }: SceneRenderProps) {
  const isFocusStage = localStage === 4 || localStage === 5;
  const isProjectStage = localStage >= 6;
  const isGalleryStage = localStage >= 7;
  const isPromptStage = localStage === 5;

  return (
    <div
      className={[
        "scene",
        "scene-nine",
        isProjectStage ? "scene-nine-projects" : "",
        isGalleryStage ? "scene-nine-gallery" : "",
        isPromptStage ? "scene-nine-prompt" : ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "approach-grid",
          isProjectStage ? "approach-grid-projects" : "",
          isGalleryStage ? "approach-grid-gallery" : ""
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {practicalColumns.map((column, index) => {
          const isFocused = isFocusStage && index === practicalColumns.length - 1;
          const isFaded = isFocusStage && index !== practicalColumns.length - 1;

	          return (
	            <motion.div
	              key={column.label}
	              className={[
	                "approach-column",
	                column.qrSrc ? "approach-column-has-qr" : "",
	                isFocused ? "approach-column-focused" : ""
	              ].join(" ")}
              animate={{
                opacity: isFaded ? 0.08 : 1,
                x: isFocused ? (isPromptStage ? 244 : 124) : isFaded ? -40 : 0,
                y: isFocused ? (isPromptStage ? -34 : -18) : 0,
                scale: isFocused ? (isPromptStage ? 1.02 : 1.06) : isFaded ? 0.94 : 1,
                width: isFocused ? (isPromptStage ? 560 : 520) : isGalleryStage ? 660 : isProjectStage ? 340 : 280
              }}
              transition={{ duration: 0.58, ease: CAMERA_EASE }}
            >
              <div className="approach-column-sheen" />
              <div className="approach-meta">
                <Reveal
                  show={localStage >= 2}
                  className="approach-label"
                  delay={index * 0.06}
                >
                  {column.label}
                </Reveal>

                <Reveal
                  show={localStage === 3 || localStage === 4}
                  className="approach-copy"
                  delay={index * 0.06}
                >
                  {column.prompt}
                </Reveal>

                <Reveal
                  show={isProjectStage}
                  className="approach-project"
                  delay={index * 0.06}
                >
                  {column.project}
                </Reveal>

	                {column.qrSrc ? (
	                  <Reveal
	                    show={isGalleryStage && localStage >= index + 7}
	                    className="approach-qr"
	                    delay={0.08}
	                  >
	                    <div className="approach-qr-frame">
	                      <img
	                        className="approach-qr-image"
                        src={column.qrSrc}
                        alt={`QR code for ${column.project}`}
                      />
                    </div>
                  </Reveal>
                ) : null}
              </div>

              <Reveal
                show={localStage >= index + 7}
                className="approach-asset"
              >
	                <ImagePlaceholder
	                  src={column.assetSrc}
	                  alt={`${column.project} placeholder`}
	                  label={column.assetLabel}
	                  caption={column.assetCaption}
	                  ratio={isGalleryStage && column.qrSrc ? "16 / 11" : "16 / 10"}
	                />
	              </Reveal>
            </motion.div>
          );
        })}
      </div>

      <Reveal
        show={localStage === 5}
        className="prompt-panel"
      >
        <div className="prompt-panel-header">
          <span className="prompt-kicker">Full system design example</span>
          <span className="prompt-goal">Goal: keep the system aligned as it evolves</span>
        </div>

        <div className="prompt-sequence">
	          <div className="prompt-step prompt-step-primary">
	            <div className="prompt-step-heading">
	              <span className="prompt-step-badge">{slide9PromptColumns[0].heading}</span>
	              <span className="prompt-step-meta">Step 1 of 2</span>
	            </div>
	            <p>{slide9PromptColumns[0].body}</p>
	          </div>

	          <div className="prompt-sequence-divider">
	            <span className="prompt-sequence-arrow">↓</span>
	            <span className="prompt-sequence-label">After Prompt 1, use Prompt 2 to define the system structure</span>
	          </div>

	          <div className="prompt-step prompt-step-secondary">
	            <div className="prompt-step-heading">
	              <span className="prompt-step-badge">{slide9PromptColumns[1].heading}</span>
	              <span className="prompt-step-meta">Step 2 of 2</span>
	            </div>
	            <p className="prompt-step-intro">{slide9PromptColumns[1].body}</p>
	            <div className="prompt-step-children-label">Prompt 2 should define all of the components below</div>

	            <div className="prompt-panel-grid">
              <div className="prompt-section prompt-section-create">
                <div className="prompt-section-title">Create</div>
                <ul className="prompt-list prompt-list-tight">
                  {documentRules.map((documentRule) => (
                    <li key={documentRule}>{documentRule}</li>
                  ))}
                </ul>
              </div>

              <div className="prompt-section prompt-section-document-rules">
                <div className="prompt-section-title">For each document</div>
                <ul className="prompt-list">
                  <li>Define purpose</li>
                  <li>Define source of truth</li>
                  <li>Define when it must be updated</li>
                  <li>Define how it is used</li>
                </ul>
              </div>

              <div className="prompt-section prompt-section-maintainability">
                <div className="prompt-section-title">Maintainability rules</div>
                <ul className="prompt-list prompt-list-tight">
                  {maintainabilityRules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>

              <div className="prompt-section prompt-section-workflow">
                <div className="prompt-section-title">Workflow</div>
                <ul className="prompt-list prompt-list-tight">
                  {workflowRules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function SceneTen({ localStage }: SceneRenderProps) {
  const bullets = [
    "Turn ideas into buildable MVPs",
    "Keep AI systems from breaking as they grow",
    "Direct AI instead of reacting to it",
    "Build products—not just prototypes"
  ];

  return (
    <div className="scene scene-ten">
      <Reveal
        show={localStage >= 1}
        className="scene-ten-copy"
      >
        <h1 className="headline scene-ten-title">What you can do now</h1>
      </Reveal>

      <div className="closing-list">
        {bullets.map((bullet, index) => (
          <Reveal
            key={bullet}
            show={localStage >= index + 2}
            className="closing-item"
            delay={0.04}
          >
            <span className="closing-bullet">•</span>
            <span>{bullet}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function FlowNode({ label, emphasis = false }: { label: string; emphasis?: boolean }) {
  return <div className={["flow-node", emphasis ? "flow-node-emphasis" : ""].join(" ")}>{label}</div>;
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="icon-svg"
      fill="none"
    >
      <rect
        x="34"
        y="18"
        width="52"
        height="84"
        rx="13"
      />
      <line
        x1="48"
        y1="34"
        x2="72"
        y2="34"
      />
      <circle
        cx="60"
        cy="84"
        r="4"
      />
    </svg>
  );
}

function ControllerIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="icon-svg"
      fill="none"
    >
      <path d="M26 64C26 45 40 34 60 34C80 34 94 45 94 64C94 81 85 90 76 90C68 90 68 78 60 78C52 78 52 90 44 90C35 90 26 81 26 64Z" />
      <line
        x1="44"
        y1="58"
        x2="44"
        y2="72"
      />
      <line
        x1="37"
        y1="65"
        x2="51"
        y2="65"
      />
      <circle
        cx="74"
        cy="60"
        r="4"
      />
      <circle
        cx="82"
        cy="70"
        r="4"
      />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="icon-svg"
      fill="none"
    >
      <rect
        x="22"
        y="26"
        width="76"
        height="68"
        rx="14"
      />
      <path d="M38 70C38 54 48 46 60 46C72 46 82 54 82 70" />
      <line
        x1="60"
        y1="70"
        x2="73"
        y2="57"
      />
      <circle
        cx="60"
        cy="70"
        r="5"
      />
    </svg>
  );
}

function BrowserIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="icon-svg"
      fill="none"
    >
      <rect
        x="18"
        y="24"
        width="84"
        height="72"
        rx="14"
      />
      <line
        x1="18"
        y1="42"
        x2="102"
        y2="42"
      />
      <circle
        cx="32"
        cy="34"
        r="3"
      />
      <circle
        cx="42"
        cy="34"
        r="3"
      />
      <circle
        cx="52"
        cy="34"
        r="3"
      />
    </svg>
  );
}

function EvidenceIcon({ kind }: { kind: (typeof sceneFourEvidence)[number]["icon"] }) {
  if (kind === "phone") {
    return <PhoneIcon />;
  }

  if (kind === "controller") {
    return <ControllerIcon />;
  }

  if (kind === "dashboard") {
    return <DashboardIcon />;
  }

  return <BrowserIcon />;
}

function ScatteredSystem() {
  return (
    <svg
      viewBox="0 0 560 360"
      fill="none"
      className="diagram-svg"
    >
      <path d="M88 106L230 54" />
      <path d="M230 54L382 124" />
      <path d="M206 188L340 214" />
      <path d="M112 270L248 188" />
      <path d="M340 214L444 302" />
      <rect
        x="62"
        y="74"
        width="82"
        height="54"
        rx="18"
      />
      <rect
        x="196"
        y="28"
        width="88"
        height="56"
        rx="18"
      />
      <rect
        x="348"
        y="98"
        width="94"
        height="58"
        rx="18"
      />
      <rect
        x="178"
        y="160"
        width="82"
        height="54"
        rx="18"
      />
      <rect
        x="88"
        y="238"
        width="94"
        height="58"
        rx="18"
      />
      <rect
        x="410"
        y="274"
        width="82"
        height="54"
        rx="18"
      />
    </svg>
  );
}

function DirectedSystem({ highlight }: { highlight: boolean }) {
  return (
    <svg
      viewBox="0 0 560 360"
      fill="none"
      className={["diagram-svg", highlight ? "diagram-svg-highlight" : ""].join(" ")}
    >
      <path d="M116 124H444" />
      <path d="M280 124V266" />
      <path d="M158 266H402" />
      <rect
        x="214"
        y="82"
        width="132"
        height="70"
        rx="22"
      />
      <rect
        x="110"
        y="234"
        width="106"
        height="62"
        rx="20"
      />
      <rect
        x="226"
        y="234"
        width="106"
        height="62"
        rx="20"
      />
      <rect
        x="344"
        y="234"
        width="106"
        height="62"
        rx="20"
      />
    </svg>
  );
}

function GrowthGraph({ aligned }: { aligned: boolean }) {
  return (
    <div className={["growth-graph", aligned ? "growth-graph-aligned" : "growth-graph-drift"].join(" ")}>
      <svg
        viewBox="0 0 540 360"
        fill="none"
        className="diagram-svg"
      >
        <path d="M270 190V100" />
        <path d="M270 190L156 282" />
        <path d="M270 190L386 282" />
        <path d="M270 100L188 48" />
        <path d="M270 100L354 48" />
        <path d={aligned ? "M156 282L116 332" : "M156 282L136 346"} />
        <path d={aligned ? "M386 282L428 332" : "M386 282L468 308"} />
        <path d={aligned ? "M354 48L424 84" : "M354 48L444 126"} />
        <path d={aligned ? "M188 48L116 84" : "M188 48L92 38"} />

        {aligned ? (
          <>
            <circle
              cx="270"
              cy="190"
              r="76"
              className="growth-anchor"
            />
            <circle
              cx="270"
              cy="190"
              r="136"
              className="growth-anchor growth-anchor-outer"
            />
          </>
        ) : null}

        {growthNodes(aligned).map((node) => (
          <circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            className={node.className}
          />
        ))}
      </svg>
    </div>
  );
}

function growthNodes(aligned: boolean) {
  if (aligned) {
    return [
      { cx: 270, cy: 190, r: 26, className: "diagram-node diagram-node-core" },
      { cx: 270, cy: 100, r: 18, className: "diagram-node diagram-node-positive" },
      { cx: 156, cy: 282, r: 18, className: "diagram-node diagram-node-positive" },
      { cx: 386, cy: 282, r: 18, className: "diagram-node diagram-node-positive" },
      { cx: 188, cy: 48, r: 16, className: "diagram-node diagram-node-neutral" },
      { cx: 354, cy: 48, r: 16, className: "diagram-node diagram-node-neutral" },
      { cx: 116, cy: 84, r: 14, className: "diagram-node diagram-node-neutral" },
      { cx: 424, cy: 84, r: 14, className: "diagram-node diagram-node-neutral" },
      { cx: 116, cy: 332, r: 14, className: "diagram-node diagram-node-neutral" },
      { cx: 428, cy: 332, r: 14, className: "diagram-node diagram-node-neutral" }
    ];
  }

  return [
    { cx: 270, cy: 190, r: 26, className: "diagram-node diagram-node-core" },
    { cx: 270, cy: 100, r: 18, className: "diagram-node diagram-node-neutral" },
    { cx: 156, cy: 282, r: 18, className: "diagram-node diagram-node-neutral" },
    { cx: 386, cy: 282, r: 18, className: "diagram-node diagram-node-neutral" },
    { cx: 188, cy: 48, r: 16, className: "diagram-node diagram-node-neutral" },
    { cx: 354, cy: 48, r: 16, className: "diagram-node diagram-node-positive" },
    { cx: 92, cy: 38, r: 14, className: "diagram-node diagram-node-break-soft" },
    { cx: 444, cy: 126, r: 14, className: "diagram-node diagram-node-break" },
    { cx: 136, cy: 346, r: 14, className: "diagram-node diagram-node-break-soft" },
    { cx: 468, cy: 308, r: 14, className: "diagram-node diagram-node-break" }
  ];
}

function getSequenceArrowLeft(current: SequenceItem, next: SequenceItem) {
  const gapStart = current.x + current.width;
  const gapWidth = next.x - gapStart;

  return gapStart + gapWidth / 2 - 16;
}

function getSequenceArrowTop(current: SequenceItem, next: SequenceItem) {
  return (current.y + next.y) / 2 + 8;
}

function getSlideOneEmotion(localStage: number) {
  if (localStage >= 11) {
    return {
      id: "meltdown",
      x: 1098,
      y: 156,
      size: "large" as const,
      alt: "Final meltdown placeholder",
      label: "Final meltdown meme",
      caption: "Everything is broken",
      assetSrc: "/assets/slide-1-meltdown.png"
    };
  }

  if (localStage >= 8) {
    return {
      id: "recovery",
      x: 922,
      y: 194,
      size: "small" as const,
      alt: "Recovery placeholder",
      label: "Recovery beat",
      caption: "Trying to regain control",
      assetSrc: "/assets/slide-1-recovery.png"
    };
  }

  if (localStage >= 7) {
    return {
      id: "uh-oh",
      x: 790,
      y: 210,
      size: "small" as const,
      alt: "Concern placeholder",
      label: "Concern beat",
      caption: "The first crack",
      assetSrc: "/assets/slide-1-uh-oh.png"
    };
  }

  if (localStage >= 4) {
    return {
      id: "locked-in",
      x: 430,
      y: 204,
      size: "small" as const,
      alt: "Confidence placeholder",
      label: "Confidence beat",
      caption: "Locked in",
      assetSrc: "/assets/slide-1-locked-in.png"
    };
  }

  if (localStage >= 1) {
    return {
      id: "build",
      x: 56,
      y: 186,
      size: "small" as const,
      alt: "Build meme placeholder",
      label: "Build moment image",
      caption: "I am a genius",
      assetSrc: "/assets/slide-1-build.png"
    };
  }

  return null;
}

export const scenes: SceneDefinition[] = [
  {
    id: "scene-1",
    title: "Build to break",
    stageCount: 11,
    position: { x: 1600, y: 1450 },
    camera(localStage) {
      const clampedStage = Math.max(localStage, 1);

      return {
        x: 950 + (clampedStage - 1) * 42,
        y: 1452,
        zoom: clampedStage === 1 ? 1.02 : clampedStage < 7 ? 0.92 : clampedStage < 10 ? 0.8 : 0.62
      };
    },
    render(props) {
      return <SceneOne {...props} />;
    }
  },
  {
    id: "scene-2",
    title: "Dory analogy",
    stageCount: 2,
    position: { x: 3700, y: 1260 },
    camera(localStage) {
      return {
        x: 3700,
        y: 1360,
        zoom: localStage >= 2 ? 0.74 : 0.8
      };
    },
    render(props) {
      return <SceneTwo {...props} />;
    }
  },
  {
    id: "scene-3",
    title: "Gap",
    stageCount: 2,
    position: { x: 5750, y: 1380 },
    camera(localStage) {
      return {
        x: 5750,
        y: 1400,
        zoom: localStage >= 2 ? 0.98 : 1.02
      };
    },
    render(props) {
      return <SceneThree {...props} />;
    }
  },
  {
    id: "scene-4",
    title: "Credibility",
    stageCount: 6,
    position: { x: 7850, y: 1580 },
    camera(localStage) {
      return {
        x: 7850,
        y: 1560 + (localStage >= 2 ? 16 : -10),
        zoom: localStage >= 6 ? 0.94 : 1
      };
    },
    render(props) {
      return <SceneFour {...props} />;
    }
  },
  {
    id: "scene-5",
    title: "Pattern diagram",
    stageCount: 4,
    position: { x: 9900, y: 1420 },
    camera(localStage) {
      return {
        x: 9910,
        y: 1450,
        zoom: localStage >= 4 ? 0.82 : 0.86
      };
    },
    render(props) {
      return <SceneFive {...props} />;
    }
  },
  {
    id: "scene-6",
    title: "Tasking to directing",
    stageCount: 3,
    position: { x: 12000, y: 1240 },
    camera(localStage) {
      return {
        x: localStage >= 3 ? 12000 : 11880,
        y: 1260,
        zoom: localStage >= 3 ? 1.02 : 0.98
      };
    },
    render(props) {
      return <SceneSix {...props} />;
    }
  },
  {
    id: "scene-7",
    title: "Plan before build",
    stageCount: 2,
    position: { x: 14150, y: 1060 },
    camera(localStage) {
      return {
        x: 14150,
        y: 1080,
        zoom: localStage >= 2 ? 1.03 : 0.98
      };
    },
    render(props) {
      return <SceneSeven {...props} />;
    }
  },
  {
    id: "scene-8",
    title: "Stay focused",
    stageCount: 3,
    position: { x: 16250, y: 1250 },
    camera(localStage) {
      return {
        x: 16250,
        y: 1260,
        zoom: localStage >= 3 ? 0.92 : 0.96
      };
    },
    render(props) {
      return <SceneEight {...props} />;
    }
  },
  {
    id: "scene-9",
    title: "Approach selection",
    stageCount: 10,
    position: { x: 18450, y: 1480 },
    camera(localStage) {
      if (localStage === 5) {
        return {
          x: 18450,
          y: 1496,
          zoom: 0.98
        };
      }

      if (localStage === 4) {
        return {
          x: 18810,
          y: 1450,
          zoom: 1.14
        };
      }

      if (localStage >= 7) {
        return {
          x: 18450,
          y: 1492,
          zoom: 0.98
        };
      }

      if (localStage >= 6) {
        return {
          x: 18450,
          y: 1498,
          zoom: 0.94
        };
      }

      return {
        x: 18450,
        y: 1490,
        zoom: 0.9
      };
    },
    render(props) {
      return <SceneNine {...props} />;
    }
  },
  {
    id: "scene-10",
    title: "Capabilities",
    stageCount: 5,
    position: { x: 20650, y: 1360 },
    camera(localStage) {
      return {
        x: 20650,
        y: 1380,
        zoom: localStage >= 2 ? 1.01 : 0.97
      };
    },
    render(props) {
      return <SceneTen {...props} />;
    }
  }
];

export const timeline = scenes.map((scene, index) => {
  const previousScene = scenes[index - 1];
  const startStep =
    index === 0
      ? 1
      : scenes
          .slice(0, index)
          .reduce((accumulator, item) => accumulator + item.stageCount, 1);

  const endStep = startStep + scene.stageCount - 1;

  return {
    ...scene,
    previousScene,
    startStep,
    endStep
  };
});

export const totalPresentationSteps = timeline[timeline.length - 1]?.endStep ?? 0;

export const preludeCamera = sceneCenterCamera({ x: 380, y: 1360 }, 0.94);

export const worldBounds = {
  width: timeline[timeline.length - 1].position.x + SCENE_WIDTH,
  height: 2800
};
