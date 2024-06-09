
export const actions = {
    setToastMessage: function (message: string, type: string, config: config | null) {
        this.toastMessage = {
            config: config ? config : this.toastMessage.config,
            message,
            type
        };
    },
}

interface config {
    duration: number,
    position: string,
    hasIcon: boolean,
    theme: string,
}