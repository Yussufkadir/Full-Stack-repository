const PersonForm = ({name, nameHandler, num, numHandler, addName}) => {
    return(
        <form onSubmit={addName}>
        <div>
          name: <input value={name} onChange={nameHandler}/>
        </div>
        <div>
          number <input value={num} onChange={numHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm