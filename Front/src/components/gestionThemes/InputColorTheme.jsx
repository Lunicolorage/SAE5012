export function InputColorTheme({label, colorValue}) {
    return (
         <div>
                <div className="selectColorTheme">
                    <p> {label}</p>
                    <input name="color" type="color" value={colorValue} />
                </div>
            </div>
    );
}