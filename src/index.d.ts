export type ID = string;

export interface State {
	// value: unknown;
	// ConnectedWidgets: Record<ID, Widget>;
	// ConnectedFunctions: Array<(value: unknown) => void>;

	get(): unknown;
	set(newValue: unknown): void;
	onChange(functionToConnect: (value: unknown) => void): void;
}
export type States = Record<string, State>;

export interface Event {
	Init: (widget: Widget) => void;
	Get: (widget: Widget) => boolean;
}
export type Events = Record<string, Event>;

export interface Widget<T extends object = object> {
	ID: ID;
	type: string;
	state: States;

	parentWidget: Widget;
	Instance: GuiObject;
	arguments: Arguments;

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
}

export type Argument = unknown;
export type Arguments = Record<string, Argument>;
export type WidgetArguments = Array<Argument>;

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

export interface Iris {
	SelectionImageObject: Frame;
	parentInstance: BasePlayerGui;

	Args: {};

	SetNextWidgetID: (ID: ID) => void;
	ForceRefresh: () => void;
	WidgetConstructor: (type: string, widgetClass: WidgetClass) => void;

	UpdateGlobalConfig: (deltaStyle: Config) => void;
	PushConfig: (deltaStyle: Config) => void;
	PopConfig: () => void;

	State: (initialValue: unknown) => void;
	ComputedState: (firstState: State, onChangeCallback: (firstState: unknown) => unknown) => State;

	Init:
		| ((parentInstance?: BasePlayerGui, eventConnection?: RBXScriptConnection) => Iris)
		| ((parentInstance?: BasePlayerGui, eventConnection?: () => void) => Iris);
	Connect(callback: () => void): void;

	Append: (userInstance: GuiObject) => void;

	End: () => void;
	Text: (args: WidgetArguments) => Widget;
	TextColored: (args: WidgetArguments) => Widget;
	TextWrapped: (args: WidgetArguments) => Widget;

	Button: (args: WidgetArguments) => Widget;
	SmallButton: (args: WidgetArguments) => Widget;
	Checkbox: (args: WidgetArguments, state?: States) => Widget;
	RadioButton: (args: WidgetArguments, state?: States) => Widget;

	Separator: (args: WidgetArguments) => Widget;
	Indent: (args: WidgetArguments) => Widget;
	SameLine: (args: WidgetArguments) => Widget;
	Group: (args: WidgetArguments) => Widget;
	Selectable: (args: WidgetArguments, state?: States) => Widget;

	Tree: (args: WidgetArguments, state?: States) => Widget;
	CollapsingHeader: (args: WidgetArguments, state?: States) => Widget;

	DragNum: (args: WidgetArguments, state?: States) => Widget;
	SliderNum: (args: WidgetArguments, state?: States) => Widget;
	InputNum: (args: WidgetArguments, state?: States) => Widget;
	InputText: (args: WidgetArguments, state?: States) => Widget;

	// ROBLOX-TS DEVIATION: InputEnum's original signature is `(args: WidgetArguments, state?: States, enumType: Enum) => Widget;`,
	// but obviously TypeScript doesn't like that.
	InputEnum: (args: WidgetArguments, enumType: Enum, state?: States) => Widget;
	Combo: (args: WidgetArguments, state?: States) => Widget;

	// ROBLOX-TS DEVIATION: ComboArray's original signature is `(args: WidgetArguments, state?: States, selectionArray: Array<unknown>) => Widget;`,
	// but obviously TypeScript doesn't like that.
	ComboArray: (args: WidgetArguments, selectionArray: Array<unknown>, state?: States) => Widget;

	Table: (args: WidgetArguments, state?: States) => Widget;
	NextColumn: () => void;
	SetColumnIndex: (columnIndex: number) => void;
	NextRow: () => void;

	Window: (args: WidgetArguments, state?: States) => Widget;
	Tooltip: (args: WidgetArguments) => Widget;
	SetFocusedWindow: (thisWidget?: Widget) => void;
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

export default Iris;
