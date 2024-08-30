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

// type ActiveOperandsFlags = Range<0, 1024>;
type ActiveOperandsFlags = number;
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

export enum ActiveOperands {
  ON_BATTERY = 1,
  OFF_BATTERY = 2,
  GROUP_1_ACTIVE = 4,
  GROUP_2_ACTIVE = 8,
  ALL_PIS_SHUTDOWN = 16,
  GROUP_3_ACTIVE = 32,
  CHARGE_GREATER_95 = 64,
  CHARGE_LESS_95 = 128,
  NAS_ON = 256,
  NAS_OFF = 512,
}

export type FlowchartItemBase = {
  // [x1, y1, x2, y2]
  location: [number, number, number, number];
  activeOperands?: ActiveOperandsFlags;
  scenario: number;
};

export type FlowchartProcess = FlowchartItemBase & {
  text: string;
  type: "process";
};

export type FlowchartArrow = FlowchartItemBase & {
  headLength?: number;
  location: [number, number, number, number];
  text?: string;
  textOffset?: [number, number];
  type: "arrow";
};

export type FlowchartLine = FlowchartItemBase & {
  location: [number, number, number, number];
  text?: string;
  type: "line";
};

export type FlowchartItem = FlowchartProcess | FlowchartArrow | FlowchartLine;

const SHIFT_UP_LEFT_OFFSET: [number, number] = [-0.1, 0.1],
  SHIFT_UP_RIGHT_OFFSET: [number, number] = [0.12, 0.1],
  LEFT_OFFSET: [number, number] = [0.16, 0.09];

export const flowchartSteps: FlowchartItem[] = [
  // START
  {
    location: [0, 4.25, 1, 5],
    scenario: ALL_SCENARIOS,
    text: "Start",
    type: "process",
  },
  {
    location: [1, 4.625, 1.5, 4.625],
    scenario: ALL_SCENARIOS,
    type: "arrow",
  },
  {
    location: [1.5, 4.25, 2.5, 5],
    scenario: ALL_SCENARIOS,
    text: "Is PSU on battery?",
    type: "process",
  },

  // ON BATTERY
  {
    activeOperands: ActiveOperands.ON_BATTERY,
    location: [2.5, 4.625, 3, 4.625],
    scenario: ALL_ON_BAT_SCENARIOS,
    text: "Yes",
    textOffset: SHIFT_UP_LEFT_OFFSET,
    type: "arrow",
  },
  {
    activeOperands: ActiveOperands.ON_BATTERY + ActiveOperands.GROUP_1_ACTIVE,
    location: [3, 4.25, 4, 5],
    scenario: ALL_ON_BAT_SCENARIOS,
    text: "Deactivate Group 1",
    type: "process",
  },
  {
    activeOperands: ActiveOperands.ON_BATTERY + ActiveOperands.GROUP_1_ACTIVE,
    location: [4, 4.625, 4.5, 4.625],
    scenario: ALL_ON_BAT_SCENARIOS,
    type: "arrow",
  },
  {
    location: [4.5, 4.25, 5.5, 5],
    scenario: Scenarios.ALL_PIS_SHUTDOWN,
    text: "All Pis shut down?",
    type: "process",
  },
  {
    activeOperands: ActiveOperands.ALL_PIS_SHUTDOWN,
    location: [5.5, 4.625, 6, 4.625],
    scenario: Scenarios.ALL_PIS_SHUTDOWN,
    type: "arrow",
  },
  {
    activeOperands: ActiveOperands.ALL_PIS_SHUTDOWN,
    location: [6, 4.25, 7, 5],
    scenario: Scenarios.ON_BAT_LOW_CHARGE + Scenarios.ALL_PIS_SHUTDOWN,
    text: "Shut down Pi Switch",
    type: "process",
  },
  {
    location: [2.75, 4.625, 2.75, 2.115],
    scenario:
      Scenarios.ON_BAT_FULL_CHARGE +
      Scenarios.ON_BAT_MID_CHARGE +
      Scenarios.ON_BAT_LOW_CHARGE,
    type: "line",
  },
  {
    location: [2.75, 3.375, 3, 3.375],
    scenario:
      Scenarios.ON_BAT_FULL_CHARGE +
      Scenarios.ON_BAT_MID_CHARGE +
      Scenarios.ON_BAT_LOW_CHARGE,
    type: "arrow",
  },
  {
    activeOperands: ActiveOperands.ON_BATTERY,
    location: [3, 3, 4, 3.75],
    scenario: Scenarios.ON_BAT_MID_CHARGE + Scenarios.ON_BAT_LOW_CHARGE,
    text: "Charge < 85%?",
    type: "process",
  },
  {
    activeOperands: ActiveOperands.GROUP_2_ACTIVE,
    location: [4, 3.375, 4.5, 3.375],
    scenario: Scenarios.ON_BAT_MID_CHARGE + Scenarios.ON_BAT_LOW_CHARGE,
    text: "Yes",
    textOffset: SHIFT_UP_LEFT_OFFSET,
    type: "arrow",
  },
  {
    activeOperands: ActiveOperands.GROUP_2_ACTIVE,
    location: [4.5, 3, 5.5, 3.75],
    scenario: Scenarios.ON_BAT_MID_CHARGE + Scenarios.ON_BAT_LOW_CHARGE,
    text: "Deactivate Group 2",
    type: "process",
  },
  {
    activeOperands: ActiveOperands.ON_BATTERY,
    location: [5, 3.75, 5, 4.25],
    scenario: Scenarios.ON_BAT_MID_CHARGE + Scenarios.ON_BAT_LOW_CHARGE,
    type: "arrow",
  },
  {
    location: [2.75, 2.125, 3, 2.125],
    scenario:
      Scenarios.ON_BAT_FULL_CHARGE +
      Scenarios.ON_BAT_MID_CHARGE +
      Scenarios.ON_BAT_LOW_CHARGE,
    type: "arrow",
  },
  {
    activeOperands: ActiveOperands.ON_BATTERY,
    location: [3, 1.75, 4, 2.5],
    scenario: Scenarios.ON_BAT_LOW_CHARGE,
    text: "Charge <= 40%?",
    type: "process",
  },
  {
    activeOperands: ActiveOperands.GROUP_3_ACTIVE,
    location: [4, 2.125, 4.5, 2.125],
    scenario: Scenarios.ON_BAT_LOW_CHARGE,
    text: "Yes",
    textOffset: SHIFT_UP_LEFT_OFFSET,
    type: "arrow",
  },
  {
    activeOperands: ActiveOperands.GROUP_3_ACTIVE,
    location: [4.5, 1.75, 5.5, 2.5],
    scenario: Scenarios.ON_BAT_LOW_CHARGE,
    text: "Shut down NAS",
    type: "process",
  },
  {
    activeOperands: ActiveOperands.GROUP_3_ACTIVE,
    location: [5.5, 2.125, 6.5, 2.125],
    scenario: Scenarios.ON_BAT_LOW_CHARGE,
    type: "line",
  },
  {
    activeOperands: ActiveOperands.GROUP_3_ACTIVE,
    location: [6.5, 2.115, 6.5, 4.25],
    scenario: Scenarios.ON_BAT_LOW_CHARGE,
    type: "arrow",
  },

  // OFF BATTERY
  {
    activeOperands: ActiveOperands.OFF_BATTERY,
    location: [2, 4.25, 2, 3.75],
    scenario:
      Scenarios.OFF_BAT_NO_CHARGE +
      Scenarios.OFF_BAT_CHARGE_NAS_OFF +
      Scenarios.OFF_BAT_CHARGE_NAS_ON,
    text: "No",
    textOffset: LEFT_OFFSET,
    type: "arrow",
  },
  {
    activeOperands: ActiveOperands.CHARGE_LESS_95,
    location: [0, 3, 1, 3.75],
    scenario: Scenarios.OFF_BAT_NO_CHARGE,
    text: "Wait for charge",
    type: "process",
  },
  {
    activeOperands: ActiveOperands.CHARGE_LESS_95,
    location: [1.5, 3.375, 1, 3.375],
    scenario: Scenarios.OFF_BAT_NO_CHARGE,
    textOffset: SHIFT_UP_RIGHT_OFFSET,
    text: "No",
    type: "arrow",
  },

  {
    activeOperands: ActiveOperands.ON_BATTERY,
    location: [1.5, 3, 2.5, 3.75],
    scenario:
      Scenarios.OFF_BAT_NO_CHARGE +
      Scenarios.OFF_BAT_CHARGE_NAS_OFF +
      Scenarios.OFF_BAT_CHARGE_NAS_ON,
    text: "Charge > 95%?",
    type: "process",
  },

  {
    activeOperands: ActiveOperands.CHARGE_GREATER_95,
    location: [2, 3, 2, 2.5],
    scenario:
      Scenarios.OFF_BAT_CHARGE_NAS_OFF + Scenarios.OFF_BAT_CHARGE_NAS_ON,
    text: "Yes",
    textOffset: LEFT_OFFSET,
    type: "arrow",
  },

  {
    activeOperands: ActiveOperands.NAS_ON,
    location: [2, 1.75, 2, 1.25],
    scenario: Scenarios.OFF_BAT_CHARGE_NAS_ON,
    text: "Yes",
    textOffset: LEFT_OFFSET,
    type: "arrow",
  },
  {
    activeOperands: ActiveOperands.NAS_ON,
    location: [1.5, 0.5, 2.5, 1.25],
    scenario: Scenarios.OFF_BAT_CHARGE_NAS_ON,
    text: "Turn Pis back on",
    type: "process",
  },
  {
    activeOperands: ActiveOperands.CHARGE_GREATER_95,
    location: [1.5, 1.75, 2.5, 2.5],
    scenario:
      Scenarios.OFF_BAT_CHARGE_NAS_OFF + Scenarios.OFF_BAT_CHARGE_NAS_ON,
    text: "Is NAS on?",
    type: "process",
  },
  {
    activeOperands: ActiveOperands.NAS_OFF,
    location: [0, 1.75, 1, 2.5],
    scenario: Scenarios.OFF_BAT_CHARGE_NAS_OFF,
    text: "Pis stay off",
    type: "process",
  },
  {
    activeOperands: ActiveOperands.NAS_OFF,
    location: [1.5, 2.125, 1, 2.125],
    scenario: Scenarios.OFF_BAT_CHARGE_NAS_OFF,
    text: "No",
    textOffset: SHIFT_UP_RIGHT_OFFSET,
    type: "arrow",
  },
];
