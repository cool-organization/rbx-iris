import { Config } from "./iris/config";
import { IrisInternal as Internal } from "./iris/internal";
import { BaseButtonDeclaration, ButtonArguments } from "./widgets/button";
import { CheckboxDeclaration, CheckboxArguments, CheckboxState } from "./widgets/checkbox";
import {
	ComboArguments,
	ComboState,
	ComboDeclaration,
	ComboArrayDeclaration,
	ComboEnumDeclaration,
	SelectableDeclaration,
	SelectableArguments,
	SelectableState,
} from "./widgets/combo";
import { Arguments, InitialState } from "./widgets/creation/utils";
import { Widget } from "./widgets/creation/widget";
import { Event, EventApi, Events, WidgetClass } from "./widgets/creation/widgetClass";
import { IndentDeclaration, IndentArguments, SameLineArguments } from "./widgets/format";
import { ImageDeclaration, ImageArguments, ImageButtonDeclaration } from "./widgets/image";
import {
	InputNumDeclaration,
	InputNumArguments,
	InputState,
	InputWidgetDeclaration,
	InputArguments,
	InputColor3Declaration,
	InputColorArguments,
	InputColorState,
	InputColor4Declaration,
	InputColor4State,
} from "./widgets/input";
import {
	MenuDeclaration,
	MenuArguments,
	MenuState,
	MenuItemDeclaration,
	MenuItemArguments,
	MenuToggleDeclaration,
	MenuToggleArguments,
	MenuToggleState,
} from "./widgets/menu";
import { ProgressBarDeclaration, ProgressBarArguments, ProgressBarState } from "./widgets/plot";
import { RadioButtonDeclaration, RadioButtonArguments, RadioButtonState } from "./widgets/radioButton";
import { TableDeclaration, TableArguments } from "./widgets/table";
import {
	InputTextDeclaration,
	InputTextArguments,
	InputTextState,
	SeparatorTextDeclaration,
	SeparatorTextArguments,
	TextDeclaration,
	TextArguments,
	TextColoredArguments,
	TextColoredDeclaration,
	TextWrappedArguments,
	TextWrappedDeclaration,
} from "./widgets/text";
import {
	CollapsingHeaderDeclaration,
	CollapsingHeaderArguments,
	CollapsableState,
	TreeDeclaration,
	TreeArguments,
} from "./widgets/tree";
import {
	WindowDeclaration,
	WindowArguments,
	WindowState,
	TooltipDeclaration,
	TooltipArguments,
} from "./widgets/window";

/* -------------------------------- IRIS API -------------------------------- */

interface Connection {
	Disconnect(): void;
}
interface Signal {
	Connect(callback: () => unknown | void): Connection;
}
type EventLike = Callback | Signal;
declare const Internal: Internal;
declare namespace Iris {
	export type WidgetID = string;
	export { Config };
	export { Internal };

	export function Init(instance?: BasePlayerGui | GuiBase, eventConnection?: EventLike): void;
	export function Shutdown(): void;
	export function Connect(this: typeof Iris, callback: () => unknown | void): void;
	export function Append(userInstance: GuiObject): void;
	export function ForceRefresh(): void;

	// Widget
	export function SetFocusedWindow(thisWidget: Widget): void;

	// ID API
	export function PushId(id: WidgetID): void;
	export function PopId(id: WidgetID): void;
	export function SetNextWidgetID(id: WidgetID): void;

	// Config API
	export function UpdateGlobalConfig(style: Partial<Config>): void;
	export function PushConfig(style: Partial<Config>): void;
	export function PopConfig(): void;

	// Properties
	export let Disabled: boolean;
	export const TemplateConfig: {
		/**
		 * Dear, ImGui default dark
		 */
		colorDark: Partial<Config>;
		/**
		 * Dear, ImGui default light
		 */
		colorLight: Partial<Config>;
		/**
		 * Dear, ImGui default
		 */
		sizeDefault: Partial<Config>;
		/**
		 * Easier to read and manuveure
		 */
		sizeClear: Partial<Config>;
		utilityDefault: Partial<Config>;
	};
	export let _config: Config;

	export function ShowDemoWindow(): Widget;
}

/* ------------------------------- IRIS EVENT ------------------------------- */
declare namespace Iris {
	export { Event };
	export { EventApi };
	export { Events };
}

/* ------------------------------- IRIS STATE ------------------------------- */

declare namespace Iris {
	type Stateify<T> = {
		[P in keyof T]: State<T[P]>;
	};
	export interface State<T = unknown> {
		readonly value: T;
		// ConnectedWidgets: Record<ID, Widget>;
		// ConnectedFunctions: Array<(value: unknown) => void>;

		get(): T;
		set(newValue: T): void;
		onChange(connect: (value: T) => void): void;
	}

	export function State<T>(initialState: T): State<T>;
	export function WeakState<T>(initialState: T): State<T>;
	export function ComputedState<T, R>(firstState: T, onChangeCallback: (value: T) => R): State<R>;
}

/* ------------------------------ IRIS WIDGETS ------------------------------ */

declare namespace Iris {
	export { WidgetClass };
	export { Widget };
	export function End(): void;

	/* --------------------------------- WINDOW --------------------------------- */

	export type Window = Widget<WindowDeclaration>;
	export function Window(args: WindowArguments, state?: InitialState<WindowState>): Window;
	export function Window(args: Arguments<WindowArguments>, state?: InitialState<WindowState>): Window;

	export type Tooltip = Widget<TooltipDeclaration>;
	export function Tooltip(args: TooltipArguments): Tooltip;
	export function Tooltip(args: Arguments<TooltipArguments>): Tooltip;

	/* ---------------------------------- MENU ---------------------------------- */

	export type Menu = Widget<MenuDeclaration>;
	export function Menu(args: MenuArguments, state?: InitialState<MenuState>): Menu;
	export function Menu(args: Arguments<MenuArguments>, state?: InitialState<MenuState>): Menu;

	export type MenuBar = Widget<{}>;
	export function MenuBar(): MenuBar;

	export type MenuItem = Widget<MenuItemDeclaration>;
	export function MenuItem(args: MenuItemArguments): MenuItem;
	export function MenuItem(args: Arguments<MenuItemArguments>): MenuItem;

	export type MenuToggle = Widget<MenuToggleDeclaration>;
	export function MenuToggle(args: MenuToggleArguments, state?: InitialState<MenuToggleState>): MenuToggle;
	export function MenuToggle(args: Arguments<MenuToggleArguments>, state?: InitialState<MenuToggleState>): MenuToggle;

	/* --------------------------------- FORMAT --------------------------------- */

	export type Group = Widget<{}>;
	export function Group(): Group;

	export type Indent = Widget<IndentDeclaration>;
	export function Indent(args: IndentArguments): Indent;
	export function Indent(args: Arguments<IndentArguments>): Indent;

	export type SameLine = Widget<{}>;
	export function SameLine(args: SameLineArguments): SameLine;
	export function SameLine(args: Arguments<SameLineArguments>): SameLine;

	export type Separator = Widget<{}>;
	export function Separator(): Separator;

	/* --------------------------------- TEXT --------------------------------- */

	export type InputText = Widget<InputTextDeclaration>;
	export function InputText(args: InputTextArguments, state?: InitialState<InputTextState>): InputText;
	export function InputText(args: Arguments<InputTextArguments>, state?: InitialState<InputTextState>): InputText;

	export type SeparatorText = Widget<SeparatorTextDeclaration>;
	export function SeparatorText(args: SeparatorTextArguments): SeparatorText;
	export function SeparatorText(args: Arguments<SeparatorTextArguments>): SeparatorText;

	export type Text = Widget<TextDeclaration>;
	export function Text(args: TextArguments): Text;
	export function Text(args: Arguments<TextArguments>): Text;

	/* ---------------------------------- BASIC --------------------------------- */

	export type Button = Widget<BaseButtonDeclaration>;
	export function Button(args: ButtonArguments): Button;
	export function Button(args: Arguments<ButtonArguments>): Button;

	export type SmallButton = Widget<BaseButtonDeclaration>;
	export function SmallButton(args: ButtonArguments): SmallButton;
	export function SmallButton(args: Arguments<ButtonArguments>): SmallButton;

	export type Checkbox = Widget<CheckboxDeclaration>;
	export function Checkbox(args: CheckboxArguments, state?: InitialState<CheckboxState>): Checkbox;
	export function Checkbox(args: Arguments<CheckboxArguments>, state?: InitialState<CheckboxState>): Checkbox;

	export type RadioButton = Widget<RadioButtonDeclaration>;
	export function RadioButton(args: RadioButtonArguments, state?: InitialState<RadioButtonState>): RadioButton;
	export function RadioButton(
		args: Arguments<RadioButtonArguments>,
		state?: InitialState<RadioButtonState>,
	): RadioButton;

	/* ---------------------------------- TREE --------------------------------- */

	export type CollapsingHeader = Widget<CollapsingHeaderDeclaration>;
	export function CollapsingHeader(
		args: CollapsingHeaderArguments,
		state?: InitialState<CollapsableState>,
	): CollapsingHeader;
	export function CollapsingHeader(
		args: Arguments<CollapsingHeaderArguments>,
		state?: InitialState<CollapsableState>,
	): CollapsingHeader;

	export type Tree = Widget<TreeDeclaration>;
	export function Tree(args: TreeArguments, state?: InitialState<CollapsableState>): Tree;
	export function Tree(args: Arguments<TreeArguments>, state?: InitialState<CollapsableState>): Tree;

	export type InputNum = Widget<InputNumDeclaration>;
	export function InputNum(args: InputNumArguments, state?: InitialState<InputState<number>>): InputNum;
	export function InputNum(args: Arguments<InputNumArguments>, state?: InitialState<InputState<number>>): InputNum;

	export type InputRect = Widget<InputWidgetDeclaration<Rect>>;
	export function InputRect(args: InputArguments<Rect>, state?: InitialState<InputState<Rect>>): InputRect;
	export function InputRect(args: Arguments<InputArguments<Rect>>, state?: InitialState<InputState<Rect>>): InputRect;

	export type InputUDim = Widget<InputWidgetDeclaration<UDim>>;
	export function InputUDim(args: InputArguments<UDim>, state?: InitialState<InputState<UDim>>): InputUDim;
	export function InputUDim(args: Arguments<InputArguments<UDim>>, state?: InitialState<InputState<UDim>>): InputUDim;

	export type InputUDim2 = Widget<InputWidgetDeclaration<UDim2>>;
	export function InputUDim2(args: InputArguments<UDim2>, state?: InitialState<InputState<UDim2>>): InputUDim2;
	export function InputUDim2(
		args: Arguments<InputArguments<UDim2>>,
		state?: InitialState<InputState<UDim2>>,
	): InputUDim2;

	export type InputVector2 = Widget<InputWidgetDeclaration<Vector2>>;
	export function InputVector2(
		args: InputArguments<Vector2>,
		state?: InitialState<InputState<Vector2>>,
	): InputVector2;
	export function InputVector2(
		args: Arguments<InputArguments<Vector2>>,
		state?: InitialState<InputState<Vector2>>,
	): InputVector2;

	export type InputVector3 = Widget<InputWidgetDeclaration<Vector3>>;
	export function InputVector3(
		args: InputArguments<Vector3>,
		state?: InitialState<InputState<Vector3>>,
	): InputVector3;
	export function InputVector3(
		args: Arguments<InputArguments<Vector3>>,
		state?: InitialState<InputState<Vector3>>,
	): InputVector3;

	export type InputColor3 = Widget<InputColor3Declaration>;
	export function InputColor3(args: InputColorArguments, state?: InitialState<InputColorState>): InputColor3;
	export function InputColor3(
		args: Arguments<InputColorArguments>,
		state?: InitialState<InputColorState>,
	): InputColor3;

	export type InputColor4 = Widget<InputColor4Declaration>;
	export function InputColor4(args: InputColorArguments, state?: InitialState<InputColor4State>): InputColor4;
	export function InputColor4(
		args: Arguments<InputColorArguments>,
		state?: InitialState<InputColor4State>,
	): InputColor4;

	export type InputEnum = ComboEnum;
	export function InputEnum(
		args: ComboArguments,
		state: InitialState<ComboState> | undefined,
		enumType: Enum,
	): InputEnum;
	export function InputEnum(
		args: Arguments<ComboArguments>,
		state: InitialState<ComboState> | undefined,
		enumType: Enum,
	): InputEnum;

	/* ---------------------------------- DRAG ---------------------------------- */

	export type DragNum = Widget<InputWidgetDeclaration<number>>;
	export function DragNum(args: InputArguments<number>, state?: InitialState<InputState<number>>): DragNum;
	export function DragNum(args: Arguments<InputArguments<number>>, state?: InitialState<InputState<number>>): DragNum;

	export type DragRect = Widget<InputWidgetDeclaration<Rect>>;
	export function DragRect(args: InputArguments<Rect>, state?: InitialState<InputState<Rect>>): DragRect;
	export function DragRect(args: Arguments<InputArguments<Rect>>, state?: InitialState<InputState<Rect>>): DragRect;

	export type DragUDim = Widget<InputWidgetDeclaration<UDim>>;
	export function DragUDim(args: InputArguments<UDim>, state?: InitialState<InputState<UDim>>): DragUDim;
	export function DragUDim(args: Arguments<InputArguments<UDim>>, state?: InitialState<InputState<UDim>>): DragUDim;

	export type DragUDim2 = Widget<InputWidgetDeclaration<UDim2>>;
	export function DragUDim2(args: InputArguments<UDim2>, state?: InitialState<InputState<UDim2>>): DragUDim2;
	export function DragUDim2(
		args: Arguments<InputArguments<UDim2>>,
		state?: InitialState<InputState<UDim2>>,
	): DragUDim2;

	export type DragVector2 = Widget<InputWidgetDeclaration<Vector2>>;
	export function DragVector2(args: InputArguments<Vector2>, state?: InitialState<InputState<Vector2>>): DragVector2;
	export function DragVector2(
		args: Arguments<InputArguments<Vector2>>,
		state?: InitialState<InputState<Vector2>>,
	): DragVector2;

	export type DragVector3 = Widget<InputWidgetDeclaration<Vector3>>;
	export function DragVector3(args: InputArguments<Vector3>, state?: InitialState<InputState<Vector3>>): DragVector3;
	export function DragVector3(
		args: Arguments<InputArguments<Vector3>>,
		state?: InitialState<InputState<Vector3>>,
	): DragVector3;

	/* ---------------------------------- SLIDER --------------------------------- */

	export type SliderNum = Widget<InputWidgetDeclaration<number>>;
	export function SliderNum(args: InputNumArguments, state?: InitialState<InputState<number>>): SliderNum;
	export function SliderNum(args: Arguments<InputNumArguments>, state?: InitialState<InputState<number>>): SliderNum;

	export type SliderRect = Widget<InputWidgetDeclaration<Rect>>;
	export function SliderRect(args: InputArguments<Rect>, state?: InitialState<InputState<Rect>>): SliderRect;
	export function SliderRect(
		args: Arguments<InputArguments<Rect>>,
		state?: InitialState<InputState<Rect>>,
	): SliderRect;

	export type SliderUDim = Widget<InputWidgetDeclaration<UDim>>;
	export function SliderUDim(args: InputArguments<UDim>, state?: InitialState<InputState<UDim>>): SliderUDim;
	export function SliderUDim(
		args: Arguments<InputArguments<UDim>>,
		state?: InitialState<InputState<UDim>>,
	): SliderUDim;

	export type SliderUDim2 = Widget<InputWidgetDeclaration<UDim2>>;
	export function SliderUDim2(args: InputArguments<UDim2>, state?: InitialState<InputState<UDim2>>): SliderUDim2;
	export function SliderUDim2(
		args: Arguments<InputArguments<UDim2>>,
		state?: InitialState<InputState<UDim2>>,
	): SliderUDim2;

	export type SliderVector2 = Widget<InputWidgetDeclaration<Vector2>>;
	export function SliderVector2(
		args: InputArguments<Vector2>,
		state?: InitialState<InputState<Vector2>>,
	): SliderVector2;
	export function SliderVector2(
		args: Arguments<InputArguments<Vector2>>,
		state?: InitialState<InputState<Vector2>>,
	): SliderVector2;

	export type SliderVector3 = Widget<InputWidgetDeclaration<Vector3>>;
	export function SliderVector3(
		args: InputArguments<Vector3>,
		state?: InitialState<InputState<Vector3>>,
	): SliderVector3;
	export function SliderVector3(
		args: Arguments<InputArguments<Vector3>>,
		state?: InitialState<InputState<Vector3>>,
	): SliderVector3;

	/* ---------------------------------- COMBO --------------------------------- */

	export type Combo = Widget<ComboDeclaration>;
	export function Combo(args: ComboArguments, state?: InitialState<ComboState>): Combo;
	export function Combo(args: Arguments<ComboArguments>, state?: InitialState<ComboState>): Combo;

	export type ComboArray = Widget<ComboArrayDeclaration>;
	export function ComboArray(
		args: ComboArguments,
		state: InitialState<ComboState> | undefined,
		arr: Array<unknown>,
	): ComboArray;
	export function ComboArray(
		args: Arguments<ComboArguments>,
		state: InitialState<ComboState> | undefined,
		arr: Array<unknown>,
	): ComboArray;

	export type ComboEnum = Widget<ComboEnumDeclaration>;
	export function ComboEnum(
		args: ComboArguments,
		state: InitialState<ComboState> | undefined,
		enumType: Enum,
	): ComboEnum;
	export function ComboEnum(
		args: Arguments<ComboArguments>,
		state: InitialState<ComboState> | undefined,
		enumType: Enum,
	): ComboEnum;

	export type Selectable = Widget<SelectableDeclaration>;
	export function Selectable(args: SelectableArguments, state?: InitialState<SelectableState>): Selectable;
	export function Selectable(args: Arguments<SelectableArguments>, state?: InitialState<SelectableState>): Selectable;

	/* ---------------------------------- TABLE --------------------------------- */

	export type Table = Widget<TableDeclaration>;
	export function Table(args: TableArguments): Table;
	export function Table(args: Arguments<TableArguments>): Table;
	// Table API
	export function NextColumn(): void;
	export function SetColumnIndex(columnIndex: number): void;
	export function NextRow(): void;

	/* ---------------------------------- PLOT ---------------------------------- */

	export type ProgressBar = Widget<ProgressBarDeclaration>;
	export function ProgressBar(args: ProgressBarArguments, state?: InitialState<ProgressBarState>): ProgressBar;
	export function ProgressBar(
		args: Arguments<ProgressBarArguments>,
		state?: InitialState<ProgressBarState>,
	): ProgressBar;

	/* ---------------------------------- IMAGE --------------------------------- */

	export type Image = Widget<ImageDeclaration>;
	export function Image(args: ImageArguments): Image;
	export function Image(args: Arguments<ImageArguments>): Image;

	export type ImageButton = Widget<ImageButtonDeclaration>;
	export function ImageButton(args: ImageArguments): ImageButton;
	export function ImageButton(args: Arguments<ImageArguments>): ImageButton;
}

/* ------------------------------- DEPRECATED ------------------------------- */
declare namespace Iris {
	/**
	 * @deprecated Use 'Text' with the Color argument or change the config.
	 */
	export type TextColored = Widget<TextColoredDeclaration>;
	/**
	 * @deprecated Use 'Text' with the Color argument or change the config.
	 */
	export function TextColored(args: TextColoredArguments): TextColored;
	/**
	 * @deprecated Use 'Text' with the Color argument or change the config.
	 */
	export function TextColored(args: Arguments<TextColoredArguments>): TextColored;

	/**
	 * @deprecated Use 'Text' with the Wrapped argument or change the config.
	 */
	export type TextWrapped = Widget<TextWrappedDeclaration>;
	/**
	 * @deprecated Use 'Text' with the Wrapped argument or change the config.
	 */
	export function TextWrapped(args: TextWrappedArguments): TextWrapped;
	/**
	 * @deprecated Use 'Text' with the Wrapped argument or change the config.
	 */
	export function TextWrapped(args: Arguments<TextWrappedArguments>): TextWrapped;
}

export default Iris;
