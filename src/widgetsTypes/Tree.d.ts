import { CollapseEvents, Hovered, WidgetArguments, WidgetEvents, WidgetState } from ".";

type TreeArguments = [Text: string, SpanAvailWidth?: boolean, NoIndent?: boolean];
type CollapsableEvents = Hovered & CollapseEvents;
type CollapsableState = {
	isUncollapsed: boolean;
};

type CollapsingHeaderArguments = [Text: string];

export type TreeCreation = WidgetArguments<TreeArguments> &
	WidgetEvents<CollapsableEvents> &
	WidgetState<CollapsableState>;

export type CollapsingHeaderCreation = WidgetArguments<CollapsingHeaderArguments> &
	WidgetEvents<CollapsableEvents> &
	WidgetState<CollapsableState>;
