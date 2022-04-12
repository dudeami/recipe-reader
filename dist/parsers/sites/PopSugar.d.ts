import { ReplacementParser } from "../ReplacementParser.js";
export declare class PopSugar extends ReplacementParser {
    title(): string;
    total_time(): string;
    yields(): string;
    image(): string;
    ingredients(): string | string[];
    instructions(): string | string[];
}
