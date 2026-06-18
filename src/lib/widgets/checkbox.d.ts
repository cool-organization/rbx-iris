import { CheckEvents, Hovered, WidgetArguments, WidgetEvents, WidgetState } from "./creation/utils";
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
