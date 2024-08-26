import { Hovered, WidgetArguments, WidgetEvents } from "./creation/utils";

type TableArguments = [NumColumns: number, RowBg?: boolean, BordersOuter?: boolean, BordersInner?: boolean];
type TableEvents = Hovered;

export type TableDeclaration = WidgetArguments<TableArguments> & WidgetEvents<TableEvents>;
