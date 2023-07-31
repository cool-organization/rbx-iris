import { WidgetEnums } from "./types";

export interface State<T = unknown> {
	readonly value: T;
	// ConnectedWidgets: Record<ID, Widget>;
	// ConnectedFunctions: Array<(value: unknown) => void>;

	get(): T;
	set(newValue: T): void;
	onChange(functionToConnect: (value: T) => void): void;
}
export type States = Record<string, State>;

export type Stateify<T extends object> = { [P in keyof T]: T[P] extends State ? T[P] : State<T[P]> };

export interface Event {
	Init: (widget: Widget) => void;
	Get: (widget: Widget) => boolean;
}
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
export type Widget<T extends object = object, Args extends Arguments = Record<string, unknown>> = {
	ID: string;
	type: string;
	state: Stateify<T>;

	parentWidget: Widget;
	Instance: GuiObject;
	arguments: Args;

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
} & Stateify<T>;

export type Argument = unknown;
export type Arguments = Record<string, Argument>;
export type WidgetArguments = Array<Argument> | Record<number, Argument>;

export declare class WidgetClass {
	Generate(): GuiObject;
	Discard(): void;
	Update(): void;

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
	UserInputService: UserInputService;

	ICONS: {
		RIGHT_POINTING_TRIANGLE: string;
		DOWN_POINTING_TRIANGLE: string;
		MULTIPLICATION_SIGN: string;
		BOTTOM_RIGHT_CORNER: string;
		CHECK_MARK: string;
	};

	findBestWindowPosForPopup: (refPos: Vector2, size: Vector2, outerMin: Vector2, outerMax: Vector2) => Vector2;
	isPosInsideRect: (pos: Vector2, rectMin: Vector2, rectMax: Vector2) => boolean;
	extend: (superClass: WidgetClass, subClass: WidgetClass) => WidgetClass;
	discardState: (thisWidget: Widget) => void;

	UIPadding: (Parent: GuiObject, PxPadding: Vector2) => UIPadding;
	UIListLayout: (Parent: GuiObject, FillDirection: Enum.FillDirection, Padding: UDim) => UIListLayout;
	UIStroke: (Parent: GuiObject, Thickness: number, Color: Color3, Transparency: number) => UIStroke;
	UICorner: (Parent: GuiObject, PxRounding: number) => UICorner;
	UISizeConstraint: (Parent: GuiObject, MinSize: Vector2, MaxSize: Vector2) => UISizeConstraint;

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

	EVENTS: {
		hover: (pathToHovered: (thisWidget: Widget) => GuiObject) => Event;
		click: (pathToClicked: (thisWidget: Widget) => GuiButton) => Event;
		rightClick: (pathToClicked: (thisWidget: Widget) => GuiButton) => Event;
		doubleClick: (pathToClicked: (thisWidget: Widget) => GuiButton) => Event;
		ctrlClick: (pathToClicked: (thisWidget: Widget) => GuiButton) => Event;
	};

	abstractButton: WidgetClass;
}

interface Hovered {
	hovered: () => boolean;
}

interface Clicked {
	clicked: () => boolean;
}

interface NumberChanged {
	numberChanged: () => boolean;
}

interface DoubleClicked {
	doubleClicked: () => boolean;
}

interface Widgets {
	End: () => void;
	Text: (args: WidgetArguments) => Widget & Hovered;
	TextColored: (args: WidgetArguments) => Widget & Hovered;
	TextWrapped: (args: WidgetArguments) => Widget & Hovered;

	Button: (args: WidgetArguments) => Widget & Clicked;
	SmallButton: (args: WidgetArguments) => Widget & Clicked;
	Checkbox: <T extends Record<string, unknown> = { isChecked: boolean }>(
		args: WidgetArguments,
		state?: T,
	) => Widget<T> & { checked: () => boolean };
	RadioButton: <T extends Record<string, unknown>>(
		args: WidgetArguments,
		state?: T,
	) => Widget<T> & { active: () => boolean };

	Separator: (args?: WidgetArguments) => Widget;
	Indent: (args?: WidgetArguments) => Widget;
	SameLine: (args?: WidgetArguments) => Widget;
	Group: (args?: WidgetArguments) => Widget;
	Selectable: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T> & DoubleClicked;

	Tree: <T extends Record<string, unknown> & { isUncollapsed: boolean }>(
		args: WidgetArguments,
		state?: T,
	) => Widget<T> & { isUncollapsed: State<boolean> };

	CollapsingHeader: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T>;

	DragNum: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T>;
	SliderNum: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T>;

	InputNum: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T> & NumberChanged;
	InputText: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T>;

	// ROBLOX-TS DEVIATION: InputEnum's original signature is `(args: WidgetArguments, state?: States, enumType: Enum) => Widget;`,
	// but obviously TypeScript doesn't like that.
	InputEnum: <T extends Record<string, unknown>>(args: WidgetArguments, enumType: Enum, state?: T) => Widget<T>;
	Combo: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T>;

	InputVector2: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T>;
	InputVector3: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T>;
	InputUDim: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T>;
	InputUDim2: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T>;
	InputColor3: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T>;
	InputColor4: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T>;

	// ROBLOX-TS DEVIATION: ComboArray's original signature is `(args: WidgetArguments, state?: States, selectionArray: Array<unknown>) => Widget;`,
	// but obviously TypeScript doesn't like that.
	ComboArray: <T extends Record<string, unknown>>(
		args: WidgetArguments,
		selectionArray: Array<unknown>,
		state?: T,
	) => Widget<T>;

	Table<T extends Record<string, unknown>>(this: void, args: WidgetArguments, state?: T): Widget<T>;
	Table<T extends Record<string, unknown>>(this: void, args: Record<number, unknown>, state?: T): Widget<T>;

	Window: <T extends Record<string, unknown>>(args: WidgetArguments, state?: T) => Widget<T>;
	Tooltip: (args: WidgetArguments) => Widget;
}

interface IrisDefinition extends Widgets {
	SelectionImageObject: Frame;
	parentInstance: BasePlayerGui;

	Args: { [key in keyof Widgets]: key extends keyof WidgetEnums ? WidgetEnums[key] : Record<string, number> };
	Events: Record<string, () => boolean>;

	// ROBLOX-TS DEVIATION: This isn't from the original library.
	GetConfig: () => Config;

	SetNextWidgetID: (ID: string) => void;
	ForceRefresh: () => void;
	WidgetConstructor: (type: string, widgetClass: WidgetClass) => void;

	UpdateGlobalConfig: (deltaStyle: Config) => void;
	PushConfig: (deltaStyle: Partial<Config>) => void;
	PopConfig: () => void;

	ComputedState: <T, S extends State<T>, U>(firstState: S, onChangeCallback: (firstState: T) => U) => State<U>;
	State: <T>(initialValue: T) => State<T>;
	WeakState: <T>(initialValue: T) => State<T>;

	Init:
		| ((parentInstance?: BasePlayerGui, eventConnection?: RBXScriptConnection) => IrisDefinition)
		| ((parentInstance?: BasePlayerGui, eventConnection?: () => void) => IrisDefinition);
	Connect(callback: () => void): void;

	Append: (userInstance: GuiObject) => void;
	NextColumn: () => void;
	SetColumnIndex: (columnIndex: number) => void;
	NextRow: () => void;

	SetFocusedWindow: (thisWidget?: Widget) => void;
	PushId: (input: number | string) => void;
	PopId: () => void;
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

	UseScreenGUIs: boolean;
	Parent: BasePlayerGui;
	DisplayOrderOffset: number;
	ZIndexOffset: number;

	MouseDoubleClickTime: number;
	MouseDoubleClickMaxDist: number;
	MouseDragThreshold: number;
}

declare const Iris: IrisDefinition;
export default Iris;
