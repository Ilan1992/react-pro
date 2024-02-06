import { useEffect, useState, memo } from "react";
import DataContext from "./DataContext";
import axios from "axios";

const DataProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const handleDataFromServer = async () => {
      try {
        let { data } = await axios.get("/cards");
        setSearchData(data);
      } catch (error) {
      }
    };
    handleDataFromServer();
  }, []);

  useEffect(() => {
    setFilterData([...searchData]);
  }, [searchData]);

  return (
    <DataContext.Provider value={{ filterData, setFilterData, searchData }}>
      {children}
    </DataContext.Provider>
  );
};

export default memo(DataProvider);
