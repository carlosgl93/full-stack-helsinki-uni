import React from "react";

const Form = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <form>
      <div>
        <p>
          name: <input value={newName} onChange={handleNameChange} />{" "}
        </p>
        <p>
          number: <input value={newNumber} onChange={handleNumberChange} />{" "}
        </p>
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
