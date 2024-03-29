import assert from "assert";
import jsdom from "jsdom";
import { describe, it } from "mocha";
import { isRecipeSchema } from "../parsers/RecipeSchema.js";
import { SchemaOrgRDFaParser } from "../parsers/SchemaOrgRDFaParser.js";

const { JSDOM } = jsdom;

describe("SchemaOrgMicrodataParser", function () {
    let results: any;

    before(() => {
        const window = <Window>(<unknown>new JSDOM(`<html>
    <head>
        <title>RDFa Example</title>
    </head>
    <body>
        <div itemscope itemtype="https://schema.org/Recipe">
            <span itemprop="name">Mom's World Famous Banana Bread</span>
            By <span itemprop="author">John Smith</span>,
            <meta itemprop="datePublished" content="2009-05-08" />May 8, 2009
            <img
                itemprop="image"
                src="bananabread.jpg"
                alt="Banana bread on a plate"
            />

            <span itemprop="description"
                >This classic banana bread recipe comes from my mom -- the
                walnuts add a nice texture and flavor to the banana bread.</span
            >

            Prep Time: <meta itemprop="prepTime" content="PT15M" />15 minutes
            Cook time: <meta itemprop="cookTime" content="PT1H" />1 hour Yield:
            <span itemprop="recipeYield">1 loaf</span> Tags:
            <link
                itemprop="suitableForDiet"
                href="https://schema.org/LowFatDiet"
            />Low fat

            <div
                itemprop="nutrition"
                itemscope
                itemtype="https://schema.org/NutritionInformation"
            >
                Nutrition facts:
                <span itemprop="calories">240 calories</span>,
                <span itemprop="fatContent">9 grams fat</span>
            </div>

            Ingredients: -
            <span itemprop="recipeIngredient"
                >3 or 4 ripe bananas, smashed</span
            >
            - <span itemprop="recipeIngredient">1 egg</span> -
            <span itemprop="recipeIngredient">3/4 cup of sugar</span>
            ... Instructions:
            <span itemprop="recipeInstructions">
                Preheat the oven to 350 degrees. Mix in the ingredients in a
                bowl. Add the flour last. Pour the mixture into a loaf pan and
                bake for one hour.
            </span>

            140 comments:
            <div
                itemprop="interactionStatistic"
                itemscope
                itemtype="https://schema.org/InteractionCounter"
            >
                <meta
                    itemprop="interactionType"
                    content="https://schema.org/CommentAction"
                />
                <meta itemprop="userInteractionCount" content="140" />
            </div>
            From Janel, May 5 -- thank you, great recipe! ...
        </div>
    </body>
</html>`).window);

        const parser = new SchemaOrgRDFaParser(window, "example.com");
        results = parser.parse();
    });

    describe("#parse()", function () {
        it("should return an instance of Array", function () {
            assert.equal(results instanceof Array, true);
        });
        it("should return an Array of 1 element from test data", function () {
            assert.equal(results.length, results.length);
        });
        it("should contain only RecipeSchema", function () {
            assert.equal(results.filter(isRecipeSchema).length, results.length);
        });
    });
});
