import { EventApi } from "./creation/widgetClass";

type MenuDeclaration = {
	Arguments: [Text?: string];
	State: {
		isOpened: boolean;
	};
	Events: {
		clicked: EventApi;
		hovered: EventApi;
		opened: EventApi;
		closed: EventApi;
	};
};

type MenuItemDeclaration = {
	Arguments: [Text: string, KeyCode?: Enum.KeyCode, ModifierKey?: Enum.ModifierKey];
	Events: {
		clicked: EventApi;
		hovered: EventApi;
	};
};

type MenuToggleDeclaration = {
	Arguments: [Text: string, KeyCode?: Enum.KeyCode, ModifierKey?: Enum.ModifierKey];
	State: {
		isChecked: boolean;
	};
	Events: {
		checked: EventApi;
		unchecked: EventApi;
		hovered: EventApi;
	};
};

export { MenuDeclaration, MenuItemDeclaration, MenuToggleDeclaration };
