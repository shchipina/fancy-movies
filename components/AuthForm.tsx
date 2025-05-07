import React, { useState } from 'react'

type Props = {
  title: string,
  onSubmit: (email: string, password: string) => void,
  buttonLable: string,
}

const AuthForm: React.FC<Props> = ({ title, buttonLable, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="py-[48px] px-[68px]">
      <h2 className="text-[32px] font-medium mb-[28px]">
        {title}
      </h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password)
      }}
        className="flex flex-col gap-4 w-[314px]"
      >
        <input type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-400 bg-black/50 rounded-[4px] p-4 font-medium text-gray-300 leading-6"
          placeholder="Email..."
        />
        <input type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-gray-400 bg-black/50 rounded-[4px] p-4 font-medium text-gray-300 leading-6"
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-red-600 py-2 font-bold rounded-[4px]"
        >
          {buttonLable}
        </button>
      </form>
    </div>
  )
}

export default AuthForm