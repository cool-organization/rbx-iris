import { EventApi } from "./creation/widgetClass";

type ImageDeclaration = {
	Arguments: [
		Image: string,
		Size?: UDim2,
		Rect?: Rect,
		ScaleType?: Enum.ScaleType,
		ResampleMode?: Enum.ResamplerMode,
		TileSize?: UDim2,
		SliceCenter?: Rect,
		SliceScale?: number,
	];
	Events: {
		hovered: EventApi;
	};
};

type ImageButtonDeclaration = {
	Arguments: [
		Image: string,
		Size?: UDim2,
		Rect?: Rect,
		ScaleType?: Enum.ScaleType,
		ResampleMode?: Enum.ResamplerMode,
		TileSize?: UDim2,
		SliceCenter?: Rect,
		SliceScale?: number,
	];
	Events: {
		hovered: EventApi;
		clicked: EventApi;
		rightClicked: EventApi;
		doubleClicked: EventApi;
		ctrlClicked: EventApi;
	};
};

export { ImageButtonDeclaration, ImageDeclaration };
