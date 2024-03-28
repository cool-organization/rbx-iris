import { CheckEvents, Clicked, Hovered, OpenEvents, WidgetArguments, WidgetEvents, WidgetState } from ".";

type MenuArguments = [Text: string];
type MenuEvents = Clicked & Hovered & OpenEvents;
type MenuState = {
	isOpened: boolean;
};

type MenuItemArguments = [Text: string, KeyCode?: Enum.KeyCode, ModifierKey?: Enum.ModifierKey];
type MenuItemEvents = Clicked & Hovered;

type MenuToggleArguments = MenuItemArguments;
type MenuToggleEvents = Hovered & CheckEvents;
type MenuToggleState = {
	isChecked: boolean;
};

export type MenuCreation = WidgetArguments<[...MenuArguments]> & WidgetEvents<MenuEvents> & WidgetState<MenuState>;
export type MenuItemCreation = WidgetArguments<MenuItemArguments> & WidgetEvents<MenuItemEvents>;

export type MenuToggleCreation = WidgetArguments<MenuToggleArguments> &
	WidgetEvents<MenuToggleEvents> &
	WidgetState<MenuToggleState>;
