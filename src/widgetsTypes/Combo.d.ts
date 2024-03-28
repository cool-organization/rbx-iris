import {
	Active,
	ClickEvents,
	Clicked,
	Hovered,
	OpenEvents,
	SelectEvents,
	WidgetArguments,
	WidgetEvents,
	WidgetExtra,
	WidgetState,
} from ".";

type ComboArguments = [Text: string, NoButton?: boolean, NoPreview?: boolean];

type ComboEvents = Hovered & Clicked & OpenEvents;

type ComboState = {
	index: unknown;
	isOpened: boolean;
};

type ComboArrayExtra = [selectionArray: unknown[]];
type ComboEnumExtra = [enumType: Enum];

type SelectableArguments = [Text: string, Index: unknown, NoClick?: boolean];
type SelectableEvents = Hovered & ClickEvents & SelectEvents & Active;
type SelectableState = {
	index: unknown;
};

export type ComboCreation = WidgetArguments<ComboArguments> & WidgetEvents<ComboEvents> & WidgetState<ComboState>;
export type ComboArrayCreation = WidgetArguments<ComboArguments> &
	WidgetEvents<ComboEvents> &
	WidgetState<ComboState> &
	WidgetExtra<ComboArrayExtra>;
export type ComboEnumCreation = WidgetArguments<ComboArguments> &
	WidgetEvents<ComboEvents> &
	WidgetState<ComboState> &
	WidgetExtra<ComboEnumExtra>;
export type SelectableCreation = WidgetArguments<SelectableArguments> &
	WidgetEvents<SelectableEvents> &
	WidgetState<SelectableState>;
