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
}

const Button: FunctionalComponent = ({ children, variant, ...rest }) => {
    const variantCssClass = () => {
        return variant || ButtonVariant.White;
    }

    return (
        <button class={`button ${variantCssClass()}`} {...rest}>
            {children}
        </button>
    );
};

export default Button;