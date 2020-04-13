import { FunctionalComponent } from "preact";

const Form: FunctionalComponent<any> = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={onSubmit}>
            {props.children}
        </form>
    );
};

export default Form;