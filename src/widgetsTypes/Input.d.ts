import { Hovered, WidgetArguments, WidgetEvent, WidgetEvents, WidgetState } from ".";

type InputArguments<T> = [Text?: string, Increment?: T, Min?: T, Max?: T, Format?: string | string[]];
type InputNumArguments = [...InputArguments<number>, NoButtons?: boolean];

type InputEvents = {
	numberChanged: WidgetEvent;
} & Hovered;

type InputState<T> = {
	number: T;
	editingText: boolean;
};

type ColorInputArguments = [Text?: string, UseFloats?: boolean, UseHSV?: boolean, Format?: string | string[]];
type ColorInputState = {
	color: Color3;
	editingText: boolean;
};
type Color4InputState = {
	transparency: number;
} & ColorInputState;

type InputWidgetCreation<T> = WidgetArguments<InputArguments<T>> &
	WidgetEvents<InputEvents> &
	WidgetState<InputState<T>>;

export type InputNumCreation = WidgetArguments<InputNumArguments> &
	WidgetEvents<InputEvents> &
	WidgetState<InputState<number>>;

export type InputRectCreation = InputWidgetCreation<Rect>;
export type InputUDimCreation = InputWidgetCreation<UDim>;
export type InputUDim2Creation = InputWidgetCreation<UDim2>;
export type InputVector2Creation = InputWidgetCreation<Vector2>;
export type InputVector3Creation = InputWidgetCreation<Vector3>;

export type DragNumCreation = InputWidgetCreation<number>;

export type InputColor3Creation = WidgetArguments<ColorInputArguments> &
	WidgetEvents<InputEvents> &
	WidgetState<ColorInputState>;
export type InputColor4Creation = WidgetArguments<ColorInputArguments> &
	WidgetEvents<InputEvents> &
	WidgetState<Color4InputState>;
