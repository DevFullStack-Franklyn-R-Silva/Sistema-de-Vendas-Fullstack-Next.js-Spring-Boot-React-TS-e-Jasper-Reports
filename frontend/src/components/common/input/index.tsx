interface InputProps {
    onChange?: (value: any) => void;
    label: string;
    columnClasses?: string;
}

export const Input: React.FC<InputProps> = ({
    onChange,
    label,
    columnClasses,
}: InputProps) => {
    return (
        <div className={`field column ${columnClasses}`}>
            <label className="label" htmlFor="inputSku">
                {label}
            </label>
            <div className="control">
                <input
                    className="input"
                    id="inputSku"
                    value={sku}
                    onChange={(event) => {
                        if (onChange) {
                            onChange(event.target.value);
                        }
                    }}
                    placeholder="Digite o SKU do produto"
                />
            </div>
        </div>
    );
};
