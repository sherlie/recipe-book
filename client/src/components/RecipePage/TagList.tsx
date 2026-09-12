import { useNavigate } from "react-router";
import type { Tag } from "../../domain/types";
import { tagContainer, tagList, tagListItem } from "./TagList.css";
import { AppRoute, routeBuilder } from "../../routeUtils";

interface TagListProps {
  tags?: Tag[];
}

export const TagList = ({ tags }: TagListProps) => {

  const navigate = useNavigate();

  if (!tags || !tags.length) {
    return null;
  }

  function handleClick(id: string) {
    navigate(routeBuilder(AppRoute.RecipesByTag, id));
  }

  return (
    <div>
      <ul className={tagList}>
        {tags.map((tag, idx) =>
          <li key={idx} className={tagListItem}>
            <span className={tagContainer} onClick={() => handleClick(tag.id)}>
              #{tag.name}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TagList;
