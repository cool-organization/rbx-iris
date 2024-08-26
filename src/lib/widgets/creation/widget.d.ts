import { Stateify } from "../../..";
import { UnknownDeclaration } from "../unknown";
import { WidgetDeclaration } from "./utils";

type Widget<T extends WidgetDeclaration = UnknownDeclaration> = {
	ID: string;
	type: string;
	state: T["State"] extends object ? Stateify<T["State"]> : undefined;

	parentWidget: Widget;
	Instance: GuiObject;
	arguments: T["Arguments"];

	ZIndex: number;

	trackedEvents: {};
	lastCycleTick: number;

	// Event Props
	isHoveredEvent: boolean;

	lastClickedTick: number;
	lastClickedTime: number;
	lastClickedPosition: Vector2;

	lastRightClickedTick: number;
	lastDoubleClickedTick: number;
	lastCtrlClickedTick: number;

	lastCheckedTick: number;
	lastUncheckedTick: number;
	lastOpenedTick: number;
	lastClosedTick: number;
	lastSelectedTick: number;
	lastUnselectedTick: number;
	lastCollapsedTick: number;
	lastUncollapsedTick: number;

	lastNumberChangedTick: number;
	lastTextchangeTick: number;
	lastShortcutTick: number;
} & T["Events"];
