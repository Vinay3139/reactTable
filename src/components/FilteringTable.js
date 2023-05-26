 export const FilterTable=({filter,setFilter})=>{
    return (
        <>
        <span>
          Search: <input onChange={(e)=>setFilter(e.target.value)} value={filter}></input>
        </span>
        </>
    )
 }