import React, { useState, useCallback, ChangeEvent } from "react";

const useInputs = (
    initialForm: object
    ): [object, (e: React.FormEvent<HTMLInputElement>) => void, () => void] => {

    const [form, setForm] = useState(initialForm);

    const onChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setForm(form => ({ ...form, [name]: value}));
    }, []);
    const reset = useCallback(() => setForm(initialForm),[initialForm]);
    return [form, onChange, reset];
}

export default useInputs;