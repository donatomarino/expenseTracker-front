import { FaEye, FaEyeSlash } from "react-icons/fa";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const {
    formData, 
    setFormData, 
    handleChange, 
    handleSubmit
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
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="loginEmail"
                placeholder="your@email.com"
                value={formData.email}
                onChange = {handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label">
                Password
              </label>

              <div className="position-relative">
                <input
                  type={formData.showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  id="loginPassword"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ paddingRight: "2.5rem" }}
                />

                <button
                  type="button"
                  className="border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center justify-content-center text-muted"
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
                  }}
                >
                  {formData.showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

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

            <button type="submit" className="btn btn-primary w-100">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;