import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getAlltypes, filterCreated, orderName, filterType, filterStr } from "../../actions";
import SearchBar from "../SearchBar/SearchBar";

const Filters =  ({setCurrentPage, setOrder}) => {
  
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types);
  
  useEffect(() => {
    dispatch(getAlltypes())
  }, [dispatch]);

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  };

  const handleOrderName = (e) => {
    e.preventDefault();
    dispatch(orderName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  };

  const handleFilterType = (e) => {
    e.preventDefault();
    dispatch(filterType(e.target.value)); 
    setCurrentPage(1);
  };

  const handleFilterStr = (e) => {
    e.preventDefault();
    dispatch(filterStr(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  };


  return ( 
    <div>
      <div>
        <SearchBar />
      </div>

      <div>
        <h4>Filters</h4>
        <label>Created - Api</label>
        <select onChange={e => {handleFilterCreated(e)}}>
          <option value="all">ALL</option>
          <option value="api">API</option>
          <option value="created">CREATED</option>
        </select>


        <label>Types</label>
        <select onChange={e => {handleFilterType(e)}}>
            <option value='all'>ALL</option>
            {
              allTypes?.map(e => {
                return (
                  <option key={e.id} value={e.name}>{e.name.toUpperCase()}</option>
                )
              })
            }
        </select>
      </div>

      <div>
        <h4>Order</h4>
        <label>Strength</label>
        <select onChange={e => {handleFilterStr(e)}}>
          <option>-</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>

        <label>Alphabetically</label>
        <select onChange={e => {handleOrderName(e)}}>
          <option>-</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>
    </div>
   );
}
 
export default Filters;