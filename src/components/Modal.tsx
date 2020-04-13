import { FunctionalComponent } from "preact";

export type ModalProps = {
    visible: boolean,
    onClose: Function,
}

const Modal: FunctionalComponent = (props: ModalProps) => {
    const defaultOnClose = () => { console.error('Provide an onClose function for the modal.'); }
    return props.visible && (
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                {props.children}
            </div>
            <button
                onClick={props.onClose || defaultOnClose}
                class="modal-close is-large"
                aria-label="close"
            />
        </div>
    );
};

export default Modal;