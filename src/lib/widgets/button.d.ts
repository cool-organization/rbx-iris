import { EventApi } from "./creation/widgetClass";

type ButtonDeclaration = {
	Arguments: [Text: string, Size?: UDim2];
	Events: {
		hovered: EventApi;
		clicked: EventApi;
		rightClicked: EventApi;
		doubleClicked: EventApi;
		ctrlClicked: EventApi;
	};
};

export { ButtonDeclaration };
