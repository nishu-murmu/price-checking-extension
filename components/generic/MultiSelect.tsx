export const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  options: SelectItem[];
  value: SelectItem[];
  onChange: (selected: SelectItem[]) => void;
  placeholder?: string;
  disabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickInside = event
        .composedPath()
        .some((el) =>
          (el as HTMLElement).classList?.contains("multi-select-container")
        );

      if (!isClickInside) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleOptionClick = (option: SelectItem) => {
    const isSelected = value.some((item) => item.key === option.key);
    if (isSelected) {
      onChange(value.filter((item) => item.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  };

  const handleRemoveOption = (option: SelectItem) => {
    onChange(value.filter((item) => item.key !== option.key));
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="multi-select-container relative w-full rounded-md"
    >
      <div
        className={`
            w-full min-h-[42px] rounded-md px-2 py-1
            flex flex-wrap gap-1 items-center 
            ${disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"}
          `}
        style={{
          border: "black 1px solid",
        }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {value?.length === 0 ? (
          <span className="text-gray-500">{placeholder || "Select..."}</span>
        ) : (
          value.map((selectedOption) => (
            <div
              key={selectedOption.key}
              className="
                  bg-blue-100 text-blue-800 px-2 py-1 rounded 
                  flex items-center gap-1 text-sm cursor-pointer
                "
            >
              {selectedOption.label}
              {!disabled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveOption(selectedOption);
                  }}
                  type="button"
                  className="ml-1 text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  &times;
                </button>
              )}
            </div>
          ))
        )}
        {!disabled && (
          <input
            type="text"
            className="flex-grow outline-none ml-1 bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            placeholder={value.length === 0 ? placeholder : ""}
          />
        )}
      </div>

      {isOpen && !disabled && (
        <div
          className="
              absolute z-10 w-full max-h-60 overflow-auto rounded-md mt-1 bg-white shadow-lg
            "
          style={{
            border: "black 1px solid",
            boxShadow:
              "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)",
          }}
        >
          {filteredOptions.length === 0 ? (
            <div className="p-2 text-gray-500 text-sm">No options found</div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.key}
                className={`
                    p-2 cursor-pointer hover:bg-gray-100 
                    flex items-center gap-2
                    ${
                      value.some((item) => item.key === option.key)
                        ? "bg-blue-50 text-blue-800"
                        : ""
                    }
                  `}
                onClick={() => handleOptionClick(option)}
              >
                <input
                  type="checkbox"
                  checked={value.some((item) => item.key === option.key)}
                  readOnly
                  className="mr-2"
                />
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
