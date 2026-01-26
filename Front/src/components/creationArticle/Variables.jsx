export function Variables(props){
    // console.log(props);
    return(
        <div className="form-check">
            <input 
                className="form-check-input" 
                type="checkbox" 
                checked={props.checked} 
                onChange={(e)=>props.onCheck(e.target.checked)}
            />
            <label className="form-check-label">
                {props.nom} : variable {props.type}
                <input className="rectColor" type="color" onChange={(e)=>props.onColorChange(e.target.value)}/>
            </label>
        </div>
    )
};
