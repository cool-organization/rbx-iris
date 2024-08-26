import { ClickEvents, Hovered, WidgetArguments } from "./creation/utils";

type ImageArguments = [
	Image: string,
	Size: UDim2,
	ScaleType: Enum.ScaleType,
	ResampleMode: Enum.ResamplerMode,
	TileSize: UDim2,
	SliceCenter: Vector2,
	SliceScale: number,
];

type ImageEvents = Hovered;

type ImageButtonEvents = ClickEvents & Hovered;

export type ImageDeclaration = WidgetArguments<ImageArguments> & ImageEvents;
export type ImageButtonDeclaration = WidgetArguments<ImageArguments> & ImageButtonEvents;
