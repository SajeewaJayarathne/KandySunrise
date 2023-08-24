<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto] lg:grid-rows-1 gap-10 lg:gap-20">
    <div
        class="col-start-1 row-start-2 lg:row-start-1"
        data-aos="fade-right"
        data-aos-duration="2000"
    >
      <div class="w-full h-[40vh] lg:h-full">
        <iframe class="shadow-xl"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.31490788903!2d80.64089057482778!3d7.318478913415308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae367dd53e751bd%3A0x62e9afb02efd878c!2s16%20Dharshana%20Mawatha%2C%20Kandy%2020000%2C%20Sri%20Lanka!5e0!3m2!1sen!2sau!4v1689594126021!5m2!1sen!2sau"
                width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>

    <div
        data-aos="fade-left"
        data-aos-duration="2000"
    >
      <h3 class="text-center lg:text-left">{{ localCurrentLang.common.contact }}</h3>
      <TabWrapper :on-tab-change="onTabChange" :selectedTabId="formOption">
        <Tab :title="localCurrentLang.common.book_for_holiday" :tabId="0">
          <Form
              class="mt-6"
              :isMobileAvailable="false"
              :onSubmit="onFormSubmit"
              :btnLabel="localCurrentLang.form.request_book"
              :formType="Constants.FORM_TYPES.BOOK"
          />
        </Tab>

        <Tab :title="localCurrentLang.hero.schedule" :tabId="1">
          <Form
              class="mt-6"
              :isMobileAvailable="true"
              :mobileNumber="'+61 406 195 123'"
              :onSubmit="onFormSubmit"
              :btnLabel="localCurrentLang.form.send"
              :formType="Constants.FORM_TYPES.SCHEDULE"
          />
        </Tab>
      </TabWrapper>
    </div>
  </div>

  <Popup :open="showSubmitMessage" @close="showSubmitMessage = false">
    <div v-if="submitMessage != null" class="h-full">
      <h3 class="text-center flex justify-center">
        <IconSuccess v-if="submitMessage.type === 1" class="mr-4 my-auto"/>
        <IconReject v-else class="mr-4 my-auto"/>
        {{ submitMessage.title }}
      </h3>
      <p class="mt-6 lg:mt-12 text-lg">{{ submitMessage.body }}</p>
    </div>
  </Popup>
</template>

<script setup>
import {ref} from 'vue';
import {defineProps} from '@vue/runtime-core';

import {Constants} from '../utils/constants';
import {getCurrentLangFile} from '../utils/state.vue';

import Form from '../sub-components/form.vue';
import Popup from '../sub-components/popup.vue';
import IconReject from '../icons/icon-reject.vue';
import IconSuccess from '../icons/icon-success.vue';
import TabWrapper from '../sub-components/tab-wrapper.vue';
import Tab from '../sub-components/tab.vue';

const props = defineProps(['formOption', 'onTabChange']);
const tabs = ref(['book', 'schedule']);

const localCurrentLang = ref(getCurrentLangFile());

const submitMessage = ref(null);
const showSubmitMessage = ref(false);

function onFormSubmit(result) {
  const langObj = localCurrentLang.value?.form;

  submitMessage.value = {
    type: result.success ? 1 : 0,
    title: result.message || (result.success ? langObj.success_heading : langObj.failed_heading),
    body: result.success ? langObj.success_message : langObj.failed_message
  }

  showSubmitMessage.value = true;
}

function onClickTab(tabId) {

}
</script>