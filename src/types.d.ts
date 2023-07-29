interface TextEnum {
	Text: 1;
}

interface InputColorEnum extends TextEnum {
	UseFloats: 2;
	UseHSV: 3;
	Format: 4;
}

interface NumberEnum extends TextEnum {
	Increment: 2;
	Min: 3;
	Max: 4;
	Format: 5;
}

interface WidthEnum {
	Width: 1;
}

interface IndexEnum extends TextEnum {
	Index: 2;
}

export interface WidgetEnums {
	Button: TextEnum;
	Checkbox: TextEnum;
	CollapsingHeader: TextEnum;

	Combo: TextEnum & {
		NoButton: 2;
		NoPreview: 3;
	};

	DragNum: NumberEnum;
	Group: {};
	Indent: WidthEnum;
	InputColor3: InputColorEnum;
	InputColor4: InputColorEnum;

	InputNum: NumberEnum & {
		NoButtons: 6;
		NoField: 7;
	};

	InputText: TextEnum & { TextHint: 2 };
	InputUDim: NumberEnum;
	InputUDim2: NumberEnum;
	InputVector2: NumberEnum;
	InputVector3: NumberEnum;

	RadioButton: IndexEnum;
	Root: {};
	SameLine: WidthEnum & { VerticalAlignment: 2 };
	Selectable: IndexEnum & { NoClick: 3 };
	Separator: {};
	SliderNum: NumberEnum;
	SmallButton: TextEnum;
	Table: {
		NumColumns: 1;
		RowBg: 2;
		BordersOuter: 3;
		BordersInner: 4;
	};

	Text: TextEnum;
	TextColored: TextEnum & { Color: 2 };
	TextWrapped: TextEnum;
	Tooltip: TextEnum;
	Tree: TextEnum & {
		SpanAvailWidth: 2;
		NoIndent: 3;
	};

	Window: {
		Title: 1;
		NoTitleBar: 2;
		NoBackground: 3;
		NoCollapse: 4;
		NoClose: 5;
		NoMove: 6;
		NoScrollbar: 7;
		NoResize: 8;
		NoNav: 9;
	};
}
