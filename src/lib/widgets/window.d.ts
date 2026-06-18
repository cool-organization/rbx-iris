import { WidgetArguments, WidgetEvents, WidgetState } from "./creation/utils";
import { EventApi } from "./creation/widgetClass";

type WindowDeclaration = {
	Arguments: [Title: string, NoTitleBar?: boolean, NoBackground?: boolean, NoCollapse?: boolean, NoClose?: boolean, NoMove?: boolean, NoScrollbar?: boolean, NoResize?: boolean, NoNav?: boolean, NoMenu?: boolean];
	State: {
		size: Vector2;
		position: Vector2;
		isUncollapsed: boolean;
		isOpened: boolean;
		scrollDistance: number;
	};
	Events: {
		hovered: EventApi;
		opened: EventApi;
		closed: EventApi;
		collapsed: EventApi;
		uncollapsed: EventApi;
	};
};

type TooltipDeclaration = {
	Arguments: [Text: string];
	Events: {
		hovered: EventApi;
	};
};

export { WindowDeclaration, TooltipDeclaration };
