import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getAlltypes, filterCreated, orderName, filterType, filterStr } from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import styles from './Filters.module.css'

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
    <div className={styles.div}>
      <div>
      <SearchBar />
      </div>
      <div >
        <h4 className={styles.h4}>Filters</h4>
        <label className={styles.label}>Created - Api</label>
        <select className={styles.select} onChange={e => {handleFilterCreated(e)}}>
          <option value="all">ALL</option>
          <option value="api">API</option>
          <option value="created">CREATED</option>
        </select>


        <label className={styles.label}>Types</label>
        <select className={styles.select} onChange={e => {handleFilterType(e)}}>
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
        <h4 className={styles.h4}>Order</h4>
        <select className={styles.select}>
            <option>-</option>
            <option className={styles.order}>Strength</option>
            <option value="asc" onClick={e => {handleFilterStr(e)}}>ASC</option>
            <option value="desc"  onClick={e => {handleFilterStr(e)}}>DESC</option>
            <option className={styles.order}>Alphabetically</option>
            <option value="asc" onClick={e => {handleOrderName(e)}}>A - Z</option>
            <option value="desc" onClick={e => {handleOrderName(e)}}>Z - A</option>
        </select>
      </div>
    </div>
   );
}
 
export default Filters;