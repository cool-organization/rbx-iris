import { EventApi } from "./creation/widgetClass";

type UnknownDeclaration = {
	Arguments: unknown[];
	State: Record<string, unknown>;
	Events: {
		hovered: EventApi;
		clicked: EventApi;
		rightClicked: EventApi;
		doubleClicked: EventApi;
		ctrlClicked: EventApi;
		checked: EventApi;
		unchecked: EventApi;
		activated: EventApi;
		deactivated: EventApi;
		collapsed: EventApi;
		uncollapsed: EventApi;
		selected: EventApi;
		unselected: EventApi;
		opened: EventApi;
		closed: EventApi;
		active: EventApi;
		numberChanged: EventApi;
		textChanged: EventApi;
	};
};

export { UnknownDeclaration };
