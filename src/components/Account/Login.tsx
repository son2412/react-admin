import React, { useState, FormEvent } from 'react';
import { OnChangeModel } from '../../common/types/Form.types';
import { login, loginFB, loginGoogle } from '../../api/authApi';
import TextInput from '../../common/components/TextInput';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

const Login: React.FC = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    email: { error: '', value: '' },
    password: { error: '', value: '' }
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }
    const response = await login({ email: formState.email.value, password: formState.password.value });
    if (response.status === 200 && response.data.data.token) {
      Cookies.set('token', response.data.data.token);
      history.push('/admin/home');
    } else {
      toast.error(response.data.message);
    }
  }

  function isFormInvalid() {
    return formState.email.error || formState.password.error || !formState.email.value || !formState.password.value;
  }

  function getDisabledClass(): string {
    const isError: boolean = isFormInvalid() as boolean;
    return isError ? 'disabled' : '';
  }

  const responseFacebook = async (data) => {
    const { id, accessToken } = data;
    const response = await loginFB({ id: id, token: accessToken });
    console.log(response);
  };

  const responseSuccessGoogle = async (data) => {
    console.log(data)
    const { tokenId, accessToken } = data;
    const response = await loginGoogle({ token: accessToken });
    console.log(response);
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome!</h1>
                    </div>
                    <form className="user" onSubmit={submit}>
                      <div className="form-group">
                        <TextInput
                          id="input_email"
                          field="email"
                          value={formState.email.value}
                          onChange={hasFormValueChanged}
                          required={true}
                          maxLength={100}
                          label="Email"
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group">
                        <TextInput
                          id="input_password"
                          field="password"
                          value={formState.password.value}
                          onChange={hasFormValueChanged}
                          required={true}
                          maxLength={100}
                          type="password"
                          label="Password"
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label" htmlFor="customCheck">
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <button className={`btn btn-primary btn-user btn-block ${getDisabledClass()}`} type="submit">
                        Login
                      </button>
                      <div className="m-2">
                        <FacebookLogin
                          appId={'187531485807567'}
                          autoLoad={true}
                          fields="name,email,picture"
                          // onClick={componentClicked}
                          callback={responseFacebook}
                          cssClass={'btn btn-primary btn-user btn-block'}
                        />
                      </div>
                      <div className="m-2">
                        <GoogleLogin
                          clientId="535909429783-121japb6b16mm3hagjefie7j61umoeb2.apps.googleusercontent.com"
                          render={(renderProps) => (
                            <button className="btn btn-primary btn-user btn-block" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                              Login with Google
                            </button>
                          )}
                          // buttonText="Login with Google"
                          onSuccess={responseSuccessGoogle}
                          onFailure={responseErrorGoogle}
                          cookiePolicy={'single_host_origin'}
                          // className="btn btn-primary btn-user btn-block"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
