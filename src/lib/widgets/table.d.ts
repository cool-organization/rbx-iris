import { EventApi } from "./creation/widgetClass";

type TableDeclaration = {
	Arguments: [
		NumColumns: number,
		Header?: boolean,
		RowBackground?: boolean,
		OuterBorders?: boolean,
		InnerBorders?: boolean,
		Resizable?: boolean,
		FixedWidth?: boolean,
		ProportionalWidth?: boolean,
		LimitTableWidth?: boolean,
	];
	State: {
		widths: number[];
	};
	Events: {
		hovered: EventApi;
	};
};

export { TableDeclaration };
