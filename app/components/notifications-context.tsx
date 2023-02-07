import { createContext, useContext, useState } from "react";

const NotificationsContext = createContext({
  showNotification: (title: string, txId: `0x${string}`) => {},
  showError: (title: string, error?: string) => {},
  notification: {
    title: "",
    txId: "",
    error: "",
    type: "success",
  },
  show: false,
  setShow: (show: boolean) => {},
});

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }: React.PropsWithChildren) => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: "", txId: "0x", error: "", type: "success"});

  const showNotification = (title: string, txId: `0x${string}`) => {
    setNotification({
      title,
      txId,
      error: "",
      type: "success",
    });
    setShow(true);
  };

  const showError = (title: string, error = "") => {
    setNotification({
      title,
      txId: "0x",
      error,
      type: "error",
    });
    setShow(true);
  };

  // @ts-ignore
  return (
    <NotificationsContext.Provider value={{ showNotification, showError, notification, show, setShow }}>
      {children}
    </NotificationsContext.Provider>
  );
};
