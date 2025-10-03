function validateUserRegister({ name, email, address, password }) {
  if (!name || name.length < 20 || name.length > 60) return 'Name must be 20-60 chars';
  if (!address || address.length > 400) return 'Address max 400 chars';
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) return 'Invalid email';
  if (
    !password ||
    password.length < 8 ||
    password.length > 16 ||
    !/[A-Z]/.test(password) ||
    !/[^a-zA-Z0-9]/.test(password)
  )
    return 'Password: 8-16 chars, 1 uppercase, 1 special char';
  return null;
}

function validatePassword(password) {
  if (
    !password ||
    password.length < 8 ||
    password.length > 16 ||
    !/[A-Z]/.test(password) ||
    !/[^a-zA-Z0-9]/.test(password)
  )
    return 'Password: 8-16 chars, 1 uppercase, 1 special char';
  return null;
}

module.exports = { validateUserRegister, validatePassword };