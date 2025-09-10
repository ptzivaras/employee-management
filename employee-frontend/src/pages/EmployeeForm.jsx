import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listDepartments } from "../api/departments";
import { getEmployee, createEmployee, updateEmployee } from "../api/employees";

export default function EmployeeForm({ mode }) {
  const nav = useNavigate();
  const { id } = useParams();

  const isEdit = mode === "edit";

  const [departments, setDepartments] = useState([]);
  const [loadingDeps, setLoadingDeps] = useState(true);
  const [loadingEmployee, setLoadingEmployee] = useState(isEdit);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    departmentId: "",
  });

  const [errors, setErrors] = useState({});

  // Load departments
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoadingDeps(true);
      try {
        const deps = await listDepartments();
        if (!alive) return;
        setDepartments(deps || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load departments. Seed some departments first.");
      } finally {
        if (alive) setLoadingDeps(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Load employee data in edit mode
  useEffect(() => {
    if (!isEdit) return;
    let alive = true;
    (async () => {
      setLoadingEmployee(true);
      try {
        const e = await getEmployee(id);
        if (!alive) return;
        setForm({
          firstName: e.firstName ?? "",
          lastName: e.lastName ?? "",
          email: e.email ?? e.emailId ?? "",
          // accommodate both modern and legacy shapes
          departmentId:
            e.departmentId ??
            e.department?.id ??
            e.compId ??
            "", // fallback
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load employee.");
        nav("/employees");
      } finally {
        if (alive) setLoadingEmployee(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [isEdit, id, nav]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // very basic client-side validation
  const validate = useMemo(
    () => (values) => {
      const errs = {};
      if (!values.firstName?.trim()) errs.firstName = "First name is required.";
      if (!values.lastName?.trim()) errs.lastName = "Last name is required.";
      if (!values.email?.trim()) {
        errs.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errs.email = "Email format is invalid.";
      }
      if (!values.departmentId) errs.departmentId = "Department is required.";
      return errs;
    },
    []
  );

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      if (isEdit) {
        await updateEmployee(id, form);
      } else {
        await createEmployee(form);
      }
      nav("/employees");
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Save failed.";
      alert(msg);
    }
  }

  const disableForm = loadingDeps || (isEdit && loadingEmployee);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">{isEdit ? "Edit Employee" : "Add Employee"}</h2>
        <button className="btn btn-link" onClick={() => nav("/employees")}>
          ← Back
        </button>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First name</label>
            <input
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              disabled={disableForm}
              placeholder="John"
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Last name</label>
            <input
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              disabled={disableForm}
              placeholder="Doe"
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              disabled={disableForm}
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Department</label>
            <select
              className={`form-select ${errors.departmentId ? "is-invalid" : ""}`}
              name="departmentId"
              value={form.departmentId}
              onChange={onChange}
              disabled={disableForm}
            >
              <option value="">-- Select department --</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <div className="invalid-feedback">{errors.departmentId}</div>
            )}
          </div>
        </div>

        <div className="mt-4 d-flex gap-2">
          <button className="btn btn-success" type="submit" disabled={disableForm}>
            {isEdit ? "Save changes" : "Create employee"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={disableForm}
            onClick={() => nav("/employees")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
