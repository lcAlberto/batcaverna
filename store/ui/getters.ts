export const getters = {
    getToastMessage: (state: toastMessage) => state.toastMessage,
}
interface toastMessage {
    toastMessage: never;
    message: string,
    type: string,
    config: config,
}

interface config {
    duration: number,
    position: string,
    hasIcon: boolean,
    theme: string,
}