// Ripped from https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range/70307091#70307091
type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type ScenarioFlags = Range<0, 128>;

export enum Scenarios {
  OFF_BAT_NO_CHARGE = 1,
  OFF_BAT_CHARGE_NAS_ON = 2,
  OFF_BAT_CHARGE_NAS_OFF = 4,
  ON_BAT_FULL_CHARGE = 8,
  ON_BAT_MID_CHARGE = 16,
  ON_BAT_LOW_CHARGE = 32,
  ALL_PIS_SHUTDOWN = 64,
}

const ALL_SCENARIOS: ScenarioFlags = 127;
const ALL_ON_BAT_SCENARIOS: ScenarioFlags = 56;

export type FlowchartItemBase = {
  // [x, y]
  coordinates: [number, number];
  scenario: number;
};

export type FlowchartProcess = FlowchartItemBase & {
  text: string;
  type: "process";
};

export type Direction = "up" | "down" | "left" | "right";
export type ArrowOption = "line" | "arrowhead";

export type FlowchartArrow = FlowchartItemBase & {
  directions: Partial<Record<Direction, ArrowOption>>;
  text?: string;
  textOffset?: [number, number];
  type: "arrow";
};

export type FlowchartItem = FlowchartProcess | FlowchartArrow;

const SHIFT_UP_LEFT_OFFSET: [number, number] = [-0.1, 0.1],
  SHIFT_UP_RIGHT_OFFSET: [number, number] = [0.12, 0.1],
  LEFT_OFFSET: [number, number] = [0.16, 0.09];

export const flowchartSteps: FlowchartItem[] = [
  // START
  {
    coordinates: [1, 1],
    scenario: ALL_SCENARIOS,
    text: "Start",
    type: "process",
  },
  {
    coordinates: [2, 1],
    directions: {
      left: "line",
      right: "arrowhead",
    },
    scenario: ALL_SCENARIOS,
    type: "arrow",
  },
  {
    coordinates: [3, 1],
    scenario: ALL_SCENARIOS,
    text: "Is PSU on battery?",
    type: "process",
  },

  // ON BATTERY
  {
    // colSpan: 2,
    coordinates: [4, 1],
    directions: {
      down: "line",
      left: "line",
      right: "arrowhead",
    },
    scenario: ALL_ON_BAT_SCENARIOS,
    text: "Yes",
    textOffset: SHIFT_UP_LEFT_OFFSET,
    type: "arrow",
  },
  {
    coordinates: [5, 1],
    scenario: ALL_ON_BAT_SCENARIOS,
    text: "Deactivate Group 1",
    type: "process",
  },
  {
    coordinates: [6, 1],
    directions: {
      left: "line",
      right: "arrowhead",
    },
    scenario: ALL_ON_BAT_SCENARIOS,
    type: "arrow",
  },
  {
    coordinates: [7, 1],
    scenario: Scenarios.ALL_PIS_SHUTDOWN,
    text: "All Pis shut down?",
    type: "process",
  },
  {
    coordinates: [8, 1],
    directions: {
      left: "line",
      right: "arrowhead",
    },
    scenario: Scenarios.ALL_PIS_SHUTDOWN,
    type: "arrow",
  },
  {
    coordinates: [9, 1],
    scenario: Scenarios.ON_BAT_LOW_CHARGE + Scenarios.ALL_PIS_SHUTDOWN,
    text: "Shut down Pi Switch",
    type: "process",
  },
  {
    coordinates: [4, 2],
    directions: {
      down: "line",
      up: "line",
    },
    scenario:
      Scenarios.ON_BAT_FULL_CHARGE +
      Scenarios.ON_BAT_MID_CHARGE +
      Scenarios.ON_BAT_LOW_CHARGE,
    type: "arrow",
  },
  {
    coordinates: [5, 3],
    scenario: Scenarios.ON_BAT_MID_CHARGE + Scenarios.ON_BAT_LOW_CHARGE,
    text: "Charge < 85%?",
    type: "process",
  },
  {
    coordinates: [6, 3],
    directions: {
      left: "line",
      right: "arrowhead",
    },
    scenario: Scenarios.ON_BAT_MID_CHARGE + Scenarios.ON_BAT_LOW_CHARGE,
    text: "Yes",
    textOffset: SHIFT_UP_LEFT_OFFSET,
    type: "arrow",
  },
  {
    coordinates: [7, 3],
    scenario: Scenarios.ON_BAT_MID_CHARGE + Scenarios.ON_BAT_LOW_CHARGE,
    text: "Deactivate Group 2",
    type: "process",
  },
  {
    coordinates: [7, 2],
    directions: {
      down: "line",
      up: "arrowhead",
    },
    scenario: Scenarios.ON_BAT_MID_CHARGE + Scenarios.ON_BAT_LOW_CHARGE,
    type: "arrow",
  },
  {
    coordinates: [4, 5],
    directions: {
      right: "arrowhead",
      up: "line",
    },
    scenario:
      Scenarios.ON_BAT_FULL_CHARGE +
      Scenarios.ON_BAT_MID_CHARGE +
      Scenarios.ON_BAT_LOW_CHARGE,
    type: "arrow",
  },
  {
    coordinates: [5, 5],
    scenario: Scenarios.ON_BAT_LOW_CHARGE,
    text: "Charge <= 40%?",
    type: "process",
  },
  {
    coordinates: [6, 5],
    directions: {
      left: "line",
      right: "arrowhead",
    },
    scenario: Scenarios.ON_BAT_LOW_CHARGE,
    text: "Yes",
    textOffset: SHIFT_UP_LEFT_OFFSET,
    type: "arrow",
  },
  {
    coordinates: [7, 5],
    scenario: Scenarios.ON_BAT_LOW_CHARGE,
    text: "Shut down NAS",
    type: "process",
  },
  {
    coordinates: [8, 4],
    directions: {
      left: "line",
      right: "line",
    },
    scenario: Scenarios.ON_BAT_LOW_CHARGE,
    type: "arrow",
  },

  // OFF BATTERY
  {
    coordinates: [3, 2],
    directions: {
      down: "arrowhead",
      up: "line",
    },
    scenario:
      Scenarios.OFF_BAT_NO_CHARGE +
      Scenarios.OFF_BAT_CHARGE_NAS_OFF +
      Scenarios.OFF_BAT_CHARGE_NAS_ON,
    text: "No",
    textOffset: LEFT_OFFSET,
    type: "arrow",
  },
  {
    coordinates: [1, 3],
    scenario: Scenarios.OFF_BAT_NO_CHARGE,
    text: "Wait for charge",
    type: "process",
  },
  {
    coordinates: [2, 3],
    directions: {
      left: "arrowhead",
      right: "line",
    },
    scenario: Scenarios.OFF_BAT_NO_CHARGE,
    textOffset: SHIFT_UP_RIGHT_OFFSET,
    text: "No",
    type: "arrow",
  },
  {
    coordinates: [3, 3],
    scenario:
      Scenarios.OFF_BAT_NO_CHARGE +
      Scenarios.OFF_BAT_CHARGE_NAS_OFF +
      Scenarios.OFF_BAT_CHARGE_NAS_ON,
    text: "Charge > 95%?",
    type: "process",
  },
  {
    coordinates: [3, 4],
    directions: {
      down: "arrowhead",
      up: "line",
    },
    scenario:
      Scenarios.OFF_BAT_CHARGE_NAS_OFF + Scenarios.OFF_BAT_CHARGE_NAS_ON,
    text: "Yes",
    textOffset: LEFT_OFFSET,
    type: "arrow",
  },

  {
    coordinates: [3, 5],
    scenario:
      Scenarios.OFF_BAT_CHARGE_NAS_OFF + Scenarios.OFF_BAT_CHARGE_NAS_ON,
    text: "Is NAS on?",
    type: "process",
  },
  {
    coordinates: [2, 5],
    directions: {
      left: "arrowhead",
      right: "line",
    },
    scenario: Scenarios.OFF_BAT_CHARGE_NAS_OFF,
    text: "No",
    textOffset: SHIFT_UP_RIGHT_OFFSET,
    type: "arrow",
  },
  {
    coordinates: [1, 5],
    scenario: Scenarios.OFF_BAT_CHARGE_NAS_OFF,
    text: "Pis stay off",
    type: "process",
  },
  {
    coordinates: [3, 6],
    directions: {
      down: "arrowhead",
      up: "line",
    },
    scenario: Scenarios.OFF_BAT_CHARGE_NAS_ON,
    text: "Yes",
    textOffset: LEFT_OFFSET,
    type: "arrow",
  },
  {
    coordinates: [3, 7],
    scenario: Scenarios.OFF_BAT_CHARGE_NAS_ON,
    text: "Turn Pis back on",
    type: "process",
  },
];
