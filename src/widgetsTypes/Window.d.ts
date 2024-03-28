import { Hovered, OpenEvents, WidgetArguments, WidgetEvent, WidgetEvents, WidgetState } from ".";

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
	collapsed: WidgetEvent;
	uncollapsed: WidgetEvent;
} & (Hovered & OpenEvents);

type WindowState = {
	size: Vector2;
	position: Vector2;
	isUncollapsed: boolean;
	isOpened: boolean;
	scrollDistance: number;
};
type TooltipArguments = [Text: string];

export type WindowCreation = WidgetArguments<WindowArguments> & WidgetState<WindowState> & WidgetEvents<WindowEvents>;
export type TooltipCreation = WidgetArguments<TooltipArguments>;
