import { Active, Hovered, SelectEvents, WidgetArguments, WidgetEvents, WidgetState } from "./creation/utils";

type RadioButtonArguments = [Text: string, Index: unknown];
type RadioButtonEvents = Hovered & SelectEvents & Active;
type RadioButtonState = {
	index: unknown;
};

export type RadioButtonDeclaration = WidgetArguments<RadioButtonArguments> &
	WidgetState<RadioButtonState> &
	WidgetEvents<RadioButtonEvents>;
