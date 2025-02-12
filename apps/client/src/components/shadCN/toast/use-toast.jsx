import * as React from "react";
import { ToastProvider, ToastViewport, Toast } from "./toast";

const ToasterContext = React.createContext();

function useToast() {
  const context = React.useContext(ToasterContext);
  if (!context) {
    throw new Error("useToast must be used within a ToasterProvider");
  }
  return context;
}

function ToasterProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (toast) => {
    setToasts((prevToasts) => [...prevToasts, { id: Date.now(), ...toast }]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToasterContext.Provider value={{ addToast, removeToast }}>
      <ToastProvider>
        {children}
        {toasts.map(({ id, title, description, variant }) => (
          <Toast key={id} variant={variant}>
            <div>{title}</div>
            {description && <div>{description}</div>}
            <button onClick={() => removeToast(id)}>Close</button>
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToasterContext.Provider>
  );
}

export { useToast, ToasterProvider };
