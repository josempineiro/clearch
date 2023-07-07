import classnames from 'classnames'
import styles from './button.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  return (
    <button className={classnames([styles.button, styles[variant]])} {...props}>
      {children}
    </button>
  )
}

export default Button
