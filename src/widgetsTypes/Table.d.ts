import { Hovered, WidgetArguments, WidgetEvents } from ".";

type TableArguments = [NumColumns: number, RowBg?: boolean, BordersOuter?: boolean, BordersInner?: boolean];
type TableEvents = Hovered;

export type TableCreation = WidgetArguments<TableArguments> & WidgetEvents<TableEvents>;
