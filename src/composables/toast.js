//공통코드 분리
import { ref, onUnmounted } from 'vue';

export const useToast = () => {
    onUnmounted(() => {//다른 페이지로 이동할 때, 페이지 이동 후 실행
        //사용하는 이유는 <- 메모리 누수를 예방할 수 있다.
        console.log('Unmounted');
        clearTimeout(timeout.value); //timeout clear
      });
      
    // 공통된 부분을 파일 나누기
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastAlertType = ref('');
    const timeout = ref(null);//시간저장 변수
    
    const triggerToast = (message, type = 'success') => { 
      showToast.value = true;
      toastMessage.value = message;
      toastAlertType.value = type;
      timeout.value = setTimeout(() => { 
        console.log('hello');
        toastMessage.value = '';
        showToast.value = false;
        toastAlertType.value = '';//초기화
      },3000);
    }

    return{
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast,
    };
}

