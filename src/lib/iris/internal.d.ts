import { Config, State, Widget, WidgetID } from "../..";
import { Event, WidgetClass } from "../widgets/creation/widgetClass";

interface WidgetUtility {
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
		UNKNOWN_TEXTURE: string;
	};

	GuiInset: Vector2;
	MouseOffset: Vector2;

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
	applyInteractionHighlightsWithMultiHighlightee: (Button: GuiButton, Highlightees: Array<Array<GuiObject | Record<string, Color3 | number>>>) => void;
	applyTextInteractionHighlights: (Button: GuiButton, Highlightee: TextLabel | TextButton | TextBox, Colors: Record<string, unknown>) => void;
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

interface IrisInternal {
	/*
       --------------
         PROPERTIES
       --------------
   */
	_version: string;
	_started: boolean;
	_shutdown: boolean;
	_cycleTick: number;
	_eventConnection?: RBXScriptConnection;

	// Refresh
	_globalRefreshRequested: boolean;
	_localRefreshActive: boolean;

	// Widgets & Instances
	_widgets: Record<string, WidgetClass>;
	_stackIndex: number;
	_rootInstance?: GuiObject;
	_rootWidget: Widget;
	_lastWidget: Widget;
	SelectionImageObject: Frame;
	parentInstance: BasePlayerGui;
	_utility: WidgetUtility;

	// Config
	_rootConfig: Config;
	_config: Config;

	// ID
	_IDStack: WidgetID[];
	_usedIDs: Record<WidgetID, number>;
	_pushedId?: WidgetID;
	_nextWidgetId?: WidgetID;

	// VDOM
	_lastVDOM: Record<WidgetID, Widget>;
	_VDOM: Record<WidgetID, Widget>;

	// State
	_states: Record<WidgetID, State>;

	// Callback
	_postCycleCallbacks: Callback[];
	_connectedFunctions: Callback[];
	_connections: RBXScriptConnection[];
	_initFunctions: Callback[];
	_cycleCoroutine?: thread;

	/*
       -------------
         FUNCTIONS
       -------------
   */
	_cycle: () => void;
	_NoOp: () => void;

	// Widget
	WidgetConstructor: (type: string, widgetClass: WidgetClass) => void;
	_Insert: (widgetType: string, arguments?: defined[], states?: Record<string, unknown | State>) => Widget;
	_GenNewWidget: (widgetType: string, arguments: defined[], states?: Record<string, unknown | State>, ID?: WidgetID) => Widget;
	_ContinueWidget: (ID: WidgetID, widgetType: string) => Widget;
	_DiscardWidget: (widgetToDiscard: Widget) => void;

	_widgetState: (thisWidget: Widget, stateName: string, initialValue: any) => State;
	_EventCall: (thisWidget: Widget, eventName: string) => boolean;
	_GetParentWidget: () => Widget;
	SetFocusedWindow: (thisWidget?: Widget) => void;

	// Generate
	_generateEmptyVDOM: () => Record<WidgetID, Widget>;
	_generateRootInstance: () => void;
	_generateSelectionImageObject: () => void;

	// Utility
	_getID: (levelsToIgnore: number) => void;
	_deepCompare: (t1: object, t2: object) => boolean;
	_deepCopy: <T extends object>(t: T) => T;
}
