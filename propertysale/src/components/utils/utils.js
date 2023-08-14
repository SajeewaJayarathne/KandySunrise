export default {
    onModalStateChanged(state) {
        if (state) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }
}