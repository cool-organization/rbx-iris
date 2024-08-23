import { State } from "../../..";
import { EventApi } from "./widgetClass";

type WidgetArguments<T extends Array<unknown>> = {
	Arguments: T;
};

type WidgetState<T extends object> = {
	State: T;
};

type WidgetEvents<T extends object> = {
	Events: T;
};
type WidgetExtra<T extends Array<unknown>> = {
	Extra: T;
};
type WidgetDeclaration = Partial<WidgetArguments<Array<unknown>> & WidgetState<object> & WidgetEvents<object> & WidgetExtra<Array<unknown>>>;

//---[[Events]]---//

//-----------------------
type Hovered = {
	hovered: EventApi;
};
//-----------------------
type Clicked = {
	clicked: EventApi;
};
type RightClicked = {
	rightClicked: EventApi;
};
type CtrlClicked = {
	ctrlClicked: EventApi;
};
type DoubleClicked = {
	doubleClicked: EventApi;
};
//-----------------------
type Opened = {
	opened: EventApi;
};
type Closed = {
	closed: EventApi;
};
//-----------------------
type Selected = {
	selected: EventApi;
};
type Unselected = {
	unselected: EventApi;
};
type Active = {
	active: EventApi;
};
//-----------------------
type Collapsed = {
	collapsed: EventApi;
};
type Uncollapsed = {
	uncollapsed: EventApi;
};
//-----------------------
type Checked = {
	checked: EventApi;
};
type Unchecked = {
	unchecked: EventApi;
};
//-----------------------
type NumberChanged = {
	numberChanged: EventApi;
};

//Grouping
type ClickEvents = Clicked & RightClicked & DoubleClicked & CtrlClicked;
type OpenEvents = Opened & Closed;
type CheckEvents = Checked & Unchecked;
type SelectEvents = Selected & Unselected;
type CollapseEvents = Collapsed & Uncollapsed;

// typing creators
type TupleOmit = "length" | "0";
type TupleToObject<T extends any[], C extends any[] = [undefined, ...T]> = Omit<C, keyof C[] | (TupleOmit extends keyof C ? TupleOmit : never)>;
type Arguments<T extends Array<unknown>> = TupleToObject<[...T, undefined?]>;

type StateOrLiteral<T> = State<T> | T;
type InitialState<T extends Record<string, unknown>> = {
	[P in keyof T]?: StateOrLiteral<T[P]>;
};
