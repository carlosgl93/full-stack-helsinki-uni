import { useState, forwardRef, useImperativeHandle } from "react";

export const Togglable = forwardRef(({ children, toggleLabel }, refs) => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      handleVisible,
    };
  });

  return visible ? (
    <div className="togglableContent">
      {children}
      <button
        onClick={handleVisible}
        id="cancelButton"
        className="cancelButton"
      >
        Cancel
      </button>
    </div>
  ) : (
    <div>
      <button onClick={handleVisible} id="toggleButton">
        {toggleLabel}
      </button>
    </div>
  );
});

Togglable.displayName = "Togglable";
