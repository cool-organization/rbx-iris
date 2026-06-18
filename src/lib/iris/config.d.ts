export interface Config {
	TextColor: Color3;
	TextTransparency: number;
	TextDisabledColor: Color3;
	TextDisabledTransparency: number;

	BorderColor: Color3;
	BorderActiveColor: Color3;
	BorderTransparency: number;
	BorderActiveTransparency: number;

	WindowBgColor: Color3;
	WindowBgTransparency: number;
	ScrollbarGrabColor: Color3;
	ScrollbarGrabTransparency: number;
	PopupBgColor: Color3;
	PopupBgTransparency: number;

	TitleBgColor: Color3;
	TitleBgTransparency: number;
	TitleBgActiveColor: Color3;
	TitleBgActiveTransparency: number;
	TitleBgCollapsedColor: Color3;
	TitleBgCollapsedTransparency: number;

	MenubarBgColor: Color3;
	MenubarBgTransparency: number;

	FrameBgColor: Color3;
	FrameBgTransparency: number;
	FrameBgHoveredColor: Color3;
	FrameBgHoveredTransparency: number;
	FrameBgActiveColor: Color3;
	FrameBgActiveTransparency: number;

	ButtonColor: Color3;
	ButtonTransparency: number;
	ButtonHoveredColor: Color3;
	ButtonHoveredTransparency: number;
	ButtonActiveColor: Color3;
	ButtonActiveTransparency: number;

	ImageColor: Color3;
	ImageTransparency: number;

	SliderGrabColor: Color3;
	SliderGrabTransparency: number;
	SliderGrabActiveColor: Color3;
	SliderGrabActiveTransparency: number;

	HeaderColor: Color3;
	HeaderTransparency: number;
	HeaderHoveredColor: Color3;
	HeaderHoveredTransparency: number;
	HeaderActiveColor: Color3;
	HeaderActiveTransparency: number;

	TabColor: Color3;
	TabTransparency: number;
	TabHoveredColor: Color3;
	TabHoveredTransparency: number;
	TabActiveColor: Color3;
	TabActiveTransparency: number;

	SelectionImageObjectColor: Color3;
	SelectionImageObjectTransparency: number;
	SelectionImageObjectBorderColor: Color3;
	SelectionImageObjectBorderTransparency: number;

	TableBorderStrongColor: Color3;
	TableBorderStrongTransparency: number;
	TableBorderLightColor: Color3;
	TableBorderLightTransparency: number;
	TableRowBgColor: Color3;
	TableRowBgTransparency: number;
	TableRowBgAltColor: Color3;
	TableRowBgAltTransparency: number;
	TableHeaderColor: Color3;
	TableHeaderTransparency: number;

	NavWindowingHighlightColor: Color3;
	NavWindowingHighlightTransparency: number;
	NavWindowingDimBgColor: Color3;
	NavWindowingDimBgTransparency: number;

	SeparatorColor: Color3;
	SeparatorTransparency: number;

	CheckMarkColor: Color3;
	CheckMarkTransparency: number;

	PlotLinesColor: Color3;
	PlotLinesTransparency: number;
	PlotLinesHoveredColor: Color3;
	PlotLinesHoveredTransparency: number;
	PlotHistogramColor: Color3;
	PlotHistogramTransparency: number;
	PlotHistogramHoveredColor: Color3;
	PlotHistogramHoveredTransparency: number;

	ResizeGripColor: Color3;
	ResizeGripTransparency: number;
	ResizeGripHoveredColor: Color3;
	ResizeGripHoveredTransparency: number;
	ResizeGripActiveColor: Color3;
	ResizeGripActiveTransparency: number;

	HoverColor: Color3;
	HoverTransparency: number;

	// Sizes
	ItemWidth: UDim;
	ContentWidth: UDim;
	ContentHeight: UDim;

	WindowPadding: Vector2;
	WindowResizePadding: Vector2;
	FramePadding: Vector2;
	ItemSpacing: Vector2;
	ItemInnerSpacing: Vector2;
	CellPadding: Vector2;
	DisplaySafeAreaPadding: Vector2;
	IndentSpacing: number;
	SeparatorTextPadding: Vector2;

	TextFont: Font;
	TextSize: number;
	FrameBorderSize: number;
	FrameRounding: number;
	GrabRounding: number;
	WindowBorderSize: number;
	WindowTitleAlign: Enum.LeftRight;
	PopupBorderSize: number;
	PopupRounding: number;
	ScrollbarSize: number;
	GrabMinSize: number;
	SeparatorTextBorderSize: number;
	ImageBorderSize: number;

	UseScreenGUIs: boolean;
	IgnoreGuiInset: boolean;
	ScreenInsets: Enum.ScreenInsets;
	Parent: BasePlayerGui;
	RichText: boolean;
	TextWrapped: boolean;
	DisplayOrderOffset: number;
	ZIndexOffset: number;

	MouseDoubleClickTime: number;
	MouseDoubleClickMaxDist: number;
	MouseDragThreshold: number;
}
