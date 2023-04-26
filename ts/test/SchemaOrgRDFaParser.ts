import assert from "assert";
import jsdom from "jsdom";
import { describe, it } from "mocha";
import { isRecipeSchema } from "../parsers/RecipeSchema.js";
import { SchemaOrgRDFaParser } from "../parsers/SchemaOrgRDFaParser.js";

const { JSDOM } = jsdom;

function runTest(window: Window) {
    const parser = new SchemaOrgRDFaParser(window, "example.com");
    const results = parser.parse();

    describe("SchemaOrgRDFaParser", function () {
        describe("#parse()", function () {
            it("should return an instance of Array", function () {
                assert.equal(results instanceof Array, true);
            });
            it("should return an Array of 1 element from test data", function () {
                assert.equal(results.length, results.length);
            });
            it("should contain only RecipeSchema", function () {
                assert.equal(
                    results.filter(isRecipeSchema).length,
                    results.length
                );
            });
        });
    });
}

runTest(
    <Window>(<unknown>new JSDOM(`
<html>
    <head>
        <title>RDFa Example</title>
    </head>
    <body>
        <div vocab="https://schema.org/" typeof="Recipe">
            <span property="name">Mom's World Famous Banana Bread</span>
            By <span property="author">John Smith</span>,
            <meta property="datePublished" content="2009-05-08">May 8, 2009
            <img property="image" src="bananabread.jpg"
            alt="Banana bread on a plate" />

            <span property="description">This classic banana bread recipe comes
            from my mom -- the walnuts add a nice texture and flavor to the banana
            bread.</span>

            Prep Time: <meta property="prepTime" content="PT15M">15 minutes
            Cook time: <meta property="cookTime" content="PT1H">1 hour
            Yield: <span property="recipeYield">1 loaf</span>
            Tags: <link property="suitableForDiet" href="https://schema.org/LowFatDiet" />Low Fat

            <div property="nutrition" typeof="NutritionInformation">
                Nutrition facts:
                <span property="calories">240 calories</span>,
                <span property="fatContent">9 grams fat</span>
            </div>

            Ingredients:
            - <span property="recipeIngredient">3 or 4 ripe bananas, smashed</span>
            - <span property="recipeIngredient">1 egg</span>
            - <span property="recipeIngredient">3/4 cup of sugar</span>
            ...

            Instructions:
            <span property="recipeInstructions">
                Preheat the oven to 350 degrees. Mix in the ingredients in a bowl. Add
                the flour last. Pour the mixture into a loaf pan and bake for one hour.
            </span>

            140 comments:
            <div property="interactionStatistic" typeof="InteractionCounter">
                <meta property="interactionType" content="https://schema.org/CommentAction" />
                <meta property="userInteractionCount" content="140" />
            </div>
            From Janel, May 5 -- thank you, great recipe!
            ...
        </div>
    </body>
</html>`).window)
);
