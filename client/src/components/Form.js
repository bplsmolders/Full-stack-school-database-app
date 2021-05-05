import React from 'react';

function Form (props) {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  //acitvates signup function passed down via props on submit
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  //acitvates cancel function passed down via props on cancel
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements}
        <div className="pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

// when validation Errors are stored. this function makes sure they are displayed on the UI.
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}

export default Form