import { Hovered, OpenEvents, WidgetArguments, WidgetEvents, WidgetState } from "./creation/utils";
import { EventApi } from "./creation/widgetClass";

type WindowArguments = [
	Title: string,
	NoTitleBar?: boolean,
	NoBackground?: boolean,
	NoCollapse?: boolean,
	NoClose?: boolean,
	NoMove?: boolean,
	NoScrollbar?: boolean,
	NoResize?: boolean,
	NoNav?: boolean,
	NoMenu?: boolean,
];

type WindowEvents = {
	collapsed: EventApi;
	uncollapsed: EventApi;
} & (Hovered & OpenEvents);

type WindowState = {
	size: Vector2;
	position: Vector2;
	isUncollapsed: boolean;
	isOpened: boolean;
	scrollDistance: number;
};
type TooltipArguments = [Text: string];

export type WindowDeclaration = WidgetArguments<WindowArguments> & WidgetState<WindowState> & WidgetEvents<WindowEvents>;
export type TooltipDeclaration = WidgetArguments<TooltipArguments>;
