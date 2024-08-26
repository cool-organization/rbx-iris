import { Hovered, WidgetArguments, WidgetEvents, WidgetState } from "./creation/utils";
import { EventApi } from "./creation/widgetClass";

type InputArguments<T> = [Text?: string, Increment?: T, Min?: T, Max?: T, Format?: string | string[]];
type InputNumArguments = [...InputArguments<number>, NoButtons?: boolean];

type InputEvents = {
	numberChanged: EventApi;
} & Hovered;

type InputState<T> = {
	number: T;
	editingText: boolean;
};

type InputColorArguments = [Text?: string, UseFloats?: boolean, UseHSV?: boolean, Format?: string | string[]];
type InputColorState = {
	color: Color3;
	editingText: boolean;
};
type InputColor4State = {
	transparency: number;
} & InputColorState;

type InputWidgetDeclaration<T> = WidgetArguments<InputArguments<T>> & WidgetEvents<InputEvents> & WidgetState<InputState<T>>;

export type InputNumDeclaration = WidgetArguments<InputNumArguments> & WidgetEvents<InputEvents> & WidgetState<InputState<number>>;

export type InputColor3Declaration = WidgetArguments<InputColorArguments> & WidgetEvents<InputEvents> & WidgetState<InputColorState>;
export type InputColor4Declaration = WidgetArguments<InputColorArguments> & WidgetEvents<InputEvents> & WidgetState<InputColor4State>;
