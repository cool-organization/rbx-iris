import { Config } from "./iris/config";
import { IrisInternal as Internal } from "./iris/internal";
import { ButtonDeclaration } from "./widgets/button";
import { CheckboxDeclaration } from "./widgets/checkbox";
import { ComboDeclaration, ComboArrayDeclaration, ComboEnumDeclaration, SelectableDeclaration } from "./widgets/combo";
import { Event, EventApi, Events, WidgetClass } from "./widgets/creation/widgetClass";
import { IndentDeclaration, SameLineDeclaration, GroupDeclaration } from "./widgets/format";
import { ImageDeclaration, ImageButtonDeclaration } from "./widgets/image";
import {
	InputNumberDeclaration,
	InputDeclaration,
	InputColorDeclaration,
	InputColor4Declaration,
	InputTextDeclaration,
} from "./widgets/input";
import { MenuDeclaration, MenuItemDeclaration, MenuToggleDeclaration } from "./widgets/menu";
import { ProgressBarDeclaration, PlotLinesDeclaration, PlotHistogramDeclaration } from "./widgets/plot";
import { RadioButtonDeclaration } from "./widgets/radioButton";
import { TableDeclaration } from "./widgets/table";
import { TabBarDeclaration, TabDeclaration } from "./widgets/tab";
import {
	TextDeclaration,
	SeparatorTextDeclaration,
	TextColoredDeclaration,
	TextWrappedDeclaration,
} from "./widgets/text";
import { CollapsingHeaderDeclaration, TreeDeclaration } from "./widgets/tree";
import { WindowDeclaration, TooltipDeclaration } from "./widgets/window";

/* --------------------------------- HELPERS --------------------------------- */

interface State<T = unknown> {
	readonly value: T;
	get(): T;
	set(newValue: T): void;
	onChange(connect: (value: T) => void): () => void;
	changed(): boolean;
}

type Stateify<T> = { [P in keyof T]: State<T[P]> };

type Widget<T extends Record<string, any> = Record<string, unknown>> = {
	ID: string;
	type: string;
	state: T extends { State: infer S } ? (S extends object ? Stateify<S> : undefined) : undefined;
	parentWidget: Widget;
	Instance: GuiObject;
	arguments: T extends { Arguments: infer A } ? A : unknown[];
	ZIndex: number;
	trackedEvents: {};
	lastCycleTick: number;
	isHoveredEvent: boolean;
	lastClickedTick: number;
	lastClickedTime: number;
	lastClickedPosition: Vector2;
	lastRightClickedTick: number;
	lastDoubleClickedTick: number;
	lastCtrlClickedTick: number;
	lastCheckedTick: number;
	lastUncheckedTick: number;
	lastOpenedTick: number;
	lastClosedTick: number;
	lastSelectedTick: number;
	lastUnselectedTick: number;
	lastCollapsedTick: number;
	lastUncollapsedTick: number;
	lastNumberChangedTick: number;
	lastTextchangeTick: number;
	lastShortcutTick: number;
} & (T extends { Events: infer E } ? E : {});

type InitialState<T extends Record<string, unknown>> = {
	[P in keyof T]?: State<T[P]> | T[P];
};

/* -------------------------------- IRIS API -------------------------------- */

interface Connection { Disconnect(): void; }
interface Signal { Connect(callback: () => unknown | void): Connection; }
type EventLike = Callback | Signal;

declare const Internal: Internal;
declare namespace Iris {
	export type WidgetID = string;
	export { Config };
	export { Internal };

	export function Init(instance?: BasePlayerGui | GuiBase, eventConnection?: EventLike): void;
	export function Shutdown(): void;
	export function Connect(this: typeof Iris, callback: () => unknown | void): () => void;
	export function Append(userInstance: GuiObject): void;
	export function ForceRefresh(): void;
	export function End(): void;

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
	export const Args: Record<string, Record<string, number>>;
	export const Events: Record<string, () => boolean>;

	export const TemplateConfig: {
		colorDark: Partial<Config>;
		colorLight: Partial<Config>;
		sizeDefault: Partial<Config>;
		sizeClear: Partial<Config>;
		utilityDefault: Partial<Config>;
	};
	export let _config: Config;

	export function ShowDemoWindow(): Widget<WindowDeclaration>;
}

/* ------------------------------- IRIS EVENT ------------------------------- */
declare namespace Iris {
	export { Event, EventApi, Events };
}

/* ------------------------------- IRIS STATE ------------------------------- */
declare namespace Iris {
	export type Stateify<T> = { [P in keyof T]: State<T[P]> };
	export { State };

	export function State<T>(initialState: T): State<T>;
	export function WeakState<T>(initialState: T): State<T>;
	export function VariableState<T>(variable: T, callback: (value: T) => void): State<T>;
	export function TableState<K, V>(table: Record<K, V>, key: K, callback?: (newValue: V) => boolean | void): State<V>;
	export function ComputedState<T, R>(firstState: State<T>, onChangeCallback: (value: T) => R): State<R>;
}

/* ------------------------------ IRIS WIDGETS ------------------------------ */
declare namespace Iris {
	export { WidgetClass };
	export { Widget };

	/* --------------------------------- WINDOW --------------------------------- */
	export type Window = Widget<WindowDeclaration>;
	export function Window(args: [Title: string, NoTitleBar?: boolean, NoBackground?: boolean, NoCollapse?: boolean, NoClose?: boolean, NoMove?: boolean, NoScrollbar?: boolean, NoResize?: boolean, NoNav?: boolean, NoMenu?: boolean], state?: InitialState<WindowDeclaration["State"]>): Window;

	export type Tooltip = Widget<TooltipDeclaration>;
	export function Tooltip(args: [Text: string]): Tooltip;

	/* ---------------------------------- MENU ---------------------------------- */
	export type MenuBar = Widget;
	export function MenuBar(): MenuBar;

	export type Menu = Widget<MenuDeclaration>;
	export function Menu(args: [Text?: string], state?: InitialState<MenuDeclaration["State"]>): Menu;

	export type MenuItem = Widget<MenuItemDeclaration>;
	export function MenuItem(args: [Text: string, KeyCode?: Enum.KeyCode, ModifierKey?: Enum.ModifierKey]): MenuItem;

	export type MenuToggle = Widget<MenuToggleDeclaration>;
	export function MenuToggle(args: [Text: string, KeyCode?: Enum.KeyCode, ModifierKey?: Enum.ModifierKey], state?: InitialState<MenuToggleDeclaration["State"]>): MenuToggle;

	/* --------------------------------- FORMAT --------------------------------- */
	export type Separator = Widget;
	export function Separator(): Separator;

	export type Indent = Widget<IndentDeclaration>;
	export function Indent(args?: [Width?: number]): Indent;

	export type SameLine = Widget<SameLineDeclaration>;
	export function SameLine(args?: [Width?: number, VerticalAlignment?: Enum.VerticalAlignment, HorizontalAlignment?: Enum.HorizontalAlignment]): SameLine;

	export type Group = Widget;
	export function Group(): Group;

	/* ---------------------------------- TEXT ---------------------------------- */
	export type Text = Widget<TextDeclaration>;
	export function Text(args: [Text: string, Wrapped?: boolean, Color?: Color3, RichText?: boolean]): Text;

	export type SeparatorText = Widget<SeparatorTextDeclaration>;
	export function SeparatorText(args: [Text: string]): SeparatorText;

	export type InputText = Widget<InputTextDeclaration>;
	export function InputText(args: [Text?: string, TextHint?: string, ReadOnly?: boolean, MultiLine?: boolean], state?: InitialState<InputTextDeclaration["State"]>): InputText;

	/* ---------------------------------- BASIC --------------------------------- */
	export type Button = Widget<ButtonDeclaration>;
	export function Button(args: [Text: string, Size?: UDim2]): Button;

	export type SmallButton = Widget<ButtonDeclaration>;
	export function SmallButton(args: [Text: string]): SmallButton;

	export type Checkbox = Widget<CheckboxDeclaration>;
	export function Checkbox(args: [Text?: string], state?: InitialState<CheckboxDeclaration["State"]>): Checkbox;

	export type RadioButton = Widget<RadioButtonDeclaration>;
	export function RadioButton(args: [Text?: string, Index?: unknown], state?: InitialState<RadioButtonDeclaration["State"]>): RadioButton;

	/* ---------------------------------- TREE ---------------------------------- */
	export type Tree = Widget<TreeDeclaration>;
	export function Tree(args: [Text: string, SpanAvailWidth?: boolean, NoIndent?: boolean, DefaultOpen?: true], state?: InitialState<TreeDeclaration["State"]>): Tree;

	export type CollapsingHeader = Widget<CollapsingHeaderDeclaration>;
	export function CollapsingHeader(args: [Text?: string, DefaultOpen?: true], state?: InitialState<CollapsingHeaderDeclaration["State"]>): CollapsingHeader;

	/* ---------------------------------- TABS ---------------------------------- */
	export type TabBar = Widget<TabBarDeclaration>;
	export function TabBar(args?: [], state?: InitialState<TabBarDeclaration["State"]>): TabBar;

	export type Tab = Widget<TabDeclaration>;
	export function Tab(args: [Text: string, Hideable?: boolean], state?: InitialState<TabDeclaration["State"]>): Tab;

	/* --------------------------------- INPUT --------------------------------- */
	export type InputNum = Widget<InputNumberDeclaration>;
	export function InputNum(args: [Text?: string, Increment?: number, Min?: number, Max?: number, Format?: string | string[], NoButtons?: boolean], state?: InitialState<InputNumberDeclaration["State"]>): InputNum;

	export type InputVector2 = Widget<InputDeclaration<Vector2>>;
	export function InputVector2(args: [Text?: string, Increment?: Vector2, Min?: Vector2, Max?: Vector2, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<Vector2>["State"]>): InputVector2;

	export type InputVector3 = Widget<InputDeclaration<Vector3>>;
	export function InputVector3(args: [Text?: string, Increment?: Vector3, Min?: Vector3, Max?: Vector3, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<Vector3>["State"]>): InputVector3;

	export type InputUDim = Widget<InputDeclaration<UDim>>;
	export function InputUDim(args: [Text?: string, Increment?: UDim, Min?: UDim, Max?: UDim, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<UDim>["State"]>): InputUDim;

	export type InputUDim2 = Widget<InputDeclaration<UDim2>>;
	export function InputUDim2(args: [Text?: string, Increment?: UDim2, Min?: UDim2, Max?: UDim2, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<UDim2>["State"]>): InputUDim2;

	export type InputRect = Widget<InputDeclaration<Rect>>;
	export function InputRect(args: [Text?: string, Increment?: Rect, Min?: Rect, Max?: Rect, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<Rect>["State"]>): InputRect;

	export type InputColor3 = Widget<InputColorDeclaration>;
	export function InputColor3(args: [Text?: string, UseFloats?: boolean, UseHSV?: boolean, Format?: string | string[]], state?: InitialState<InputColorDeclaration["State"]>): InputColor3;

	export type InputColor4 = Widget<InputColor4Declaration>;
	export function InputColor4(args: [Text?: string, UseFloats?: boolean, UseHSV?: boolean, Format?: string | string[]], state?: InitialState<InputColor4Declaration["State"]>): InputColor4;

	export type InputEnum = Widget<ComboEnumDeclaration>;
	export function InputEnum(args: [Text?: string, NoButton?: boolean, NoPreview?: boolean], state?: InitialState<ComboEnumDeclaration["State"]>, enumType?: Enum): InputEnum;

	/* ---------------------------------- DRAG ---------------------------------- */
	export type DragNum = Widget<InputDeclaration<number>>;
	export function DragNum(args: [Text?: string, Increment?: number, Min?: number, Max?: number, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<number>["State"]>): DragNum;

	export type DragVector2 = Widget<InputDeclaration<Vector2>>;
	export function DragVector2(args: [Text?: string, Increment?: Vector2, Min?: Vector2, Max?: Vector2, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<Vector2>["State"]>): DragVector2;

	export type DragVector3 = Widget<InputDeclaration<Vector3>>;
	export function DragVector3(args: [Text?: string, Increment?: Vector3, Min?: Vector3, Max?: Vector3, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<Vector3>["State"]>): DragVector3;

	export type DragUDim = Widget<InputDeclaration<UDim>>;
	export function DragUDim(args: [Text?: string, Increment?: UDim, Min?: UDim, Max?: UDim, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<UDim>["State"]>): DragUDim;

	export type DragUDim2 = Widget<InputDeclaration<UDim2>>;
	export function DragUDim2(args: [Text?: string, Increment?: UDim2, Min?: UDim2, Max?: UDim2, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<UDim2>["State"]>): DragUDim2;

	export type DragRect = Widget<InputDeclaration<Rect>>;
	export function DragRect(args: [Text?: string, Increment?: Rect, Min?: Rect, Max?: Rect, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<Rect>["State"]>): DragRect;

	/* --------------------------------- SLIDER --------------------------------- */
	export type SliderNum = Widget<InputNumberDeclaration>;
	export function SliderNum(args: [Text?: string, Increment?: number, Min?: number, Max?: number, Format?: string | string[], NoButtons?: boolean], state?: InitialState<InputNumberDeclaration["State"]>): SliderNum;

	export type SliderVector2 = Widget<InputDeclaration<Vector2>>;
	export function SliderVector2(args: [Text?: string, Increment?: Vector2, Min?: Vector2, Max?: Vector2, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<Vector2>["State"]>): SliderVector2;

	export type SliderVector3 = Widget<InputDeclaration<Vector3>>;
	export function SliderVector3(args: [Text?: string, Increment?: Vector3, Min?: Vector3, Max?: Vector3, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<Vector3>["State"]>): SliderVector3;

	export type SliderUDim = Widget<InputDeclaration<UDim>>;
	export function SliderUDim(args: [Text?: string, Increment?: UDim, Min?: UDim, Max?: UDim, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<UDim>["State"]>): SliderUDim;

	export type SliderUDim2 = Widget<InputDeclaration<UDim2>>;
	export function SliderUDim2(args: [Text?: string, Increment?: UDim2, Min?: UDim2, Max?: UDim2, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<UDim2>["State"]>): SliderUDim2;

	export type SliderRect = Widget<InputDeclaration<Rect>>;
	export function SliderRect(args: [Text?: string, Increment?: Rect, Min?: Rect, Max?: Rect, Format?: string | string[], Prefix?: string[]], state?: InitialState<InputDeclaration<Rect>["State"]>): SliderRect;

	/* --------------------------------- COMBO --------------------------------- */
	export type Combo = Widget<ComboDeclaration>;
	export function Combo(args: [Text?: string, NoButton?: boolean, NoPreview?: boolean], state?: InitialState<ComboDeclaration["State"]>): Combo;

	export type ComboArray = Widget<ComboArrayDeclaration>;
	export function ComboArray(args: [Text?: string, NoButton?: boolean, NoPreview?: boolean], state?: InitialState<ComboArrayDeclaration["State"]>, selectionArray?: unknown[]): ComboArray;

	export type ComboEnum = Widget<ComboEnumDeclaration>;
	export function ComboEnum(args: [Text?: string, NoButton?: boolean, NoPreview?: boolean], state?: InitialState<ComboEnumDeclaration["State"]>, enumType?: Enum): ComboEnum;

	export type Selectable = Widget<SelectableDeclaration>;
	export function Selectable(args: [Text?: string, Index?: unknown, NoClick?: boolean], state?: InitialState<SelectableDeclaration["State"]>): Selectable;

	/* --------------------------------- TABLE --------------------------------- */
	export type Table = Widget<TableDeclaration>;
	export function Table(args: [NumColumns: number, Header?: boolean, RowBackground?: boolean, OuterBorders?: boolean, InnerBorders?: boolean, Resizable?: boolean, FixedWidth?: boolean, ProportionalWidth?: boolean, LimitTableWidth?: boolean]): Table;
	export function NextColumn(): void;
	export function SetColumnIndex(columnIndex: number): void;
	export function NextRow(): void;

	/* ---------------------------------- PLOT ---------------------------------- */
	export type ProgressBar = Widget<ProgressBarDeclaration>;
	export function ProgressBar(args: [Text?: string, Format?: string], state?: InitialState<ProgressBarDeclaration["State"]>): ProgressBar;

	export type PlotLines = Widget<PlotLinesDeclaration>;
	export function PlotLines(args: [Text: string, Height: number, Min: number, Max: number, TextOverlay?: string], state?: InitialState<PlotLinesDeclaration["State"]>): PlotLines;

	export type PlotHistogram = Widget<PlotHistogramDeclaration>;
	export function PlotHistogram(args: [Text: string, Height: number, Min: number, Max: number, TextOverlay?: string, BaseLine?: number], state?: InitialState<PlotHistogramDeclaration["State"]>): PlotHistogram;

	/* --------------------------------- IMAGE --------------------------------- */
	export type Image = Widget<ImageDeclaration>;
	export function Image(args: [Image: string, Size?: UDim2, Rect?: Rect, ScaleType?: Enum.ScaleType, ResampleMode?: Enum.ResamplerMode, TileSize?: UDim2, SliceCenter?: Rect, SliceScale?: number]): Image;

	export type ImageButton = Widget<ImageButtonDeclaration>;
	export function ImageButton(args: [Image: string, Size?: UDim2]): ImageButton;
}

/* ------------------------------- DEPRECATED ------------------------------- */
declare namespace Iris {
	/** @deprecated Use 'Text' with the Color argument or change the config. */
	export type TextColored = Widget<TextColoredDeclaration>;
	/** @deprecated Use 'Text' with the Color argument or change the config. */
	export function TextColored(args: [Text: string, Color?: Color3]): TextColored;

	/** @deprecated Use 'Text' with the Wrapped argument or change the config. */
	export type TextWrapped = Widget<TextWrappedDeclaration>;
	/** @deprecated Use 'Text' with the Wrapped argument or change the config. */
	export function TextWrapped(args: [Text: string]): TextWrapped;
}

export default Iris;
