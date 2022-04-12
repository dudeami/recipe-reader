import { normalizeElement, normalizeNodeList, ReplacementParser } from "../ReplacementParser.js";
export class SunBasket extends ReplacementParser {
    title() {
        const ele = this.querySelector("h1");
        return normalizeElement(ele);
    }
    total_time() {
        const ele = this.querySelector("span", "Minutes");
        return normalizeElement(ele);
    }
    yields() {
        const ele = this.querySelector("span", "Servings,");
        return normalizeElement(ele);
    }
    ingredients() {
        const eles = this.querySelectorAll(".ingredients-list li");
        return normalizeNodeList(eles);
    }
    instructions() {
        const list = [];
        const eles = this.querySelectorAll("div.instructions-container div.step");
        for (const ele of eles) {
            const number = ele.querySelector(".step-number");
            if (number) {
                const name = ele.querySelector(".step-header");
                const desc = ele.querySelector(".instruction-description");
                list.push(normalizeElement(number) +
                    ": " +
                    normalizeElement(name) +
                    " - " +
                    normalizeElement(desc));
            }
        }
        return list;
    }
    image() {
        const ele = this.querySelector("div.recipe-image-container img");
        return normalizeElement(ele, "src");
    }
}
//# sourceMappingURL=SunBasket.js.map