import { FunctionalComponent } from "preact";

export enum ButtonVariant {
    Primary = 'is-primary',
    Success = 'is-success',
    Danger = 'is-danger',
    Warning = 'is-warning',
    Info = 'is-info',
    Link = 'is-link',
    Light = 'is-light',
    Dark = 'is-dark',
    Text = 'is-text',
    White = 'is-white',
}

export type ButtonProps = {
    variant: ButtonVariant,
    onClick: Function,
    type?: 'button'|'submit',
}

const Button: FunctionalComponent<ButtonProps> = ({ children, variant, type, ...rest }) => {
    const variantCssClass = () => {
        return variant || ButtonVariant.White;
    }

    return (
        <button
            class={`button ${variantCssClass()}`}
            type={type || 'button'}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;