import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconProps = {
    name: string,
}

const Icon: FunctionalComponent = (props: IconProps) => {
    return (
        <FontAwesomeIcon icon={props.name} />
    );
};

export default Icon;