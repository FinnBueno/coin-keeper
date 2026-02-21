import type { FC } from "react";

export type FlowStepComponent = FC<{ goNext: () => void; goBack: () => void }>;
