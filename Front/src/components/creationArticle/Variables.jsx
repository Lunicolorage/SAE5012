
function Variables(props){
    return(
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="checkDefault"/>
            <label className="form-check-label" htmlFor="checkDefault">
                {props.nom}
                {/* <div className="rectColor"></div> */}
                <input className="rectColor" type="color"/>
            </label>
        </div>
    )
}

export {Variables}