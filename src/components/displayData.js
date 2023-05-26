import { useEffect, useMemo, useReducer, useState } from "react"
import { columns } from "./Column"
import { useTable,useGlobalFilter,useSortBy,usePagination } from "react-table";
import "./table.css"
import {AiFillCaretDown,AiFillCaretUp} from "react-icons/ai"
import { FilterTable } from "./FilteringTable";
import{FcNext,FcPrevious} from "react-icons/fc"
export const DisplayData=()=>{
  const [user, setUser] = useState([]);

  const fetchData = () => {
     fetch("MOCK_DATA.json")
          .then((response) => response.json())
          .then((data) => setUser(data));
  }
  
  useEffect(() => {
    fetchData();
  },[])

  const column = useMemo(() => columns, []);
  const data = useMemo(() => user, [user]);

  const tableInstance=useTable({columns:column ,data, initialState: {pageIndex: 0, pageSize: 10}},useGlobalFilter,useSortBy,usePagination)
  const {getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,pageCount
  }=tableInstance

    const {globalFilter}=state
    const {pageIndex}=state
  return(
    <>
    <div className="Container">
    <div className="filter">
    <FilterTable filter={globalFilter} setFilter={setGlobalFilter }/></div>
    
    <table {...getTableProps}>
      <thead>
        {headerGroups.map((headerGroup)=>(

          <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column)=>(
            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
            <span>{column.isSorted ? (column.isSortedDesc ? <AiFillCaretDown/>:<AiFillCaretUp style={{color:"red"}}/>):""}</span>
            </th>
          ))}
          </tr>
        ))}
        
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row)=>{
          prepareRow(row)
          return(
            <tr {...row.getRowProps()} >
              {row.cells.map((cell)=>{
                return<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
        
        </tr>
          )
        })}
        
      </tbody>
       
    </table>
    </div>
    <h4 style={{float:"right",margin:"0",marginTop:"9px"}}>
        page{" "}<strong>{pageIndex+1} of {pageOptions.length}</strong>
      </h4> 
    <div className="Button">
      
      <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage} style={{marginLeft:"10px"}}>{"<<"}</button> 
      <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous<FcPrevious style={{fontSize:"9px"}}/> </button>
      <button onClick={()=>nextPage()} disabled={!canNextPage}>Next<FcNext  style={{fontSize:"9px"}}/> </button>
      <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{">>"}</button>
      </div>
    </>
  )
}