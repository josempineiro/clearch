import classnames from 'classnames'
import style from './button.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  return (
    <button className={classnames([style.button, style[variant]])} {...props}>
      {children}
    </button>
  )
}

export default Button
