import { ReplacementParser } from "../ReplacementParser.js";

export class AllRecipes extends ReplacementParser {
    author() {
        const author = <any>super.author();
        if (author instanceof Array) {
            return author[0].name;
        }
        return author;
    }
}
