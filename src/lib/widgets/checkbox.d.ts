import { CheckEvents, Hovered, WidgetArguments, WidgetEvents, WidgetState } from "./creation/utils";

type CheckboxArguments = [Text: string];

type CheckboxEvents = CheckEvents & Hovered;

type CheckboxState = {
	isChecked: boolean;
};

export type CheckboxDeclaration = WidgetArguments<CheckboxArguments> & WidgetState<CheckboxState> & WidgetEvents<CheckboxEvents>;
