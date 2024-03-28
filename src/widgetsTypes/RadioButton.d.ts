import { Active, Hovered, SelectEvents, WidgetArguments, WidgetEvents, WidgetState } from ".";

type RadioButtonArguments = [Text: string, Index: unknown];
type RadioButtonEvents = Hovered & SelectEvents & Active;
type RadioButtonState = {
	index: unknown;
};

export type RadioButtonCreation = WidgetArguments<RadioButtonArguments> &
	WidgetState<RadioButtonState> &
	WidgetEvents<RadioButtonEvents>;
