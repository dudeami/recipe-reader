import fetch from "cross-fetch";
import * as jsdom from "jsdom";
import { RecipeReader } from "../RecipeReader.js";

const { JSDOM } = jsdom;

export async function get(href: string) {
    let hostname = href.toLowerCase().substring(href.indexOf("//") + 2);
    hostname = hostname.substring(0, hostname.indexOf("/"));
    const req = await fetch(href);
    const body = await req.text();
    if (body.indexOf("Incapsula incident ID") !== -1) {
        throw new Error("Incapsula protected site, cannot test.");
    }
    if (req.status !== 200) {
        throw new Error("Failed to resolve (" + req.statusText + "): " + href);
    }
    const virtualConsole = new jsdom.VirtualConsole();
    const dom = <Window>(<unknown>new JSDOM(body, { virtualConsole }).window);
    const reader = new RecipeReader(dom, hostname);
    return reader.get()[0];
}
