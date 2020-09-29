import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, registerUser } from "../../actions/SecurityAction";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import classnames from "classnames";

// core components
import { useEffect } from "react";

export default function LoginPage() {
  let history = useHistory();
  const { register, handleSubmit } = useForm();
  const errors_ = useSelector((state) => state.errors);
  const security = useSelector((state) => state.security);
  const dispatch = useDispatch();

  function login_() {
    document.getElementById("login").style.left = "50px";
    document.getElementById("register_").style.left = "450px";
    document.getElementById("btn").style.left = "0px";
  }
  function register_() {
    document.getElementById("login").style.left = "-400px";
    document.getElementById("register_").style.left = "50px";
    document.getElementById("btn").style.left = "110px";
  }
  const onSubmit = (data) => {
    dispatch(login(data));
  };

  const onRegister = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (security.validToken) {
      security.user.authorities === "[CARDADMIN]"
        ? history.push("/admin/dashboard")
        : history.push("/admin/users");
    }
  });

  const errorLogin = () => {
    if (errors_.error) {
      return (
        <div className="btn btn-danger container mb-1">
          Неверное имя пользователя или пароль
        </div>
      );
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundColor: "white", paddingBottom: "200px" }}
    >
      <div
        className="row"
        style={{
          margin: "auto",
          display: "block",
        }}
      >
        <img
          style={{
            marginLeft: "26%",
          }}
          width="150px"
          height="150px"
          src={
            "https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/17/1f/e3/171fe337-4235-af8f-5883-2773e8d0323a/AppIcon-0-1x_U007emarketing-0-0-85-220-0-10.png/320x0w.png"
          }
        ></img>
        <div className="text-center" style={{ marginTop: "-94px" }}>
          <h2 className="title h1 ml-3" style={{ color: "grey" }}>
            Войдите в свой аккаунт
          </h2>
        </div>
      </div>
      <hr></hr>
      <div className="content">
        <div className="form-box">
          {errorLogin()}
          <div className="button-box">
            <div id="btn"></div>
            <input
              style={{ marginLeft: "3px" }}
              type="button"
              value="Войти"
              className="toggle-btn_"
              onClick={login_}
            />

            <input
              value="Регистрация"
              type="button"
              className="toggle-btn_ float-right"
              onClick={register_}
            />
          </div>
          <form
            id="login"
            onSubmit={handleSubmit(onSubmit)}
            className="input-group_1"
          >
            <input
              type="text"
              className="input-field"
              placeholder="
              Введите имя пользователя"
              name="username_"
              ref={register}
              required
            />
            <input
              autoComplete="true"
              type="password"
              className="input-field"
              placeholder="
              Введите пароль пользователя"
              name="password_"
              ref={register}
              required
            />
            <input type="checkbox" className="check-box" />
            <span className="span_1">Запомни меня</span>
            <input type="submit" className="submit-btn" value="Войти" />
          </form>
          <form
            id="register_"
            onSubmit={handleSubmit(onRegister)}
            className="input-group_1"
          >
            <input
              type="text"
              className={classnames("input-field", {
                "is-invalid": errors_.username,
              })}
              ref={register}
              placeholder="Введите имя пользователя"
              name="username"
              required
            />{" "}
            {errors_.username && (
              <div className="invalid-feedback">{errors_.username}</div>
            )}
            <input
              autoComplete="true"
              type="password"
              className={classnames("input-field", {
                "is-invalid": errors_.password,
              })}
              name="password"
              placeholder="Введите пароль пользователя"
              ref={register}
              required
            />
            {errors_.password && (
              <div className="invalid-feedback">{errors_.password}</div>
            )}
            <input
              autoComplete="true"
              type="password"
              className={classnames("input-field", {
                "is-invalid": errors_.confirmPassword,
              })}
              name="confirmPassword"
              placeholder="
              Подтвердите ваш пароль"
              ref={register}
              required
            />
            {errors_.confirmPassword && (
              <div className="invalid-feedback">{errors_.confirmPassword}</div>
            )}
            <input type="checkbox" className="check-box" />
            <span className="span_1">
              Я согласен с
              <a
                href="https://policies.google.com/terms?hl=en-US"
                target="_blank"
              >
                &nbsp; правилами и условиями
              </a>
            </span>
            <input
              type="submit"
              className="submit-btn"
              value="Зарегистрироваться"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
