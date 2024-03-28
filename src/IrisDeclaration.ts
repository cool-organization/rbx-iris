import { IrisInternal } from "./Internal";
import { WidgetEnums } from "./types";
import { WidgetConstructorInfo } from "./widgetsTypes";
import { ButtonCreation, SmallButtonCreation } from "./widgetsTypes/Button";
import { CheckboxCreation } from "./widgetsTypes/Checkbox";
import { ComboArrayCreation, ComboCreation, ComboEnumCreation, SelectableCreation } from "./widgetsTypes/Combo";
import { IndentCreation, SameLineCreation } from "./widgetsTypes/Format";
import {
	DragNumCreation,
	InputColor3Creation,
	InputColor4Creation,
	InputNumCreation,
	InputRectCreation,
	InputUDim2Creation,
	InputUDimCreation,
	InputVector2Creation,
	InputVector3Creation,
} from "./widgetsTypes/Input";
import { MenuCreation, MenuItemCreation, MenuToggleCreation } from "./widgetsTypes/Menu";
import { ProgressBarCreation } from "./widgetsTypes/Plot";
import { RadioButtonCreation } from "./widgetsTypes/RadioButton";
import { TableCreation } from "./widgetsTypes/Table";
import {
	InputTextCreation,
	SeparatorTextCreation,
	TextColoredCreation,
	TextCreation,
	TextWrappedCreation,
} from "./widgetsTypes/Text";
import { CollapsingHeaderCreation, TreeCreation } from "./widgetsTypes/Tree";
import { TooltipCreation, WindowCreation } from "./widgetsTypes/Window";

export interface State<T = unknown> {
	readonly value: T;
	// ConnectedWidgets: Record<ID, Widget>;
	// ConnectedFunctions: Array<(value: unknown) => void>;

	get(): T;
	set(newValue: T): void;
	onChange(functionToConnect: (value: T) => void): void;
}
export type WidgetID = string;
export type WidgetArguments = [...any] | Record<number, unknown>;
export type WidgetStates = Record<string, unknown | State<unknown>>;

type Stateify<T extends object> = { [P in keyof T]: State<T[P]> };
export type StateOrLiteral<T extends object> = { [P in keyof T]: T[P] | State<T[P]> };

type TupleOmit = "length" | "0";
type TupleToObject<T extends any[], C extends any[] = [undefined, ...T]> = Omit<
	C,
	keyof C[] | (TupleOmit extends keyof C ? TupleOmit : never)
>;
export type Argumentify<T extends Array<unknown>> = T | TupleToObject<[...T, undefined?]>;

export type Event = {
	Init: (widget: Widget) => void;
	Get: (Widget: Widget) => boolean;
};

export interface Events {
	active: () => boolean;
	checked: () => boolean;
	clicked: () => boolean;
	closed: () => boolean;
	collapsed: () => boolean;
	collasped: () => boolean;
	ctrlClicked: () => boolean;
	doubleClicked: () => boolean;
	hovered: () => boolean;
	numberChanged: () => boolean;
	opened: () => boolean;
	rightClicked: () => boolean;
	selected: () => boolean;
	textChanged: () => boolean;
	unchecked: () => boolean;
	uncollapsed: () => boolean;
	unselected: () => boolean;
}

// TODO: make it so you can index it
export type Widget<T extends WidgetConstructorInfo = WidgetConstructorInfo> = {
	ID: string;
	type: string;
	state: T["State"] extends object ? Stateify<T["State"]> : undefined;

	parentWidget: Widget;
	Instance: GuiObject;
	arguments: T["Arguments"];

	ZIndex: number;

	trackedEvents: {};
	lastCycleTick: number;

	isHoveredEvent: boolean;
	lastClickedTick: number;
	lastRightClickedTick: number;
	lastClickedTime: number;
	lastClickedPosition: Vector2;
	lastDoubleClickedTick: number;
	lastCtrlClickedTick: number;
	lastCheckedTick: number;
	lastUncheckedTick: number;
} & T["Events"];

export declare class WidgetClass {
	Generate(): GuiObject;
	Discard(): void;
	Update(...args: any[]): void;

	Args: Record<string, number>;
	Events: Events;
	hasChildren: boolean;
	hasState: boolean;
	ArgNames: Array<string>;

	GenerateState(): void;
	UpdateState(): void;

	ChildAdded(): GuiObject;
	ChildDiscarded(): void;
}

export interface WidgetUtility {
	GuiService: GuiService;
	RunService: RunService;
	TextService: TextService;
	UserInputService: UserInputService;
	ContextActionService: ContextActionService;

	getTime: () => number;
	getMouseLocation: () => Vector2;

	ICONS: {
		RIGHT_POINTING_TRIANGLE: string;
		DOWN_POINTING_TRIANGLE: string;
		MULTIPLICATION_SIGN: string;
		BOTTOM_RIGHT_CORNER: string;
		CHECK_MARK: string;
		ALPHA_BACKGROUND_TEXTURE: string;
	};

	GuiInset: Vector2;

	findBestWindowPosForPopup: (refPos: Vector2, size: Vector2, outerMin: Vector2, outerMax: Vector2) => Vector2;
	getScreenSizeForWindow: (thisInstance: Widget) => Vector2;
	isPosInsideRect: (pos: Vector2, rectMin: Vector2, rectMax: Vector2) => boolean;
	extend: (superClass: WidgetClass, subClass: WidgetClass) => WidgetClass;
	discardState: (thisWidget: Widget) => void;

	UIPadding: (Parent: GuiObject, PxPadding: Vector2) => UIPadding;
	UIListLayout: (Parent: GuiObject, FillDirection: Enum.FillDirection, Padding: UDim) => UIListLayout;
	UIStroke: (Parent: GuiObject, Thickness: number, Color: Color3, Transparency: number) => UIStroke;
	UICorner: (Parent: GuiObject, PxRounding: number) => UICorner;
	UISizeConstraint: (Parent: GuiObject, MinSize: Vector2, MaxSize: Vector2) => UISizeConstraint;
	UIReference: (Parent: GuiObject, Child: GuiObject, Name: string) => ObjectValue;

	calculateTextSize: (text: string, width?: number) => Vector2;
	applyTextStyle: (thisInstance: TextLabel | TextButton | TextBox) => void;
	applyInteractionHighlights: (Button: GuiButton, Highlightee: GuiObject, Colors: Record<string, unknown>) => void;
	applyInteractionHighlightsWithMultiHighlightee: (
		Button: GuiButton,
		Highlightees: Array<Array<GuiObject | Record<string, Color3 | number>>>,
	) => void;
	applyTextInteractionHighlights: (
		Button: GuiButton,
		Highlightee: TextLabel | TextButton | TextBox,
		Colors: Record<string, unknown>,
	) => void;
	applyFrameStyle: (thisInstance: GuiObject, forceNoPadding?: boolean, doubleyNoPadding?: boolean) => void;

	applyButtonClick: (thisWidget: Widget, thisInstance: GuiButton, callback: () => void) => void;
	applyButtonDown: (thisWidget: Widget, thisInstance: GuiButton, callback: (x: number, y: number) => void) => void;
	applyMouseEnter: (thisWidget: Widget, thisInstance: GuiObject, callback: () => void) => void;
	applyMouseLeave: (thisWidget: Widget, thisInstance: GuiObject, callback: () => void) => void;
	applyInputBegan: (thisWidget: Widget, thisInstance: GuiObject, callback: (input: InputObject) => void) => void;
	applyInputEnded: (thisWidget: Widget, thisInstance: GuiObject, callback: (input: InputObject) => void) => void;

	registerEvent: (event: string, callback: (...args: any[]) => void) => void;

	EVENTS: {
		hover: (pathToHovered: (thisWidget: Widget) => GuiObject) => Event;
		click: (pathToClicked: (thisWidget: Widget) => GuiButton) => Event;
		rightClick: (pathToClicked: (thisWidget: Widget) => GuiButton) => Event;
		doubleClick: (pathToClicked: (thisWidget: Widget) => GuiButton) => Event;
		ctrlClick: (pathToClicked: (thisWidget: Widget) => GuiButton) => Event;
	};

	abstractButton: WidgetClass;
}

type WidgetConstructor<T extends WidgetConstructorInfo> = (
	//I spread the Arguments tuple to have a hint with all the arguments
	args: T["Arguments"] extends defined ? Argumentify<[...T["Arguments"]]> : undefined,
	state?: T["State"] extends object ? Partial<StateOrLiteral<T["State"]>> | undefined : undefined,
	...extra: T["Extra"] extends Array<unknown> ? T["Extra"] : []
) => Widget<T>;

type EmptyWidgetConstructor = () => Widget<{
	Arguments: undefined;
	State: undefined;
	Events: {};
}>;

export interface Widgets {
	// Window
	Window: WidgetConstructor<WindowCreation>;
	Tooltip: WidgetConstructor<TooltipCreation>;
	// Menu
	Menu: WidgetConstructor<MenuCreation>;
	MenuBar: EmptyWidgetConstructor;
	MenuItem: WidgetConstructor<MenuItemCreation>;
	MenuToggle: WidgetConstructor<MenuToggleCreation>;
	// Format
	Group: EmptyWidgetConstructor;
	Indent: WidgetConstructor<IndentCreation>;
	SameLine: WidgetConstructor<SameLineCreation>;
	Separator: EmptyWidgetConstructor;
	// Text
	InputText: WidgetConstructor<InputTextCreation>;
	SeparatorText: WidgetConstructor<SeparatorTextCreation>;
	Text: WidgetConstructor<TextCreation>;
	/**
	 * @deprecated Use 'Text' with the Color argument or change the config.
	 */
	TextColored: WidgetConstructor<TextColoredCreation>;
	/**
	 * @deprecated Use 'Text' with the Wrapped argument or change the config.
	 */
	TextWrapped: WidgetConstructor<TextWrappedCreation>;
	// Basic
	Button: WidgetConstructor<ButtonCreation>;
	Checkbox: WidgetConstructor<CheckboxCreation>;
	RadioButton: WidgetConstructor<RadioButtonCreation>;
	SmallButton: WidgetConstructor<SmallButtonCreation>;
	// Tree
	CollapsingHeader: WidgetConstructor<CollapsingHeaderCreation>;
	Tree: WidgetConstructor<TreeCreation>;
	// Input
	InputNum: WidgetConstructor<InputNumCreation>;
	InputRect: WidgetConstructor<InputRectCreation>;
	InputUDim: WidgetConstructor<InputUDimCreation>;
	InputUDim2: WidgetConstructor<InputUDim2Creation>;
	InputVector2: WidgetConstructor<InputVector2Creation>;
	InputVector3: WidgetConstructor<InputVector3Creation>;
	// Drag
	DragNum: WidgetConstructor<DragNumCreation>;
	DragRect: WidgetConstructor<InputRectCreation>;
	DragUDim: WidgetConstructor<InputUDimCreation>;
	DragUDim2: WidgetConstructor<InputUDim2Creation>;
	DragVector2: WidgetConstructor<InputVector2Creation>;
	DragVector3: WidgetConstructor<InputVector3Creation>;
	InputColor3: WidgetConstructor<InputColor3Creation>;
	InputColor4: WidgetConstructor<InputColor4Creation>;
	// Slider
	SliderNum: WidgetConstructor<DragNumCreation>;
	SliderRect: WidgetConstructor<InputRectCreation>;
	SliderUDim: WidgetConstructor<InputUDimCreation>;
	SliderUDim2: WidgetConstructor<InputUDim2Creation>;
	SliderVector2: WidgetConstructor<InputVector2Creation>;
	SliderVector3: WidgetConstructor<InputVector3Creation>;
	// Combo
	Combo: WidgetConstructor<ComboCreation>;
	ComboArray: WidgetConstructor<ComboArrayCreation>;
	ComboEnum: WidgetConstructor<ComboEnumCreation>;
	Selectable: WidgetConstructor<SelectableCreation>;
	// Table
	Table: WidgetConstructor<TableCreation>;
	// Plot
	ProgressBar: WidgetConstructor<ProgressBarCreation>;
}

interface TemplateConfig {
	colorDark: Config;
	colorLight: Config;
	sizeDefault: Config;
	sizeClear: Config;
	utilityDefault: Config;
}

export interface IrisDefinition extends Widgets {
	/*
      --------------
        PROPERTIES
      --------------
  */
	Internal: IrisInternal;
	Disabled: boolean;
	Args: { [key in keyof Widgets]: key extends keyof WidgetEnums ? WidgetEnums[key] : Record<string, number> };
	Events: Record<string, () => boolean>;
	ShowDemoWindow: () => Widget;

	//I use an intersection to have intellisense
	TemplateConfig: Record<keyof TemplateConfig, Partial<Config>> & Record<string, Partial<Config>>;
	_config: Config;

	/*
   ---------
   STATE
   ---------
   */

	State: <T>(initialValue: T) => State<T>;
	WeakState: <T>(initialValue: T) => State<T>;
	ComputedState: <T, S extends State<T>, U>(firstState: S, onChangeCallback: (firstState: T) => U) => State<U>;

	/*
  -------------
  FUNCTIONS
  -------------
  */
	Init:
		| ((parentInstance?: Instance, eventConnection?: RBXScriptConnection) => IrisDefinition)
		| ((parentInstance?: Instance, eventConnection?: () => void) => IrisDefinition);
	Shutdown(): void;
	Connect(callback: () => void): void;
	Append: (userInstance: GuiObject) => void;
	ForceRefresh: () => void;
	End: () => void;

	// Widget
	SetFocusedWindow: (thisWidget?: Widget) => void;

	// ID API
	PushId: (input: number | string) => void;
	PopId: () => void;
	SetNextWidgetID: (ID: string) => void;

	// Config API
	UpdateGlobalConfig: (deltaStyle: Partial<Config>) => void;
	PushConfig: (deltaStyle: Partial<Config>) => void;
	PopConfig: () => void;

	NextColumn: () => void;
	SetColumnIndex: (columnIndex: number) => void;
	NextRow: () => void;
}

export interface Config {
	TextColor: Color3;
	TextTransparency: number;
	TextDisabledColor: Color3;
	TextDisabledTransparency: number;

	BorderColor: Color3;
	BorderActiveColor: Color3;
	BorderTransparency: number;
	BorderActiveTransparency: number;

	WindowBgColor: Color3;
	WindowBgTransparency: number;
	ScrollbarGrabColor: Color3;
	ScrollbarGrabTransparency: number;

	TitleBgColor: Color3;
	TitleBgTransparency: number;
	TitleBgActiveColor: Color3;
	TitleBgActiveTransparency: number;
	TitleBgCollapsedColor: Color3;
	TitleBgCollapsedTransparency: number;

	MenubarBgColor: Color3;
	MenubarBgTransparency: number;

	FrameBgColor: Color3;
	FrameBgTransparency: number;
	FrameBgHoveredColor: Color3;
	FrameBgHoveredTransparency: number;
	FrameBgActiveColor: Color3;
	FrameBgActiveTransparency: number;

	ButtonColor: Color3;
	ButtonTransparency: number;
	ButtonHoveredColor: Color3;
	ButtonHoveredTransparency: number;
	ButtonActiveColor: Color3;
	ButtonActiveTransparency: number;

	SliderGrabColor: Color3;
	SliderGrabTransparency: number;
	SliderGrabActiveColor: Color3;
	SliderGrabActiveTransparency: number;

	HeaderColor: Color3;
	HeaderTransparency: number;
	HeaderHoveredColor: Color3;
	HeaderHoveredTransparency: number;
	HeaderActiveColor: Color3;
	HeaderActiveTransparency: number;

	SelectionImageObjectColor: Color3;
	SelectionImageObjectTransparency: number;
	SelectionImageObjectBorderColor: Color3;
	SelectionImageObjectBorderTransparency: number;

	TableBorderStrongColor: Color3;
	TableBorderStrongTransparency: number;
	TableBorderLightColor: Color3;
	TableBorderLightTransparency: number;
	TableRowBgColor: Color3;
	TableRowBgTransparency: number;
	TableRowBgAltColor: Color3;
	TableRowBgAltTransparency: number;

	NavWindowingHighlightColor: Color3;
	NavWindowingHighlightTransparency: number;
	NavWindowingDimBgColor: Color3;
	NavWindowingDimBgTransparency: number;

	SeparatorColor: Color3;
	SeparatorTransparency: number;

	CheckMarkColor: Color3;
	CheckMarkTransparency: number;

	PlotHistogramColor: Color3;
	PlotHistogramTransparency: number;
	PlotHistogramHoveredColor: Color3;
	PlotHistogramHoveredTransparency: number;

	HoverColor: Color3;
	HoverTransparency: number;

	// Sizes
	ItemWidth: UDim;
	ContentWidth: UDim;

	WindowPadding: Vector2;
	WindowResizePadding: Vector2;
	FramePadding: Vector2;
	ItemSpacing: Vector2;
	ItemInnerSpacing: Vector2;
	CellPadding: Vector2;
	DisplaySafeAreaPadding: Vector2;
	IndentSpacing: number;
	SeparatorTextPadding: Vector2;

	TextFont: Font;
	TextSize: number;
	FrameBorderSize: number;
	FrameRounding: number;
	GrabRounding: number;
	WindowBorderSize: number;
	WindowTitleAlign: Enum.LeftRight;
	PopupBorderSize: number;
	PopupRounding: number;
	ScrollbarSize: number;
	GrabMinSize: number;
	SeparatorTextBorderSize: number;

	UseScreenGUIs: boolean;
	IgnoreGuiInset: boolean;
	Parent: BasePlayerGui;
	RichText: boolean;
	TextWrapped: boolean;
	DisableWidget: boolean;
	DisplayOrderOffset: number;
	ZIndexOffset: number;

	MouseDoubleClickTime: number;
	MouseDoubleClickMaxDist: number;
	MouseDragThreshold: number;
}
