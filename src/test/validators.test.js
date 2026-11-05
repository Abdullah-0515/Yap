import { describe, expect, it } from 'vitest'
import { isUniversityEmail, validateName, validatePassword } from '../lib/validators'

describe('isUniversityEmail', () => {
  it.each(['a@uni.edu', 'a@lhr.nu.edu.pk', 'a@nu.edu.pk', 'A@Some.EDU.PK', 'a@cs.mit.edu'])('accepts %s', (e) => {
    expect(isUniversityEmail(e)).toBe(true)
  })
  it.each(['a@gmail.com', 'a@edu.com', 'nope', 'a@.edu', '', 'a b@uni.edu'])('rejects %s', (e) => {
    expect(isUniversityEmail(e)).toBe(false)
  })
})

describe('field rules', () => {
  it('validates name', () => {
    expect(validateName('A')).not.toBe('')
    expect(validateName('Al')).toBe('')
  })
  it('validates password', () => {
    expect(validatePassword('short')).not.toBe('')
    expect(validatePassword('longenough')).toBe('')
  })
})
