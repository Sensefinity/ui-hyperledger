import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field } from "formik";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Input } from "../../../../_metronic/_partials/controls";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (meta, fieldname) => {
    let result = "form-control form-control-solid h-auto py-5 px-6 ";
    if (meta.touched && meta.error) {
      result += " is-invalid";
    }

    if (meta.touched && !meta.error) {
      result += " is-valid";
    }

    return result;
  };

  return (
    <div className="login-form login-signin">
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your username and password
        </p>
      </div>
      <Formik
        initialValues={{
          email: "admin@sensefinity.com",
          password: "abcd1234",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = intl.formatMessage({
              id: "AUTH.VALIDATION.REQUIRED_FIELD",
            });
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_FIELD",
            });
          }

          if (!values.password) {
            errors.password = intl.formatMessage({
              id: "AUTH.VALIDATION.REQUIRED_FIELD",
            });
          }

          return errors;
        }}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          enableLoading();
          setTimeout(() => {
            login(values.email, values.password)
              .then(({ access_token }) => {
                disableLoading();
                props.login(access_token);
              })
              .catch(() => {
                disableLoading();
                setSubmitting(false);
                setStatus(
                  intl.formatMessage({
                    id: "AUTH.VALIDATION.INVALID_LOGIN",
                  })
                );
              });
          }, 1000);
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
            <form
              className="form"
              noValidate={true}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <Field
                  name="email"
                  component={Input}
                  placeholder="Email"
                  label="Email"
                >
                  {({ field, form, meta }) => (
                    <div>
                      <input
                        type="email"
                        {...field}
                        className={`${getInputClasses(meta)}`}
                        placeholder="Enter Email"
                      />
                      {meta.touched && meta.error && (
                        <div className="error invalid-feedback">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <div className="form-group">
                <Field
                  name="password"
                  component={Input}
                  placeholder="Password"
                  label="Password"
                >
                  {({ field, form, meta }) => (
                    <div>
                      <input
                        type="password"
                        {...field}
                        className={`${getInputClasses(meta)}`}
                        placeholder="Enter Password"
                      />
                      {meta.touched && meta.error && (
                        <div className="error invalid-feedback">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <div className="form-group d-flex flex-wrap justify-content-between align-items-center" style={{ float: 'right' }}>

                <button
                  id="kt_login_signin_submit"
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
                >
                  <span>Sign In</span>
                  {loading && (
                    <span className="ml-3 spinner spinner-white"></span>
                  )}
                </button>
              </div>
            </form>
          )}
      </Formik>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
