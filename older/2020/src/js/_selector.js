export default function $(selector) {
	let nodes = document.querySelectorAll(selector);
	return nodes.length === 1 ? nodes[0] : nodes.length ? nodes : null;
}