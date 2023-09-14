import {
    arrow,
    computePosition,
    autoUpdate,
    flip,
    offset,
    shift,
} from "@floating-ui/dom";

/**
 * @param {HTMLElement} referenceEl
 * @param {HTMLElement} floatingEl
 * @param {HTMLElement} arrowEl
 * @returns {() => void}
 */
export function tooltip(referenceEl, floatingEl, arrowEl) {
    /**
     * @returns {void}
     * */
    function update() {
        computePosition(referenceEl, floatingEl, {
            placement: "top",
            middleware: [
                offset(5),
                flip(),
                shift({ padding: 10 }),
                arrow({ element: arrowEl }),
            ],
        }).then(({ x, y, placement, middlewareData }) => {
            Object.assign(floatingEl.style, {
                left: `${x}px`,
                top: `${y}px`,
            });

            // Arrow
            if (!middlewareData.arrow) {
                return;
            }
            const arrowPlacement = placement.split("-")[0] ?? "top";
            const { x: arrowX, y: arrowY } = middlewareData.arrow;
            const staticSide =
                {
                    top: "bottom",
                    right: "left",
                    bottom: "top",
                    left: "right",
                }[arrowPlacement] ?? "bottom";

            Object.assign(arrowEl.style, {
                left: arrowX != null ? `${arrowX}px` : "",
                top: arrowY != null ? `${arrowY}px` : "",
                right: "",
                bottom: "",
                [staticSide]: "-4px",
            });
        });
    }
    const cleanup = autoUpdate(referenceEl, floatingEl, update);
    return cleanup;
}
