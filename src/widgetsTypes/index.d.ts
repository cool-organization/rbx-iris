export type WidgetArguments<T extends Array<unknown>> = {
	Arguments: T;
};

export type WidgetState<T extends object> = {
	State: T;
};

export type WidgetEvents<T extends object> = {
	Events: T;
};
export type WidgetExtra<T extends Array<unknown>> = {
	Extra: T;
};
export type WidgetConstructorInfo = Partial<
	WidgetArguments<Array<unknown>> & WidgetState<object> & WidgetEvents<object> & WidgetExtra<Array<unknown>>
>;

//---[[Events]]---//
export type WidgetEvent = () => boolean;

//-----------------------
export type Hovered = {
	hovered: WidgetEvent;
};
//-----------------------
export type Clicked = {
	clicked: WidgetEvent;
};
export type RightClicked = {
	rightClicked: WidgetEvent;
};
export type CtrlClicked = {
	ctrlClicked: WidgetEvent;
};
export type DoubleClicked = {
	doubleClicked: WidgetEvent;
};
//-----------------------
export type Opened = {
	opened: WidgetEvent;
};
export type Closed = {
	closed: WidgetEvent;
};
//-----------------------
export type Selected = {
	selected: WidgetEvent;
};
export type Unselected = {
	unselected: WidgetEvent;
};
export type Active = {
	active: WidgetEvent;
};
//-----------------------
export type Collapsed = {
	collapsed: WidgetEvent;
};
export type Uncollapsed = {
	uncollapsed: WidgetEvent;
};
//-----------------------
export type Checked = {
	checked: WidgetEvent;
};
export type Unchecked = {
	unchecked: WidgetEvent;
};
//-----------------------
export type NumberChanged = {
	numberChanged: WidgetEvent;
};

//Grouping
export type ClickEvents = Clicked & RightClicked & DoubleClicked & CtrlClicked;
export type OpenEvents = Opened & Closed;
export type CheckEvents = Checked & Unchecked;
export type SelectEvents = Selected & Unselected;
export type CollapseEvents = Collapsed & Uncollapsed;
