import React from "react";

const TextArea = props => {
  const {
    name,
    value,
    onChangeHandle,
    className,
    errorMessage,
    placeHolder,
    rows,
    cols
  } = props;
  return (
    <div className="form-group">
      <textarea
        name={name}
        onChange={onChangeHandle}
        className={className}
        id="exampleFormControlTextarea2"
        placeholder={placeHolder}
        rows={rows ? rows : "3"} 
        cols={cols ? cols : "100"}
        >{value}</textarea>

      <div className="c-error">{errorMessage}</div>
    </div>
  );
};

export default TextArea;
