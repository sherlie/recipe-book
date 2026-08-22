import { useEffect, useState, type ChangeEvent } from "react";
import { useGetTags } from "../../queries/useGetTags";

const TIMEOUT = 300;

export const TagForm = () => {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");

 const { data } = useGetTags(query);

  const handleQueryChange = (tag: string) => {
    setQuery(tag);
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleQueryChange(tag);
    }, TIMEOUT);
    return () => clearTimeout(timer);
  }, [tag]);

  console.log(data);

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
