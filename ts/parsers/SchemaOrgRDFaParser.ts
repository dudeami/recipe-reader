import { SchemaOrgParser } from "./SchemaOrgParser.js";

export class SchemaOrgRDFaParser extends SchemaOrgParser {
    constructor(window: Window, host: string = "undefined") {
        super(window, host);
    }

    extract() {
        return Array.from(
            this.getWindow().document.querySelectorAll(
                `[vocab$="//schema.org/"][typeof="Recipe"]`
            )
        ).map((ele) => {
            return this.getProperties(ele.children);
        });
    }

    private getProperties(elements: HTMLCollection) {
        let results: any = {};
        Array.from(elements).forEach((element) => {
            if (element.hasAttribute("typeof")) {
                return;
            }
            if (element.hasAttribute("property")) {
                let text = element.hasAttribute("content")
                    ? element.getAttribute("content")
                    : element.textContent;
                let name = <string>element.getAttribute("property");
                if (results[name]) {
                    if (!(results[name] instanceof Array)) {
                        results[name] = [results[name]];
                    }
                    results[name].push(text);
                } else {
                    results[name] = text;
                }
            }
            results = Object.assign(
                results,
                this.getProperties(element.children)
            );
        });
        return results;
    }
}
