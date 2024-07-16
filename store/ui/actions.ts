export const actions = {
    setToastMessage: function (message: string, type: string, config: configType | null) {
        this.toastMessage = {
            config: config ? config : this.toastMessage.config,
            message,
            type
        };
    },
}

interface configType {
    duration: number,
    position: string,
    hasIcon: boolean,
    theme: string,
}