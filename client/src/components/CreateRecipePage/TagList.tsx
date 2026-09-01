import type { Tag } from "../../domain/types";
import { tagButton, tagContainer, tagList, tagListItem } from "./TagList.css";

interface TagListProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

export const TagList = ({ tags, setTags }: TagListProps) => {

  function handleRemoveTag(tagToRemove: Tag) {
    setTags(tags.filter(currentTag => currentTag.id !== tagToRemove.id))
  }

  return (
    <div>
      <ul className={tagList}>
        {tags.map((tag, idx) =>
          <li key={idx} className={tagListItem}>
            <span className={tagContainer}>
              {tag.name}
              <button
                className={tagButton}
                onClick={() => handleRemoveTag(tag)}
              >
                ×
              </button>
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TagList;
