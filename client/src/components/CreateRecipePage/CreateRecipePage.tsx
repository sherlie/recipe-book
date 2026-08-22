import { useState, type SubmitEvent } from "react";
import type {
  CreateComponent,
  CreateFullRecipe,
} from "../../domain/createTypes";
import {
  addComponent,
  addIngredient,
  createComponent,
  removeComponent,
  removeIngredient,
  updateComponent,
  updateIngredient,
} from "./CreteRecipePage.utils";
import { useAddRecipe } from "../../queries/useAddRecipe";
import { input, pageWrapper, submitButton } from "../../main.css";
import { componentHeader, numberInput, textArea, wrapper } from "./CreateRecipePage.css";
import TagForm from "./TagForm";

export const CreateRecipePage = () => {
  const [name, setName] = useState("");
  const [method, setMethod] = useState("");
  const [components, setComponents] = useState<CreateComponent[]>([
    createComponent(),
  ]);

  const addRecipeMutation = useAddRecipe();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const recipe = {
      name: name.trim(),
      method: method.trim(),
      components: components.map((component) => ({
        name: component.name.trim(),
        ingredients: component.ingredients.map((ingredient) => ({
          amount: ingredient.amount,
          unit: ingredient.unit?.trim() || undefined,
          name: ingredient.name.trim(),
        })),
      })),
    } satisfies CreateFullRecipe;

    addRecipeMutation.mutate(recipe);
  }

  return (
    <form onSubmit={handleSubmit} className={pageWrapper}>
      <h1>Creating New Recipe</h1>
      <div>
        <label htmlFor="recipe-name">Recipe name </label>
        <input
          className={input}
          id="recipe-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="recipe-method">Method</label>
        <br />
        <textarea
          className={textArea}
          id="recipe-method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          placeholder="Describe how to prepare the recipe..."
          required
        />
      </div>

      <TagForm />

      <section>
        <h2>Components</h2>

        {components.map((component, componentIndex) => (
          <div key={componentIndex} className={wrapper}>
            <div>
              <h4 className={componentHeader}>Component {componentIndex + 1}: </h4>
              <input
                className={input}
                type="text"
                value={component.name}
                onChange={(e) =>
                  setComponents(
                    updateComponent(components, componentIndex, {
                      name: e.target.value,
                    }),
                  )
                }
                placeholder="Component name (e.g. Sauce)"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setComponents(removeComponent(components, componentIndex))
                }
                disabled={components.length === 1}
              >
                X
              </button>
            </div>

            <h3>Ingredients</h3>

            {component.ingredients.map((ingredient, ingredientIndex) => (
              <div key={ingredientIndex}>
                <input
                  className={numberInput}
                  type="number"
                  min="0"
                  value={ingredient.amount}
                  onChange={(e) =>
                    setComponents(
                      updateIngredient(
                        components,
                        componentIndex,
                        ingredientIndex,
                        { amount: Number(e.target.value) },
                      ),
                    )
                  }
                  placeholder="amount"
                  required
                />

                <input
                  className={numberInput}
                  type="text"
                  value={ingredient.unit}
                  onChange={(e) =>
                    setComponents(
                      updateIngredient(
                        components,
                        componentIndex,
                        ingredientIndex,
                        { unit: e.target.value },
                      ),
                    )
                  }
                  placeholder="unit"
                />

                <input
                  className={input}
                  type="text"
                  value={ingredient.name}
                  onChange={(e) =>
                    setComponents(
                      updateIngredient(
                        components,
                        componentIndex,
                        ingredientIndex,
                        { name: e.target.value },
                      ),
                    )
                  }
                  placeholder="ingredient"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setComponents(
                      removeIngredient(
                        components,
                        componentIndex,
                        ingredientIndex,
                      ),
                    )
                  }
                  disabled={component.ingredients.length === 1}
                >
                  X
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setComponents(addIngredient(components, componentIndex))
              }
            >
              + Add ingredient
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setComponents(addComponent(components))}
        >
          + Add component
        </button>
      </section>

      <button type="submit" className={submitButton}>Create recipe</button>
    </form>
  );
}
