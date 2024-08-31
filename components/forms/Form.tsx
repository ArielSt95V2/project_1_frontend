import { ChangeEvent, FormEvent } from "react";
import { Input } from '@/components/forms';
import { Spinner } from "../common";

// WHAT VALUES DO I WHANT TO BE ABLE TO INSERT DATA TO ?
interface Config {
    labelText: string;
    labelId: string;
    type: string;
    value: string
    link?: {
        linkText: string;
        linkUrl: string;
    },
    required?: boolean;
}

interface Prop {
    btnText: string;
    isLoading: boolean;
    config: Config[];
    onSubmit: (enevt: FormEvent<HTMLFormElement>) => void;
    onChange: (enevt: ChangeEvent<HTMLInputElement>) => void;
}

export default function Form({ btnText, isLoading, config, onSubmit, onChange }: Prop) {
    return(
        <form className="space-y-6" onSubmit={onSubmit}>
            {config.map(input => (
                <Input
                    key={input.labelId}
                    labelId={input.labelId}
                    type={input.type}
                    onChange={onChange}
                    value={input.value}
                    link={input.link}
                    required={input.required}
                >
                    {input.labelText}
                </Input>
            ))}

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 font-semibold leading-6 text-white"
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner sm /> : `${btnText}`}

                </button>
            </div>
            
        </form>
    )
}