import assert from "assert";
import { describe, it } from "mocha";
import { RecipeSchema } from "../parsers/RecipeSchema.js";
import { get } from "./utils.js";

describe("LAtelierDeRoxane", function () {
    describe("https://www.latelierderoxane.com/blog/recette-cake-marbre/", function () {
        let recipe: RecipeSchema;

        before(async function () {
            this.timeout(10000);
            recipe = await get(
                "https://www.latelierderoxane.com/blog/recette-cake-marbre/"
            );
        });

        it(`should be titled "Recette cake savane maison`, function () {
            assert.equal(recipe.title, "Recette cake savane maison");
        });

        it(`should have the correct ingredients`, function () {
            assert.deepEqual(recipe.ingredients, [
                "3 œufs",
                "70 g de sucre",
                "70 g de beurre fondu",
                "1 sachet de levure chimique",
                "250 g de farine",
                "150 g de lait",
                "150 g de chocolat noir fondu",
                "1 càc d'arôme ou poudre de vanille",
            ]);
        });
    });
});
