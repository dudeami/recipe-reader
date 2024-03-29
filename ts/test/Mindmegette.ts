import assert from "assert";
import { describe, it } from "mocha";
import { RecipeSchema } from "../parsers/RecipeSchema.js";
import { get } from "./utils.js";

describe("Mindmegette", function () {
    describe("https://www.mindmegette.hu/stefania-vagdalt-a-husveti-hidegtalra.recept/", function () {
        let recipe: RecipeSchema;

        before(async function () {
            this.timeout(10000);
            recipe = await get(
                "https://www.mindmegette.hu/stefania-vagdalt-a-husveti-hidegtalra.recept/"
            );
        });

        it(`should be authored by "Somogyi Bea"`, function () {
            assert.equal(recipe.author, "Somogyi Bea");
        });

        it(`should be titled "Stefánia vagdalt recept | Mindmegette.hu"`, function () {
            assert.equal(
                recipe.title,
                "Stefánia vagdalt recept | Mindmegette.hu"
            );
        });

        it(`should have the correct ingredients`, function () {
            assert.deepEqual(recipe.ingredients, [
                "4 db tojás",
                "1 fej vöröshagyma",
                "2 gerezd fokhagyma",
                "olaj vagy zsír",
                "0.5 kg darált sertés hús",
                "2 db szikkadt zsemle",
                "só",
                "bors",
                "fűszerpaprika",
                "zsemlemorzsa",
            ]);
        });
    });
});
