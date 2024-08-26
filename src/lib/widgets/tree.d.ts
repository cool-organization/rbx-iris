import { CollapseEvents, Hovered, WidgetArguments, WidgetEvents, WidgetState } from "./creation/utils";

type TreeArguments = [Text: string, SpanAvailWidth?: boolean, NoIndent?: boolean];
type CollapsableEvents = Hovered & CollapseEvents;
type CollapsableState = {
	isUncollapsed: boolean;
};

type CollapsingHeaderArguments = [Text: string];

export type TreeDeclaration = WidgetArguments<TreeArguments> & WidgetEvents<CollapsableEvents> & WidgetState<CollapsableState>;

export type CollapsingHeaderDeclaration = WidgetArguments<CollapsingHeaderArguments> & WidgetEvents<CollapsableEvents> & WidgetState<CollapsableState>;
