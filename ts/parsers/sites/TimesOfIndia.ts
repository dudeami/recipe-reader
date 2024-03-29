import { ReplacementParser } from "../ReplacementParser.js";
import { normalizeElement, normalizeNodeList } from "../utils.js";

export class TimesOfIndia extends ReplacementParser {
    author() {
        const ele = this.querySelector(".authorview>div");
        return normalizeElement(ele);
    }
    ingredients() {
        const eles = this.querySelectorAll("label.clearfix");
        return normalizeNodeList(eles);
    }

    language() {
        const ele = this.querySelector(`meta[http-equiv="content-language"]`);
        return normalizeElement(ele);
    }
}
