import { Config, State, Widget } from "../..";
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
    BLANK_SQUARE: string;
    RIGHT_POINTING_TRIANGLE: string;
    DOWN_POINTING_TRIANGLE: string;
    MULTIPLICATION_SIGN: string;
    BOTTOM_RIGHT_CORNER: string;
    CHECKMARK: string;
    BORDER: string;
    ALPHA_BACKGROUND_TEXTURE: string;
    UNKNOWN_TEXTURE: string;
  };

  GuiOffset: Vector2;
  MouseOffset: Vector2;

  findBestWindowPosForPopup: (
    refPos: Vector2,
    size: Vector2,
    outerMin: Vector2,
    outerMax: Vector2,
  ) => Vector2;
  getScreenSizeForWindow: (thisWidget: Widget) => Vector2;
  isPosInsideRect: (
    pos: Vector2,
    rectMin: Vector2,
    rectMax: Vector2,
  ) => boolean;
  extend: (superClass: WidgetClass, subClass: WidgetClass) => WidgetClass;
  discardState: (thisWidget: Widget) => void;

  UIPadding: (Parent: GuiObject, PxPadding: Vector2) => UIPadding;
  UIListLayout: (
    Parent: GuiObject,
    FillDirection: Enum.FillDirection,
    Padding: UDim,
  ) => UIListLayout;
  UIStroke: (
    Parent: GuiObject,
    Thickness: number,
    Color: Color3,
    Transparency: number,
  ) => UIStroke;
  UICorner: (Parent: GuiObject, PxRounding: number?) => UICorner;
  UISizeConstraint: (
    Parent: GuiObject,
    MinSize: Vector2?,
    MaxSize: Vector2?,
  ) => UISizeConstraint;

  calculateTextSize: (text: string, width?: number) => Vector2;
  applyTextStyle: (thisInstance: TextLabel | TextButton | TextBox) => void;
  applyInteractionHighlights: (
    Property: string,
    Button: GuiButton,
    Highlightee: GuiObject,
    Colors: Record<string, unknown>,
  ) => void;
  applyInteractionHighlightsWithMultiHighlightee: (
    Property: string,
    Button: GuiButton,
    Highlightees: Array<Array<GuiObject | Record<string, Color3 | number>>>,
  ) => void;
  applyTextInteractionHighlights: (
    Button: GuiButton,
    Highlightee: TextLabel | TextButton | TextBox,
    Colors: Record<string, unknown>,
  ) => void;
  applyFrameStyle: (
    thisInstance: GuiObject,
    noPadding?: boolean,
    noCorner?: boolean,
  ) => void;

  applyButtonClick: (thisInstance: GuiButton, callback: () => void) => void;
  applyButtonDown: (
    thisInstance: GuiButton,
    callback: (x: number, y: number) => void,
  ) => void;
  applyMouseEnter: (
    thisInstance: GuiObject,
    callback: (x: number, y: number) => void,
  ) => void;
  applyMouseMoved: (
    thisInstance: GuiObject,
    callback: (x: number, y: number) => void,
  ) => void;
  applyMouseLeave: (
    thisInstance: GuiObject,
    callback: (x: number, y: number) => void,
  ) => void;
  applyInputBegan: (
    thisInstance: GuiObject,
    callback: (input: InputObject) => void,
  ) => void;
  applyInputEnded: (
    thisInstance: GuiObject,
    callback: (input: InputObject) => void,
  ) => void;

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
  _version: string;
  _started: boolean;
  _shutdown: boolean;
  _cycleTick: number;
  _deltaTime: number;
  _eventConnection?: RBXScriptConnection;

  // Refresh
  _globalRefreshRequested: boolean;
  _refreshCounter: number;
  _refreshLevel: number;
  _refreshStack: boolean[];

  // Widgets & Instances
  _widgets: Record<string, WidgetClass>;
  _widgetCount: number;
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
  _IDStack: string[];
  _usedIDs: Record<string, number>;
  _newID: boolean;
  _pushedIds: string[];
  _nextWidgetId?: string;

  // VDOM
  _lastVDOM: Record<string, Widget>;
  _VDOM: Record<string, Widget>;

  // State
  _states: Record<string, State>;

  // Callback
  _postCycleCallbacks: Callback[];
  _connectedFunctions: Callback[];
  _connections: RBXScriptConnection[];
  _initFunctions: Callback[];
  _cycleCoroutine?: thread;

  // StateClass
  StateClass: {
    __index: any;
    get: <T>(self: State<T>) => T;
    set: <T>(self: State<T>, newValue: T, force?: true) => T;
    onChange: <T>(
      self: State<T>,
      callback: (newValue: T) => void,
    ) => () => void;
    changed: <T>(self: State<T>) => boolean;
  };

  // Functions
  _cycle: (deltaTime: number) => void;
  _NoOp: () => void;

  // Widget
  WidgetConstructor: (type: string, widgetClass: WidgetClass) => void;
  _Insert: (
    widgetType: string,
    arguments?: defined[],
    states?: Record<string, unknown | State>,
  ) => Widget;
  _GenNewWidget: (
    widgetType: string,
    arguments: defined[],
    states?: Record<string, unknown | State>,
    ID?: string,
  ) => Widget;
  _ContinueWidget: (ID: string, widgetType: string) => Widget;
  _DiscardWidget: (widgetToDiscard: Widget) => void;

  _widgetState: (
    thisWidget: Widget,
    stateName: string,
    initialValue: any,
  ) => State;
  _EventCall: (thisWidget: Widget, eventName: string) => boolean;
  _GetParentWidget: () => Widget;
  SetFocusedWindow: (thisWidget?: Widget) => void;

  // Generate
  _generateEmptyVDOM: () => Record<string, Widget>;
  _generateRootInstance: () => void;
  _generateSelectionImageObject: () => void;

  // Utility
  _getID: (levelsToIgnore: number) => string;
  _deepCompare: (t1: object, t2: object) => boolean;
  _deepCopy: <T extends object>(t: T) => T;
}

export { WidgetUtility, IrisInternal };
