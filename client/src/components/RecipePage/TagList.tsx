import type { Tag } from "../../domain/types";
import { tagContainer, tagList, tagListItem } from "./TagList.css";

interface TagListProps {
  tags?: Tag[];
}

export const TagList = ({ tags }: TagListProps) => {
  if (!tags || !tags.length) {
    return null;
  }

  return (
    <div>
      <ul className={tagList}>
        {tags.map((tag, idx) =>
          <li key={idx} className={tagListItem}>
            <span className={tagContainer}>
              #{tag.name}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TagList;
