import { Hovered, WidgetArguments, WidgetEvents, WidgetState } from "./creation/utils";
import { EventApi } from "./creation/widgetClass";

type ProgressBarArguments = [Text?: string, Format?: string];
type ProgressBarEvents = {
	changed: EventApi;
} & Hovered;
type ProgressBarState = {
	progress: number;
};

export type ProgressBarDeclaration = WidgetArguments<ProgressBarArguments> & WidgetEvents<ProgressBarEvents> & WidgetState<ProgressBarState>;
