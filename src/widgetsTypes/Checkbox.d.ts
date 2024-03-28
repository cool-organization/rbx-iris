import { CheckEvents, Hovered, WidgetArguments, WidgetEvents, WidgetState } from ".";

type CheckboxArguments = [Text: string];

type CheckboxEvents = CheckEvents & Hovered;

type CheckboxState = {
	isChecked: boolean;
};

export type CheckboxCreation = WidgetArguments<CheckboxArguments> &
	WidgetState<CheckboxState> &
	WidgetEvents<CheckboxEvents>;
