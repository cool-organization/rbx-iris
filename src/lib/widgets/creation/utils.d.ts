import { EventApi } from "./widgetClass";

interface State<T = unknown> {
	readonly value: T;
	get(): T;
	set(newValue: T): void;
	onChange(connect: (value: T) => void): () => void;
	changed(): boolean;
}

//---[[Events]]---//

type Hovered = { hovered: EventApi };
type Clicked = { clicked: EventApi };
type RightClicked = { rightClicked: EventApi };
type CtrlClicked = { ctrlClicked: EventApi };
type DoubleClicked = { doubleClicked: EventApi };
type Opened = { opened: EventApi };
type Closed = { closed: EventApi };
type Selected = { selected: EventApi };
type Unselected = { unselected: EventApi };
type Active = { active: EventApi };
type Collapsed = { collapsed: EventApi };
type Uncollapsed = { uncollapsed: EventApi };
type Checked = { checked: EventApi };
type Unchecked = { unchecked: EventApi };
type NumberChanged = { numberChanged: EventApi };

// Grouping
type ClickEvents = Clicked & RightClicked & DoubleClicked & CtrlClicked;
type OpenEvents = Opened & Closed;
type CheckEvents = Checked & Unchecked;
type SelectEvents = Selected & Unselected;
type CollapseEvents = Collapsed & Uncollapsed;

// Declaration helpers (used by individual widget .d.ts files)
type WidgetArguments<T extends Array<unknown>> = { Arguments: T };
type WidgetState<T extends object> = { State: T };
type WidgetEvents<T extends object> = { Events: T };
type WidgetExtra<T extends Array<unknown>> = { Extra: T };
type WidgetDeclaration = Partial<
	WidgetArguments<Array<unknown>> & WidgetState<object> & WidgetEvents<object> & WidgetExtra<Array<unknown>>
>;

type StateOrLiteral<T> = State<T> | T;
type InitialState<T extends Record<string, unknown>> = {
	[P in keyof T]?: StateOrLiteral<T[P]>;
};

export {
	Active,
	Checked,
	CheckEvents,
	Clicked,
	ClickEvents,
	Closed,
	Collapsed,
	CollapseEvents,
	CtrlClicked,
	DoubleClicked,
	Hovered,
	InitialState,
	NumberChanged,
	Opened,
	OpenEvents,
	RightClicked,
	Selected,
	SelectEvents,
	State,
	StateOrLiteral,
	Unchecked,
	Uncollapsed,
	Unselected,
	WidgetArguments,
	WidgetDeclaration,
	WidgetEvents,
	WidgetExtra,
	WidgetState,
};
