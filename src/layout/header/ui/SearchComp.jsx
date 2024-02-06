import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchTheme";
import { useState, useContext } from "react";
import DataContext from "../../../store/DataContext";

const SearchComp = () => {
  const [text, setText] = useState("");
  const { searchData, filterData, setFilterData } = useContext(DataContext);
  
  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setText(searchText);

    if (searchText.trim() === "") {
      setFilterData([...searchData]);
    } else {
      setFilterData((prev) =>
        prev.filter((item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={text}
        onChange={handleInputChange}
      />
      {filterData?.map((result, index) => (
        <div key={result + index}>{result.name}</div>
      ))}
    </Search>
  );
};

export default SearchComp;
