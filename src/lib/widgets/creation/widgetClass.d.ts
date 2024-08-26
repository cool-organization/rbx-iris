import { Widget } from "../../..";

interface Event {
	Init: (thisWidget: Widget) => void;
	Get: (thisWidget: Widget) => boolean;
}
type Events = Record<string, Event>;
type EventApi = () => boolean;

declare class WidgetClass {
	Generate(): GuiObject;
	Discard(): void;
	Update(...args: any[]): void;

	static readonly Args: Record<string, number>;
	static readonly Events: Events;
	static readonly hasChildren: boolean;
	static readonly hasState: boolean;

	ArgNames: Array<string>;

	GenerateState(): void;
	UpdateState(): void;

	ChildAdded(): GuiObject;
	ChildDiscarded(): void;
}
