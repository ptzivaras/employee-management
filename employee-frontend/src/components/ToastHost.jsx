import { useEffect, useState } from "react";

let externalPush;

/**
 * Global-ish toast host. Call pushToast({ type: 'danger'|'success'|'info', text: '...' })
 */
export function pushToast(payload) {
  if (externalPush) externalPush(payload);
}

export default function ToastHost() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    externalPush = (payload) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, ...payload }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    };
    return () => (externalPush = undefined);
  }, []);

  return (
    <div
      className="position-fixed"
      style={{ right: 16, bottom: 16, zIndex: 1055, width: 360, maxWidth: "calc(100vw - 32px)" }}
    >
      {toasts.map((t) => (
        <div key={t.id} className={`alert alert-${t.type ?? "info"} shadow-sm mb-2`}>
          {t.text}
        </div>
      ))}
    </div>
  );
}
