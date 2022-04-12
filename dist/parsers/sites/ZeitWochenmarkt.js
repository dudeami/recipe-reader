import { normalizeNodeList, ReplacementParser } from "../ReplacementParser.js";
export class ZeitWochenmarkt extends ReplacementParser {
    ingredients() {
        const eles = this.querySelectorAll("p.recipe-list-collection__special-ingredient");
        return normalizeNodeList(eles);
    }
    instructions() {
        const eles = this.querySelectorAll(".article__subheading.article__subheading--recipe.article__item");
        return normalizeNodeList(eles);
    }
}
//# sourceMappingURL=ZeitWochenmarkt.js.map