import { EventApi } from "./creation/widgetClass";

type TextDeclaration = {
	Arguments: [Text: string, Wrapped?: boolean, Color?: Color3, RichText?: boolean];
	Events: {
		hovered: EventApi;
	};
};

type SeparatorTextDeclaration = {
	Arguments: [Text: string];
	Events: {
		hovered: EventApi;
	};
};

type InputTextDeclaration = {
	Arguments: [Text?: string, TextHint?: string, ReadOnly?: boolean, MultiLine?: boolean];
	State: {
		text: string;
	};
	Events: {
		textChanged: EventApi;
		hovered: EventApi;
	};
};

// Deprecated
type TextWrappedDeclaration = {
	Arguments: [Text: string];
	Events: {
		hovered: EventApi;
	};
};

type TextColoredDeclaration = {
	Arguments: [Text: string, Color?: Color3];
	Events: {
		hovered: EventApi;
	};
};

export { TextDeclaration, SeparatorTextDeclaration, InputTextDeclaration, TextWrappedDeclaration, TextColoredDeclaration };
