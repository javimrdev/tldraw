import { StateNode, TLTextShape, toRichText } from "tldraw";

const OFFSET = 12;

export class AddBikeSticker extends StateNode {
	static override id = "bikesticker";

	override onEnter() {
		this.editor.setCursor({ type: "cross", rotation: 0 });
	}

	override onPointerDown() {
		const { currentPagePoint } = this.editor.inputs;
		this.editor.createShape<TLTextShape>({
			type: "text",
			x: currentPagePoint.x - OFFSET,
			y: currentPagePoint.y - OFFSET,
			props: { richText: toRichText("🏍️") },
		});
	}
}
