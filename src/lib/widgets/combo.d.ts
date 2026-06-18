import { Active, ClickEvents, Clicked, Hovered, OpenEvents, SelectEvents, WidgetArguments, WidgetEvents, WidgetExtra, WidgetState } from "./creation/utils";
import { EventApi } from "./creation/widgetClass";

type ComboDeclaration = {
	Arguments: [Text?: string, NoButton?: boolean, NoPreview?: boolean];
	State: {
		index: unknown;
		isOpened: boolean;
	};
	Events: {
		hovered: EventApi;
		clicked: EventApi;
		opened: EventApi;
		closed: EventApi;
		changed: EventApi;
	};
};

type ComboArrayDeclaration = ComboDeclaration & {
	Extra: [selectionArray: unknown[]];
};

type ComboEnumDeclaration = ComboDeclaration & {
	Extra: [enumType: Enum];
};

type SelectableDeclaration = {
	Arguments: [Text?: string, Index?: unknown, NoClick?: boolean];
	State: {
		index: unknown;
	};
	Events: {
		hovered: EventApi;
		clicked: EventApi;
		rightClicked: EventApi;
		doubleClicked: EventApi;
		ctrlClicked: EventApi;
		selected: EventApi;
		unselected: EventApi;
		active: EventApi;
	};
};

export { ComboDeclaration, ComboArrayDeclaration, ComboEnumDeclaration, SelectableDeclaration };
