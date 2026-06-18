import { EventApi } from "./creation/widgetClass";

type TabBarDeclaration = {
	Arguments: [];
	State: {
		index: number;
	};
	Events: {
		hovered: EventApi;
	};
};

type TabDeclaration = {
	Arguments: [Text: string, Hideable?: boolean];
	State: {
		index: number;
		isOpened: boolean;
	};
	Events: {
		clicked: EventApi;
		opened: EventApi;
		closed: EventApi;
		selected: EventApi;
		unselected: EventApi;
		active: EventApi;
		hovered: EventApi;
	};
};

export { TabBarDeclaration, TabDeclaration };
