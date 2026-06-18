import { EventApi } from "./creation/widgetClass";

type ProgressBarDeclaration = {
	Arguments: [Text?: string, Format?: string];
	State: {
		progress: number;
	};
	Events: {
		changed: EventApi;
		hovered: EventApi;
	};
};

type PlotLinesDeclaration = {
	Arguments: [Text: string, Height: number, Min: number, Max: number, TextOverlay?: string];
	State: {
		values: number[];
	};
	Events: {
		hovered: EventApi;
	};
};

type PlotHistogramDeclaration = {
	Arguments: [Text: string, Height: number, Min: number, Max: number, TextOverlay?: string, BaseLine?: number];
	State: {
		values: number[];
	};
	Events: {
		hovered: EventApi;
	};
};

export { PlotHistogramDeclaration, PlotLinesDeclaration, ProgressBarDeclaration };
