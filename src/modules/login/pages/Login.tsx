import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";
import FormField from "../../common/components/FormField";
import FullPageLoader from "../../common/components/FullPageLoader";
import Button from "../../common/components/Button";

const Login = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    loadButton,
    loading,
    errors
  } = useLogin();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-3">Welcome back</h2>
          <p className="text-muted text-center mb-4">
            Sign in to track your expenses and stay in control.
          </p>

          <form
            onSubmit={handleSubmit}
            method="POST"
          >
            <FormField
              label="Email"
              type="text"
              name="email"
              id="loginEmail"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              disabled={loadButton}
              error={errors.email}
            />

            <FormField
              label="Password"
              type="password"
              name="password"
              id="loginPassword"
              value={formData.password}
              onChange={handleChange}
              placeholder="Input your password"
              disabled={loadButton}
              error={errors.password}
            />

            {/* <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <button type="button" className="btn btn-link p-0 text-decoration-none">
                Forgot password?
              </button>
            </div> */}

            <div className="d-flex flex-column gap-2">
              <Button
                type="submit"
                className="w-100"
                variant="primary"
                disabled={loadButton}
              >
                Sign in
              </Button>

              <Link to="/register" className="btn btn-link">
                Don't have an account? Sign up
              </Link>

              {FullPageLoader(loading)}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;