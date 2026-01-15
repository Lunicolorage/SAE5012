export function InputColorTheme({label, colorValue, setColorValue}) {
    return (
            <div className="selectColorTheme">
                <p> {label}</p>
                <input name="color" type="color" value={colorValue}
                    onChange={(e) => setColorValue(e.target.value)}
                />
            </div>
    );
}