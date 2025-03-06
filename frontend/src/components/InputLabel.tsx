interface LabelInputs {
    placeholder: string;
    label: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputLabel = ({ label, placeholder, onChange, type }: LabelInputs) => {
    return (
        <div className="flex gap-2 flex-col">
            <label htmlFor={type} className="text-slate-600">
                {label}
            </label>
            <input
                onChange={onChange}
                className="border  border-slate-200 focus:border-gray-400 rounded py-1 px-3 text-slate-600 outline-0"
                type={type || "text"}
                id={type}
                placeholder={placeholder}
            />
        </div>
    );
};
