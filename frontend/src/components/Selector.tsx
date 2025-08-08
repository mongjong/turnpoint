import React from 'react';

type Options = {
    label: string;
    value: string;
}

type Props = {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    options: Options[];
};

const Selector: React.FC<Props> = ({ label, placeholder, value, onChange, options }) => {
    return (
        <div>
            <label>{label}</label>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt.label} value={opt.value}>
                        {opt.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Selector;
