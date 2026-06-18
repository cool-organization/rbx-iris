import { EventApi } from "./creation/widgetClass";

type RadioButtonDeclaration = {
	Arguments: [Text?: string, Index?: unknown];
	State: {
		index: unknown;
	};
	Events: {
		selected: EventApi;
		unselected: EventApi;
		active: EventApi;
		hovered: EventApi;
	};
};

export { RadioButtonDeclaration };
