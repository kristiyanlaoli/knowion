import React, { useState } from "react";

function MathInput({ initialMath }: { initialMath: any }) {
  const [editing, setEditing] = useState(true);
  const [math, setMath] = useState(initialMath);

  const handleInputChange = (event: { target: { value: any } }) => {
    setMath(event.target.value);
  };

  const handleClick = () => {
    setEditing(!editing);
  };

  return (
    <div onClick={handleClick}>
      {editing ? (
        <input
          type="text"
          value={math}
          onChange={handleInputChange}
          onBlur={() => setEditing(false)}
        />
      ) : (
        <p>{math}</p>
      )}
    </div>
  );
}

export default MathInput;
