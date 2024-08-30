"use client";

import * as Plot from "@observablehq/plot";
import {
  ActiveOperands,
  FlowchartArrow,
  FlowchartProcess,
  flowchartSteps,
  Scenarios,
} from "./data";
import { useEffect, useRef, useState } from "react";
import { GeistSans } from "geist/font/sans";
import { useAnimate } from "framer-motion";

function getCoordinate(
  coordinate: "x" | "y",
  d: FlowchartArrow | FlowchartProcess,
) {
  const offset = d.type === "arrow" ? (d.textOffset ?? [0, 0]) : [0, 0];
  const add = coordinate === "x" ? 0 : 1;
  const thing = coordinate === "x" ? 2 : 3;
  return (d.location[add] + d.location[thing]) * 0.5 + (offset[add] ?? 0);
}

export function PowerLossPlot() {
  const ref = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const [scenario, setScenario] = useState(Scenarios.ALL_PIS_SHUTDOWN);
  useEffect(() => {
    if (!ref.current) return;
    const plot = Plot.plot({
      aspectRatio: 1,
      axis: null,
      // Relies on the max-w set internally
      width: 1000,
      marks: [
        Plot.rect(
          flowchartSteps.filter((x) => x.type === "process"),
          {
            x1: (d) => d.location[0],
            y1: (d) => d.location[1],
            x2: (d) => d.location[2],
            y2: (d) => d.location[3],
            stroke: "currentColor",
            rx: 8,
            ry: 8,
          },
        ),
        Plot.link(
          flowchartSteps.filter((x) => x.type === "line"),
          {
            x1: (d) => d.location[0],
            y1: (d) => d.location[1],
            x2: (d) => d.location[2],
            y2: (d) => d.location[3],
            stroke: "currentColor",
            strokeWidth: 5,
            strokeLinecap: "butt",
            strokeLinejoin: "round",
          },
        ),
        Plot.arrow(
          flowchartSteps.filter((x) => x.type === "arrow"),
          {
            x1: (d) => d.location[0],
            y1: (d) => d.location[1],
            x2: (d) => d.location[2],
            y2: (d) => d.location[3],
            stroke: "currentColor",
            strokeWidth: 5,
            strokeLinecap: "butt",
            strokeLinejoin: "round",
            insetEnd: 3,
          },
        ),
        () => ``,
        Plot.text(
          flowchartSteps.filter((x) => x.text),
          {
            x: (d: FlowchartProcess | FlowchartArrow) => getCoordinate("x", d),
            y: (d: FlowchartProcess | FlowchartArrow) => getCoordinate("y", d),
            text: (d) => d.text,
            fontSize: (d: FlowchartProcess | FlowchartArrow) =>
              d.type === "arrow" ? 20 : 24,
            fontFamily: GeistSans.style.fontFamily,
            fontWeight: GeistSans.style.fontWeight,
            fill: (d: FlowchartProcess) => {
              if (d.scenario & scenario) return "green";
              return "red";
            },
            lineWidth: 6,
          },
        ),
      ],
    });
    ref.current.append(plot);

    return () => plot.remove();
  }, [scenario, flowchartSteps]);

  useEffect(() => {
    animate(
      //   [
      //     ["rect", { opacity: 1 }],
      //     ["rect", { opacity: 0 }],
      //   ],
      //   [
      //     ["rect", { fill: ["red", "blue"] }],
      //     // ["rect", { fill: "blue" }],
      //   ],
      "rect",
      { opacity: [0, 1] },
      { onUpdate: console.log }, //repeat: Infinity
    );
  });
  return (
    <div className="w-full px-10" ref={scope}>
      <div ref={ref} role="figure" />
      <div className="flex gap-4"></div>
    </div>
  );
}

// Cool ideas
/**
 * Interactive plot.  User can create different scenarios and the plot will update:
 * - Line power/battery
 * - Power level (slider or buttons?)
 * - Reset
 *
 * Results:
 * - Flowchart path gets highlighted
 *      - Little sparks down the lines for power flow?
 * - Device list w/ icons gets updated
 *      - Colored to indicate powered on, grayscale to indicate powered off
 */
