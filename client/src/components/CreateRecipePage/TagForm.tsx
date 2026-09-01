import { useState, type ChangeEvent } from "react";
import { useGetTags } from "../../queries/useGetTags";
import { useDebouncer } from "../../utils/debounce";
import { TagList } from "./TagList";
import SuggestedTagList from "./SuggestedTagList";
import type { Tag } from "../../domain/types";
import { input } from "../../main.css";

const TIMEOUT = 300;

interface TagFormProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
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

  const handleAddTag = (tag: Tag) => {
    setTags([...tags, tag]);
    setTag("");
    setQuery("");
  }

  const suggestedTags = data ? data.filter(
    suggestedTag => !tags.some(
      tag => tag.id === suggestedTag.id
    )
  )
  : undefined;

  return (
    <div>
      <h2>Tags</h2>
      <input
        className={input}
        type="text"
        value={tag}
        onChange={handleTagChange}
        placeholder="Search tags..."
      />
      <SuggestedTagList suggestedTags={suggestedTags} addTag={handleAddTag} />
      <TagList tags={tags} setTags={setTags} />
    </div>
  );
};

export default TagForm;
