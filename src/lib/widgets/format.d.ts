type IndentDeclaration = {
	Arguments: [Width?: number];
};

type SameLineDeclaration = {
	Arguments: [Width?: number, VerticalAlignment?: Enum.VerticalAlignment, HorizontalAlignment?: Enum.HorizontalAlignment];
};

type SeparatorDeclaration = {
	Arguments: [];
};

type GroupDeclaration = {
	Arguments: [];
};

export { IndentDeclaration, SameLineDeclaration, SeparatorDeclaration, GroupDeclaration };
