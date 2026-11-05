// University email: accepts *.edu, *.edu.pk (which covers nu.edu.pk and lhr.nu.edu.pk).
const EMAIL_RE = /^[^\s@]+@([a-z0-9-]+\.)+[a-z]{2,}$/i
const UNI_RE = /(\.|@)(edu|edu\.pk)$/i

export function isUniversityEmail(email = '') {
  const e = email.trim().toLowerCase()
  return EMAIL_RE.test(e) && UNI_RE.test(e)
}

export function validateName(name = '') {
  return name.trim().length >= 2 ? '' : 'Give us at least 2 characters.'
}

export function validateEmail(email = '') {
  if (!email.trim()) return 'Email is required.'
  if (!isUniversityEmail(email)) return 'Use your university email (.edu or .edu.pk).'
  return ''
}

export function validatePassword(password = '') {
  return password.length >= 8 ? '' : 'Password needs at least 8 characters.'
}
