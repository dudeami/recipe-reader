import { SchemaOrgParser } from "./SchemaOrgParser.js";
export class SchemaOrgMicrodataParser extends SchemaOrgParser {
    constructor(window, host = "undefined") {
        super(window, host);
    }
    extract() {
        return Array.from(this.getWindow().document.querySelectorAll(`[itemtype$="//schema.org/Recipe"]`)).map((ele) => {
            return this.getProperties(ele.children);
        });
    }
    getProperties(elements) {
        let results = {};
        Array.from(elements).forEach((element) => {
            if (element.hasAttribute("itemprop")) {
                let text = element.hasAttribute("content")
                    ? element.getAttribute("content")
                    : element.textContent;
                let name = element.getAttribute("itemprop");
                if (results[name]) {
                    if (!(results[name] instanceof Array)) {
                        results[name] = [results[name]];
                    }
                    results[name].push(text);
                }
                else {
                    results[name] = text;
                }
            }
            if (!element.hasAttribute("itemtype")) {
                const inject = this.getProperties(element.children);
                for (const key in inject) {
                    const r = results[key] || [];
                    const l = inject[key];
                    let a = [];
                    if (r instanceof Array) {
                        a = [...a, ...r];
                    }
                    else {
                        a.push(r);
                    }
                    if (l instanceof Array) {
                        a = [...a, ...l];
                    }
                    else {
                        a.push(l);
                    }
                    results[key] = a;
                }
            }
        });
        return results;
    }
}
//# sourceMappingURL=SchemaOrgMicrodataParser.js.map