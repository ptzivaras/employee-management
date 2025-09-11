// import client from "./client";

// // Utility: try a modern endpoint, fall back to legacy on 404.
// async function tryWithFallback(tryCall, fallbackCall) {
//   try {
//     return await tryCall();
//   } catch (err) {
//     if (err?.response?.status === 404) {
//       return await fallbackCall();
//     }
//     throw err;
//   }
// }

// // List employees
// export async function listEmployees() {
//   return tryWithFallback(
//     async () => (await client.get("/employees")).data,
//     async () => (await client.get("/employees2")).data
//   );
// }

// // Get one employee by id
// export async function getEmployee(id) {
//   return tryWithFallback(
//     async () => (await client.get(`/employees/${id}`)).data,
//     async () => (await client.get(`/employees2/${id}`)).data
//   );
// }

// // Create employee
// // Modern API expects: { firstName, lastName, email, departmentId }
// // Legacy expects:     { firstName, lastName, emailId, compId }
// export async function createEmployee(payload) {
//   const modernBody = {
//     firstName: payload.firstName,
//     lastName: payload.lastName,
//     email: payload.email,
//     departmentId: payload.departmentId,
//   };

//   const legacyBody = {
//     firstName: payload.firstName,
//     lastName: payload.lastName,
//     emailId: payload.email,
//     compId: Number(payload.departmentId),
//   };

//   return tryWithFallback(
//     async () => (await client.post("/employees", modernBody)).data,
//     async () => (await client.post("/employees2", legacyBody)).data
//   );
// }

// // Update employee
// export async function updateEmployee(id, payload) {
//   const modernBody = {
//     firstName: payload.firstName,
//     lastName: payload.lastName,
//     email: payload.email,
//     departmentId: payload.departmentId,
//   };

//   const legacyBody = {
//     firstName: payload.firstName,
//     lastName: payload.lastName,
//     emailId: payload.email,
//     compId: Number(payload.departmentId),
//   };

//   return tryWithFallback(
//     async () => (await client.put(`/employees/${id}`, modernBody)).data,
//     async () => (await client.put(`/employees2/${id}`, legacyBody)).data
//   );
// }

// // Delete employee
// export async function deleteEmployee(id) {
//   return tryWithFallback(
//     async () => (await client.delete(`/employees/${id}`)).data,
//     async () => (await client.delete(`/employees2/${id}`)).data
//   );
// }
