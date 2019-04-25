import React from "react";

const TextArea = props => {
  const {
    name,
    value,
    onChangeHandle,
    className,
    errorMessage,
    placeHolder
  } = props;
  return (
    <div className="form-group">
      <textarea
        name={name}
        onChange={onChangeHandle}
        className={className}
        id="exampleFormControlTextarea2"
        placeholder={placeHolder}
        rows="3">{value}</textarea>

      <div className="c-error">{errorMessage}</div>
    </div>
  );
};

export default TextArea;
