import { Hovered, WidgetArguments, WidgetEvent, WidgetEvents, WidgetState } from ".";

type ProgressBarArguments = [Text?: string, Format?: string];
type ProgressBarEvents = {
	changed: WidgetEvent;
} & Hovered;
type ProgressBarState = {
	progress: number;
};

export type ProgressBarCreation = WidgetArguments<ProgressBarArguments> &
	WidgetEvents<ProgressBarEvents> &
	WidgetState<ProgressBarState>;
