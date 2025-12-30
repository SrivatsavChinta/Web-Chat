import { useState } from "react";
import styles from "./Login.module.scss";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useStore } from "../../store/Store";
import type { ICredentials, IStore } from "../../store/IStore";
import { addUserService } from "../../services/userService/AddUserService";
import type { ILoginResponse } from "./ILogin";
import { STRINGS } from "@shared/constants/strings";

export const Login = () => {
  const setCredentials = useStore((state: IStore) => state.setCredentials);
  const [loginError, setLoginError] = useState<boolean>(false);

  const loginSuccess = async (response: ILoginResponse): Promise<void> => {
    try {
      setLoginError(false);
      if (!response.credential) throw new Error("Credential Not Found");
      const decodedToken: ICredentials = jwtDecode<ICredentials>(
        response.credential
      );
      setCredentials(decodedToken);
      await addUserService.addUser(decodedToken);
    } catch (error) {
      console.log("Token cannot be decoded", error);
    }
  };

  const loginFailure = () => {
    setLoginError(true);
    console.log("Login Failed");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginDialogBox}>
        <h1 className={styles.title}>{STRINGS.loginTitle}</h1>
        <div>{STRINGS.loginSubtitle}</div>
        <GoogleLogin
          onSuccess={loginSuccess}
          onError={loginFailure}
          auto_select={false}
          useOneTap={false}
        />

        {loginError && (
          <div className={styles.error}>{STRINGS.loginErrorMessage}</div>
        )}
      </div>
    </div>
  );
};
