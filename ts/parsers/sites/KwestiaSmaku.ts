import { ReplacementParser } from "../ReplacementParser.js";
import { normalizeElement, normalizeNodeList } from "../utils.js";

export class KwestiaSmaku extends ReplacementParser {
    yields() {
        const ele = this.querySelector("div.field-name-field-ilosc-porcji");
        return normalizeElement(ele);
    }

    image() {
        const ele = this.querySelector("div.view-zdjecia li.first>img");
        return normalizeElement(ele, "src");
    }

    ingredients() {
        const ele = this.querySelectorAll("div.field-name-field-skladniki li");
        return normalizeNodeList(ele);
    }

    instructions() {
        const eles = this.querySelectorAll(
            "div.field-name-field-przygotowanie li"
        );
        return normalizeNodeList(eles);
    }
}
