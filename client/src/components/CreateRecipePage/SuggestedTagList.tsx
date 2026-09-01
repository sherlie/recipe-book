import type { Tag } from "../../domain/types";
import { suggestedTagContainer, tagList, tagListItem } from "./TagList.css";

interface SuggestedTagListProps {
  suggestedTags: Tag[] | undefined;
  addTag: (tag: Tag) => void;
}

export const SuggestedTagList = ({ suggestedTags, addTag }: SuggestedTagListProps) => {
  if (!suggestedTags || !suggestedTags.length) {
    return null;
  }

  function handleAddTag(tagToAdd: Tag) {
    addTag(tagToAdd);
  }

  return (
    <div>
      <ul className={tagList}>
        {suggestedTags.map((tag) =>
          <li key={tag.id} className={tagListItem}>
            <span className={suggestedTagContainer} onClick={() => handleAddTag(tag)}>
              {tag.name}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SuggestedTagList;
