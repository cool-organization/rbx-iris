import { EventApi } from "./creation/widgetClass";

type TreeDeclaration = {
	Arguments: [Text: string, SpanAvailWidth?: boolean, NoIndent?: boolean, DefaultOpen?: true];
	State: {
		isUncollapsed: boolean;
	};
	Events: {
		hovered: EventApi;
		collapsed: EventApi;
		uncollapsed: EventApi;
	};
};

type CollapsingHeaderDeclaration = {
	Arguments: [Text?: string, DefaultOpen?: true];
	State: {
		isUncollapsed: boolean;
	};
	Events: {
		hovered: EventApi;
		collapsed: EventApi;
		uncollapsed: EventApi;
	};
};

export { CollapsingHeaderDeclaration, TreeDeclaration };
