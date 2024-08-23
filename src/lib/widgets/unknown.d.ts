import { Active, CheckEvents, ClickEvents, CollapseEvents, Hovered, OpenEvents, SelectEvents, WidgetArguments } from "./creation/utils";
import { EventApi } from "./creation/widgetClass";

type UnknownArguments = [...unknown[]];

type ActivatedEvents = {
	activated: EventApi;
	deactivated: EventApi;
};
type NumberChanged = {
	numberChanged: EventApi;
};
type TextChanged = {
	textChanged: EventApi;
};

type UnknownEvents = Hovered & ClickEvents & CheckEvents & ActivatedEvents & CollapseEvents & SelectEvents & OpenEvents & Active & NumberChanged & TextChanged;

type UnknownState = Record<string, unknown>;

export type UnknownDeclaration = WidgetArguments<UnknownArguments> & UnknownEvents;
