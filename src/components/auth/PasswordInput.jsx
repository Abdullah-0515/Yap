import { useState } from 'react'
import { Input } from '../ui'

export default function PasswordInput(props) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input {...props} type={show ? 'text' : 'password'} className="[&_input]:pr-16" />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute right-2 top-[27px] rounded-slip px-2 py-1 font-mono text-xs font-bold uppercase underline"
      >
        {show ? 'hide' : 'show'}
      </button>
    </div>
  )
}
