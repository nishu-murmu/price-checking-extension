import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

// Define the item interface for type safety
export interface ComboboxItem {
  id: string | number;
  name: string;
  [key: string]: any; // Allow for additional properties
}

interface ReusableComboboxProps {
  options: ComboboxItem[];
  value: ComboboxItem;
  onChange: (value: ComboboxItem) => void;
  placeholder?: string;
  className?: string;
  optionsClassName?: string;
  displayValue?: (item: ComboboxItem) => string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  optionsClassName = "",
  displayValue = (item) => item?.name,
}: ReusableComboboxProps) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className={className}>
      <Combobox value={value} onChange={onChange} onClose={() => setQuery("")}>
        <div className="relative">
          <ComboboxInput
            className={
              "w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            }
            placeholder={placeholder}
            displayValue={displayValue}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={`w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 ${optionsClassName}`}
        >
          {filteredOptions.length === 0 ? (
            <div className="py-1.5 px-3 text-sm text-white/70">
              No results found
            </div>
          ) : (
            filteredOptions.map((option) => (
              <ComboboxOption
                key={option.id}
                value={option}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-sm/6 text-white">{option.name}</div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
