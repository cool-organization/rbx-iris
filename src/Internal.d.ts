import {
	Config,
	State,
	StateOrLiteral,
	Widget,
	WidgetArguments,
	WidgetClass,
	WidgetID,
	WidgetStates,
	WidgetUtility,
	Widgets,
} from "./IrisDeclaration";

export interface IrisInternal {
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
          ---------
            STATE
          ---------
      */
	StateClass: {
		__index: any;
		get(): any;
		set(self: State, newValue: any): any;
		onChange(callback: (newValue: any) => void): void;
	};

	/*
          -------------
            FUNCTIONS
          -------------
      */
	_cycle: () => void;
	_NoOp: () => void;

	// Widget
	WidgetConstructor: (type: string, widgetClass: WidgetClass) => void;
	_Insert: (widgetType: keyof Widgets, arguments?: WidgetArguments, states?: WidgetStates) => Widget;
	_GenNewWidget: (widgetType: string, arguments: WidgetArguments, states?: WidgetStates, ID?: WidgetID) => Widget;
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
