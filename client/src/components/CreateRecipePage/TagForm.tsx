import { useState, type ChangeEvent } from "react";
import { useGetTags } from "../../queries/useGetTags";
import { useDebouncer } from "../../utils/debounce";

const TIMEOUT = 300;

export const TagForm = () => {
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
    </div>
  );
};

export default TagForm;
