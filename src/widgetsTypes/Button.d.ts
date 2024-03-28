import { Hovered, ClickEvents, WidgetEvents, WidgetArguments } from ".";

type ButtonArguments = [Text: string];

type ButtonEvents = Hovered & ClickEvents;

type BaseButton = WidgetArguments<ButtonArguments> & WidgetEvents<ButtonEvents>;

export type ButtonCreation = BaseButton;
export type SmallButtonCreation = BaseButton;
