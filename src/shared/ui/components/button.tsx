import { FC } from 'react';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: FC<IButton> = props => {
  const { children } = props;
  return <button {...props}>{children}</button>;
};
