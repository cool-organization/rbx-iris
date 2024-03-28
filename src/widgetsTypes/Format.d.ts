import { WidgetArguments } from ".";

type IndentArguments = [Width?: number];
type SameLineArguments = [Width?: number, VerticalAlignment?: Enum.VerticalAlignment];

export type IndentCreation = WidgetArguments<IndentArguments>;
export type SameLineCreation = WidgetArguments<SameLineArguments>;
