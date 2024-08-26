import { Hovered, WidgetArguments, WidgetEvents, WidgetState } from "./creation/utils";
import { EventApi } from "./creation/widgetClass";

type TextArguments = [Text: string, Wrapped?: boolean, Color?: Color3, RichText?: boolean];
type TextEvents = Hovered;

type InputTextArguments = [Text?: string, TextHint?: string];
type InputTextState = {
	text: string;
};
type InputTextEvents = {
	textChanged: EventApi;
} & Hovered;

type TextWrappedArguments = [Text: string];
type SeparatorTextArguments = [Text: string];

type TextColoredArguments = [Text: string, Color: Color3];

export type InputTextDeclaration = WidgetArguments<InputTextArguments> & WidgetState<InputTextState> & WidgetEvents<InputTextEvents>;

export type SeparatorTextDeclaration = WidgetArguments<SeparatorTextArguments>;

export type TextDeclaration = WidgetArguments<TextArguments> & WidgetEvents<TextEvents>;
export type TextWrappedDeclaration = WidgetArguments<TextWrappedArguments> & WidgetEvents<TextEvents>;
export type TextColoredDeclaration = WidgetArguments<TextColoredArguments> & WidgetEvents<TextEvents>;
