import { Hovered, WidgetArguments, WidgetEvent, WidgetEvents, WidgetState } from ".";

type TextArguments = [Text: string, Wrapped?: boolean, Color?: Color3, RichText?: boolean];
type TextEvents = Hovered;

type InputTextArguments = [Text?: string, TextHint?: string];
type InputTextState = {
	text: string;
};
type InputTextEvents = {
	textChanged: WidgetEvent;
} & Hovered;

type TextWrappedArguments = [Text: string];
type SeparatorTextArguments = [Text: string];

type TextColoredArguments = [Text: string, Color: Color3];

export type InputTextCreation = WidgetArguments<InputTextArguments> &
	WidgetState<InputTextState> &
	WidgetEvents<InputTextEvents>;

export type SeparatorTextCreation = WidgetArguments<SeparatorTextArguments>;

export type TextCreation = WidgetArguments<TextArguments> & WidgetEvents<TextEvents>;
export type TextWrappedCreation = WidgetArguments<TextWrappedArguments> & WidgetEvents<TextEvents>;
export type TextColoredCreation = WidgetArguments<TextColoredArguments> & WidgetEvents<TextEvents>;
