import { RecipeSchema } from "./RecipeSchema.js";

export class ReplacementParser {
    protected data: any;
    private window?: Window;
    protected host: string;

    constructor(host: string) {
        this.host = host.toLowerCase();
    }

    parse(window: Window, orig: RecipeSchema) {
        this.window = window;
        this.data = Object.assign({}, orig);
    }

    getOrig() {
        return this.data;
    }

    before_parse() {}

    get() {
        this.before_parse();
        return <RecipeSchema>{
            host: this.host,
            author: this.author(),
            title: this.title(),
            category: this.category(),
            total_time: this.total_time(),
            yields: this.yields(),
            image: this.image(),
            ingredients: this.ingredients(),
            instructions: this.instructions(),
            ratings: this.ratings(),
            cuisine: this.cuisine(),
            description: this.description(),
        };
    }

    getWindow() {
        return this.window;
    }

    querySelector(query: string, text?: string) {
        if (this.window) {
            if (text) {
                const results = Array.from(
                    this.window.document.querySelectorAll(query)
                );
                const result = results.filter(
                    (result) =>
                        result.textContent &&
                        result.textContent.indexOf(text) !== -1
                )[0];
                return result || null;
            } else {
                return this.window.document.querySelector(query);
            }
        }
        return null;
    }

    querySelectorAll(query: string, text?: string): Element[] {
        if (this.window) {
            const results = Array.from(
                this.window?.document.querySelectorAll(query)
            );
            if (text) {
                return results.filter(
                    (ele) =>
                        ele.textContent && ele.textContent.indexOf(text) !== -1
                );
            } else {
                return results;
            }
        }
        return [];
    }

    hasHost(host: string) {
        return host.toLowerCase().indexOf(this.host) !== -1;
    }

    raw(): any {
        return this.data._raw;
    }

    author(): string {
        return this.data.author;
    }

    title(): string {
        return this.data.title;
    }

    category(): string {
        return this.data.category;
    }

    prep_time(): string {
        return this.data.prepTime;
    }

    cook_time(): string {
        return this.data.cookTime;
    }

    calc_total_time(): string {
        // TODO Parse time from string and reconstruct properly, lib for this?
        this.data.total_time = this.prep_time() + " + " + this.cook_time();
        return this.data.total_time;
    }

    total_time(): string {
        return this.data.total_time;
    }

    yields(): string {
        return this.data.yields;
    }

    image(): string {
        return this.data.image;
    }

    ingredients(): string | string[] {
        return this.data.ingredients;
    }

    instructions(): string | string[] {
        return this.data.instructions;
    }

    ratings(): string {
        return this.data.ratings;
    }

    cuisine(): string {
        return this.data.cuisine;
    }

    description(): string {
        return this.data.description;
    }
}
