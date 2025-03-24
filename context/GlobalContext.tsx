import { createContext } from "react";

interface GlobalContextType {
  togglePreviewModal: boolean;
  setTogglePreviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  result: Record<string, any>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  submitLoading: boolean;
  setSubmitLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: any;
  setError: React.Dispatch<React.SetStateAction<any>>;
  isMinimized: boolean;
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType>({
  togglePreviewModal: false,
  setTogglePreviewModal: () => {},
  result: {},
  setResult: () => {},
  loading: false,
  setLoading: () => {},
  submitLoading: false,
  setSubmitLoading: () => {},
  error: null,
  setError: () => {},
  isMinimized: false,
  setIsMinimized: () => {},
});

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [togglePreviewModal, setTogglePreviewModal] = useState(false);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        togglePreviewModal,
        setTogglePreviewModal,
        result,
        setResult,
        loading,
        setLoading,
        submitLoading,
        setSubmitLoading,
        error,
        setError,
        isMinimized,
        setIsMinimized,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export const useGlobalContext = () => useContext(GlobalContext);
