"use client";

import { motion, Variants } from "framer-motion";
import { FlowchartArrow, FlowchartProcess, flowchartSteps } from "./test-data";
import { useState } from "react";
import { cn } from "~/lib/utils";

const variants: Variants = {
  initial: {
    borderColor: "#f87171",
  },
  active: {
    // borderColor: "#34d399",
    background: ["#f87171", "#34d399"],
    // repeatCount: 3,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

function LineSegment(
  type: "line" | "arrowhead",
  direction: "up" | "down" | "left" | "right",
) {
  let d = "";
  switch (direction) {
    case "up":
      d += " M 50,50 50,0";
      if (type === "arrowhead") d += " M 40,30 50,0 60,30";
      break;
    case "down":
      d += " M 50,50 50,100";
      if (type === "arrowhead") d += " M 40,80 50,100 60,80";
      break;
    case "left":
      d += " M 50,50 0,50";
      if (type === "arrowhead") d += " M 20,40 0,50 20,60";
      break;
    case "right":
      d += " M 50,50 100,50";
      if (type === "arrowhead") d += " M 80,40 100,50 80,60";
      break;
  }
  return (
    // <svg x="0" y="0" width="100%" height="100%" viewBox="0 0 100 100">
    <path d={d} stroke="red" strokeWidth={3} fill="none" />
    // </svg>
  );
}

function Line(d: FlowchartArrow) {
  const lines = [];
  for (const [direction, type] of Object.entries(d.directions)) {
    lines.push(LineSegment(type, direction as any));
  }
  return (
    <svg
      key={d.coordinates.toString()}
      className="h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      style={{
        gridColumnStart: d.coordinates[0],
        gridRowStart: d.coordinates[1],
      }}
    >
      {...lines}
    </svg>
  );
}

function Process(d: FlowchartProcess) {
  return (
    <div
      key={d.coordinates.toString()}
      className={cn("border-green-9 border-2 p-4")}
      style={{
        gridColumnStart: d.coordinates[0],
        gridRowStart: d.coordinates[1],
      }}
    >
      {d.text}
    </div>
  );
}

export function Test() {
  const [variant, setVariant] = useState("initial");
  return (
    <div className="mt-4">
      <motion.div
        className="h-20 w-20 border-2"
        variants={variants}
        animate={variant}
        initial="initial"
      >
        Hello!
      </motion.div>
      <button
        onClick={() =>
          setVariant((x) => (x === "initial" ? "active" : "initial"))
        }
      >
        Change
      </button>
      <div className="grid grid-cols-[2fr_1fr_2fr_1fr_2fr_1fr_2fr_1fr_2fr] grid-rows-[200px_100px_200px_100px_200px_100px_200px]">
        {/* <div style={{ gridRowStart: 1, gridColumnStart: 1 }}>First</div>
        <div className="col-start-2 row-start-2">Second</div> */}
        {flowchartSteps.map((x, i) =>
          x.type === "process" ? Process(x) : Line(x),
        )}
      </div>
    </div>
  );
}
