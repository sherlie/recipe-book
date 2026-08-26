import { tagButton, tagContainer, tagList, tagListItem } from "./TagList.css";

interface TagListProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const TagList = ({ tags, setTags }: TagListProps) => {

  function handleRemoveTag(tagToRemove: string) {
    setTags(tags.filter(currentTag => currentTag !== tagToRemove))
  }

  return (
    <div>
      <ul className={tagList}>
        {tags.map((tag, idx) =>
          <li key={idx} className={tagListItem}>
            <span className={tagContainer}>
              {tag}
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
