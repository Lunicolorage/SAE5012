
function Variables(props){
    return(
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="checkDefault" onChange={(e)=>props.onCheck(e.target.checked)}/>
            <label className="form-check-label" htmlFor="checkDefault">
                {props.nom}
                <input className="rectColor" type="color" onChange={(e)=>props.onColorChange(e.target.value)}/>
            </label>
        </div>
    )
}

export {Variables}