<template>
  <form class="contact-form" @submit.prevent="submitForm">
    <div>
      <div>
        <label class="required">Name</label>
        <input type="text" name="name" v-model="name" required/>
      </div>
      <div>
        <label class="required">Email</label>
        <input type="email" name="email" v-model="email" required/>
      </div>
    </div>
    <div>
      <div>
        <label class="required">Phone</label>
        <input type="text" name="phone" v-model="phone" required/>
      </div>
      <div>
        <label class="required">Requested Date</label>
        <input type="date" name="reqDate" required v-model="reqDate" :min="minDate"/>
      </div>
    </div>
    <div>
      <div>
        <label>Other Requests</label>
        <textarea name="message" v-model="message"></textarea>
      </div>
    </div>

    <div class="items-center justify-between">
      <button v-if="inProgress" class="button-secondary !py-3 cursor-not-allowed" :style="{width: `${btnWidth}px`}" disabled>
        <div class="loader"></div>
      </button>
      <button v-else type="submit" class="button-secondary" ref="submitBtn">Send Message</button>

      <span v-if="isMobileAvailable" class="pt-3 lg:pt-0 text-center lg:text-right">Or call on:
        <a :href="'tel:' + mobileNumber" class="lg:ml-4 underline underline-offset-4 inline-block">{{ mobileNumber }}</a>
      </span>
    </div>
  </form>

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
import {ref, onBeforeMount, onMounted} from 'vue';
import {defineProps} from '@vue/runtime-core';

import Popup from '../sub-components/popup.vue';
import IconSuccess from '../icons/icon-success.vue';
import IconReject from '../icons/icon-reject.vue';

defineProps(['isMobileAvailable', 'mobileNumber']);

const WEB3FORMS_ACCESS_KEY = 'cf2b2317-13d3-4e77-a3c9-3bdf1d77fc99';

const name = ref("");
const email = ref("");
const phone = ref("");
const reqDate = ref("");
const message = ref("");

const minDate = ref(null);
const btnWidth = ref(0);
const submitBtn = ref(null);
const submitMessage = ref(null);
const showSubmitMessage = ref(false);

const inProgress = ref(false);

onBeforeMount(() => _setDefaultDate());

onMounted(() => {
  btnWidth.value = submitBtn.value?.getBoundingClientRect()?.width;
});

function _setDefaultDate() {
  const dtToday = new Date();

  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  const year = dtToday.getFullYear();
  if (month < 10) {
    month = '0' + month.toString();
  }
  if (day < 10) {
    day = '0' + day.toString();
  }

  minDate.value = year + '-' + month + '-' + day;
}

function _showSubmitMessage(result) {
  submitMessage.value = {
    type: result.success ? 1 : 0,
    title: result.message || 'Email sent successfully!',
    body: result.success ?
        'We appreciate you contacting us in scheduling a visit. We will get back in touch with you soon! Have a great day!'
        : 'An error has occurred while sending the email. Please submit your information again after a few minutes. Thank you! Have a great day!'
  }

  showSubmitMessage.value = true;
}

const submitForm = async () => {
  inProgress.value = true;

  const response = await fetch('https://api.web3forms.com/submit', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      name: name.value,
      email: email.value,
      phone: phone.value,
      reqDate: reqDate.value,
      message: message.value,
    }),
  });

  const result = await response.json();

  if (result) {
    inProgress.value = false;

    name.value = '';
    email.value = '';
    phone.value = '';
    message.value = '';

    _setDefaultDate();
    _showSubmitMessage(result)
  }
};
</script>