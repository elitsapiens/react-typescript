import { useState, useCallback, ChangeEvent } from "react";

const useInputs = (initialForm: object) => {

    const [form, setForm] = useState(initialForm);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(form => ({ ...form, [name]: value}));
    }, []);
    const reset = useCallback(() => setForm(initialForm),[initialForm]);
    return [form, onChange, reset];
}

export default useInputs;