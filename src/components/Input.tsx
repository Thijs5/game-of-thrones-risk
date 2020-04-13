import { FunctionalComponent, Component } from 'preact';

export type InputProps = {
    autoFocus?: boolean,
    id?: string,
    placeholder?: string,
    iconLeft?: string,
    className?: any,
    type?: string,
    label?: string,
    onInput?: Function,
    ref?: any,
}

class Input extends Component<InputProps> {
    controlCssClasses() {
        const { iconLeft } = this.props;
        return `control ${iconLeft ? 'has-icons-left' : ''}`;
    }
    defaultFunction() {};

    setFocus() {
        const { autoFocus } = this.props;
        if (autoFocus) {
            this.inputRef.focus();
        }
    }

    componentDidMount() {
        this.setFocus();
    }

    render() {
        const {
            id,
            iconLeft,
            label,
            placeholder,
            ref,
            type,
            onInput,
        } = this.props;
        return (
            <div class="field">
                { label && (
                    <label class="label" for={id}>
                        {label}
                    </label> 
                )}
                <div class={this.controlCssClasses()}>
                    <input
                        ref={(input) => { this.inputRef = input; }} 
                        id={id}
                        class="input"
                        type={type ?? 'text'}
                        placeholder={placeholder}
                        onInput={onInput || this.defaultFunction}
                    />
                    {iconLeft && (
                        <span class="icon is-small is-left">
                            <i class={`fas fa-${iconLeft}`}></i>
                        </span>
                    )}
                </div>
            </div>
        );
    }
}

export default Input;