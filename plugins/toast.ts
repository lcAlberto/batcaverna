import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = useToast();


toast.success('xablau!', {
    duration: 5000,
    position: 'top-right',
    hasIcon: true,
    theme: 'sugar',
});