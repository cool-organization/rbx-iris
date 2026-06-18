import { EventApi } from "./creation/widgetClass";

type InputNumberDeclaration = {
	Arguments: [
		Text?: string,
		Increment?: number,
		Min?: number,
		Max?: number,
		Format?: string | string[],
		NoButtons?: boolean,
	];
	State: {
		number: number;
		editingText: boolean;
	};
	Events: {
		numberChanged: EventApi;
		hovered: EventApi;
	};
};

type InputDeclaration<T> = {
	Arguments: [
		Text?: string,
		Increment?: T,
		Min?: T,
		Max?: T,
		Format?: string | string[],
		Prefix?: string[],
		BaseLine?: number,
	];
	State: {
		number: T;
		editingText: boolean;
	};
	Events: {
		numberChanged: EventApi;
		hovered: EventApi;
	};
};

type InputColorDeclaration = {
	Arguments: [Text?: string, UseFloats?: boolean, UseHSV?: boolean, Format?: string | string[]];
	State: {
		color: Color3;
		editingText: boolean;
	};
	Events: {
		numberChanged: EventApi;
		hovered: EventApi;
	};
};

type InputColor4Declaration = {
	Arguments: [Text?: string, UseFloats?: boolean, UseHSV?: boolean, Format?: string | string[]];
	State: {
		color: Color3;
		transparency: number;
		editingText: boolean;
	};
	Events: {
		numberChanged: EventApi;
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

export {
	InputColor4Declaration,
	InputColorDeclaration,
	InputDeclaration,
	InputNumberDeclaration,
	InputTextDeclaration,
};
