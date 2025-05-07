import React, { useState } from 'react'

type Props = {
  onSubmit: (email: string, password: string) => void,
  buttonLable: string,
}

const AuthForm: React.FC<Props> = ({ buttonLable, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password)
      }}
        className="flex flex-col gap-3 max-w-[350px]"
      >
        <input type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border"
        />
        <input type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border"
        />
        <button type="submit">{buttonLable}</button>
      </form>
    </div>
  )
}

export default AuthForm