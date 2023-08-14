<script>
import {ref} from 'vue';
import {LanguageEN} from '../languages/language-en';
import {LanguageZh} from '../languages/language-zh';
import {Constants} from './constants';

// Define the initial value for currentLangFile
const currentLangFile = ref({});

const getCurrentLangFile = () => {
  return currentLangFile;
}

// Define the function to set the currentLangFile value
const setCurrentLangFile = (lang) => {
  switch (lang) {
    case Constants.LANG_CODES.EN:
      currentLangFile.value = LanguageEN;
      return;
    case Constants.LANG_CODES.ZH:
      currentLangFile.value = LanguageZh;
      return;
    default:
      return;
  }
};

export { getCurrentLangFile, setCurrentLangFile };
</script>