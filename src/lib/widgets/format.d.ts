import { WidgetArguments } from "./creation/utils";

type IndentArguments = [Width?: number];
type SameLineArguments = [Width?: number, VerticalAlignment?: Enum.VerticalAlignment];

export type IndentDeclaration = WidgetArguments<IndentArguments>;
export type SameLineDeclaration = WidgetArguments<SameLineArguments>;
