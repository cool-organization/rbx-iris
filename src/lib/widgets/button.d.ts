import { ClickEvents, Hovered, WidgetArguments, WidgetEvents } from "./creation/utils";

type ButtonArguments = [Text: string];
type ButtonEvents = Hovered & ClickEvents;
export type BaseButtonDeclaration = WidgetArguments<ButtonArguments> & WidgetEvents<ButtonEvents>;
