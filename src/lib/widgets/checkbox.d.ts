import { EventApi } from "./creation/widgetClass";

type CheckboxDeclaration = {
	Arguments: [Text?: string];
	State: {
		isChecked: boolean;
	};
	Events: {
		checked: EventApi;
		unchecked: EventApi;
		hovered: EventApi;
	};
};

export { CheckboxDeclaration };
