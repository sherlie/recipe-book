import { useEffect, useState, type SubmitEvent } from "react";
import type {
  CreateComponent,
  CreateFullRecipe,
} from "../../domain/createTypes";
import {
  addComponent,
  addIngredient,
  createComponent,
  getComponentsDiff,
  getTagsDiff,
  removeComponent,
  removeIngredient,
  updateComponent,
  updateIngredient,
} from "./CreteRecipePage.utils";
import { useAddRecipe } from "../../queries/useAddRecipe";
import { input, pageWrapper, submitButton } from "../../main.css";
import { componentHeader, numberInput, textArea, wrapper } from "./CreateRecipePage.css";
import TagForm from "./TagForm";
import type { Tag } from "../../domain/types";
import { useParams } from "react-router";
import { useGetRecipe } from "../../queries/useGetRecipe";
import type { UpdateRecipe } from "../../domain/updateTypes";
import { useUpdateRecipe } from "../../queries/useUpdateRecipe";

export const CreateRecipePage = () => {
  const { id: recipeId = "" } = useParams();

  const { data, isLoading, error } = useGetRecipe(recipeId, !!recipeId);

  const [name, setName] = useState("");
  const [method, setMethod] = useState("");
  const [components, setComponents] = useState<CreateComponent[]>([
    createComponent(),
  ]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setMethod(data.method);
      setComponents(data.components);
      setTags(data.tags ?? []);
    }
  }, [data])

  const addRecipeMutation = useAddRecipe();
  const updateRecipeMutation = useUpdateRecipe();

  function handleCreateRecipe() {
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
      tags: tags,
    } satisfies CreateFullRecipe;

    addRecipeMutation.mutate(recipe);
  }

  function handleUpdateRecipe() {

    const tagsDiff = getTagsDiff(data?.tags, tags);
    const componentsDiff = getComponentsDiff(recipeId, data?.components, components);

    const updatedRecipe = {
      id: recipeId,
      ...(name !== data?.name && { name: name }),
      ...(method !== data?.method && { method: method }),
      ...(tagsDiff.length > 0 && { tags: tagsDiff }),
      ...(componentsDiff.length > 0 && { components: componentsDiff }),
    } satisfies UpdateRecipe;

    console.log(updatedRecipe);
    updateRecipeMutation.mutate(updatedRecipe);
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (recipeId) {
      handleUpdateRecipe();
    } else {
      handleCreateRecipe();
    }
  }

  if (recipeId && isLoading) {
    return <div>Loading...</div>;
  }

  if (recipeId && error) {
    return <div>{error.message}</div>
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

      <TagForm tags={tags} setTags={setTags} />

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
                  step="0.01"
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
                  value={ingredient.unit ?? ""}
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

      <button type="submit" className={submitButton}>
        {recipeId ? "Save": "Create recipe"}
      </button>
    </form>
  );
}
