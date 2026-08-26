import { useState, type ChangeEvent } from "react";
import { useGetTags } from "../../queries/useGetTags";
import { useDebouncer } from "../../utils/debounce";
import { TagList } from "./TagList";

const TIMEOUT = 300;

interface TagFormProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const TagForm = ({ tags, setTags}: TagFormProps) => {
  const [tag, setTag] = useState("");
  const [query, setQuery] = useState("");

  const { data } = useGetTags(query, query.length > 1);

  const debouncedHandleQueryChange = useDebouncer(setQuery, TIMEOUT);

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTag = e.target.value;
    setTag(newTag);
    debouncedHandleQueryChange(newTag);
  };

  console.log(query, data);

  return (
    <div>
      <input
        type="text"
        value={tag}
        onChange={handleTagChange}
        placeholder="Search..."
      />
      <TagList tags={tags} setTags={setTags} />
    </div>
  );
};

export default TagForm;
