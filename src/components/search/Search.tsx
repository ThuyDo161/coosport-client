import { TextInput } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.scss";

type SearchType = {
  keywordProp?: string;
};

const Search = ({ keywordProp }: SearchType) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>(keywordProp ?? "");
  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/search/${keyword}`, { replace: true });
    }
  }, [keyword, navigate]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        goToSearch();
      }}
    >
      <TextInput
        placeholder="Search"
        icon={<i className="bx bx-search-alt"></i>}
        rightSectionWidth={100}
        value={keyword}
        onBlur={goToSearch}
        onChange={(e) => setKeyword(e.target.value)}
        inputMode="search"
        styles={{ rightSection: { pointerEvents: "none" } }}
      />
    </form>
  );
};

export default Search;
