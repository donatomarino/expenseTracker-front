import FormField from "../../common/FormField";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const {
    loadButton,
    disabledButton,
    isRegistred,
    formData,
    errors,
    navigate,
    handleChange,
    handleSubmit
  } = useRegister();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-3">Create an account</h2>
          <p className="text-muted text-center mb-4">
            Create your account to start tracking your expenses with ease.
          </p>

          <form
            onSubmit={handleSubmit}
            method="POST"
          >
            <FormField
              label="Full Name"
              type="text"
              name="full_name"
              id="registerFullName"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Input your full name"
              disabled={loadButton}
              error={errors.full_name}
            />

            <FormField
              label="Email"
              type="text"
              name="email"
              id="registerEmail"
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
              id="registerPassword"
              value={formData.password}
              onChange={handleChange}
              placeholder="Input your password"
              disabled={loadButton}
              error={errors.password}
            />

            <FormField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              id="registerConfirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              disabled={loadButton}
            />

            {isRegistred ? (
              <button
                type="button"
                className="btn btn-outline-primary w-100 rounded-pill py-2"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </button>
            ) : (
              <div className="d-flex flex-column gap-2">
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill py-2"
                  disabled={loadButton}
                >
                  Register
                </button>

                <Link to="/login" className="btn btn-link">
                  Already have an account? Log in
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </div >
  )
}

export default Register;

