const Filter = ({searchedT, handleSearchChange}) => {
return(
    <div>
        <form>
        <div>
          filter: <input value={searchedT} onChange={handleSearchChange}/>
        </div>
      </form>
    </div>
)
}
export default Filter