export const state = () => ({
    toastMessage: {
        message: '',
        type: 'success',
        config: {
            duration: 5000,
            position: 'top-right',
            hasIcon: true,
            theme: 'sugar',
            dismissible: true,
            pauseOnHover: true
        }
    },
})