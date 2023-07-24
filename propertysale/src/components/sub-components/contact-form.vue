<template>
  <form class="contact-form" @submit.prevent="submitForm">
    <div>
      <input type="text" name="name" placeholder="Name" v-model="name" required/>
      <input type="email" name="email" placeholder="Email" v-model="email" required/>
    </div>
    <div>
      <input type="text" name="phone" placeholder="Phone #" v-model="phone" required/>
      <input type="date" name="reqDate" placeholder="Requested Date" v-model="reqDate" :min="minDate"/>
    </div>
    <div>
      <textarea name="message" placeholder="Other Requests" v-model="message"></textarea>
    </div>

    <div class="items-center justify-between">
      <button type="submit" class="button-secondary">Send Message</button>
      <span v-if="isMobileAvailable" class="text-right">Or call on:
        <br>
        <a :href="'tel:' + mobileNumber" class="underline underline-offset-4">{{ mobileNumber }}</a>
      </span>
    </div>
  </form>

  <Popup :open="showSubmitMessage" @close="showSubmitMessage = false">
    <div v-if="submitMessage != null" class="h-full">
      <h3 class="text-center flex justify-center">
        <IconSuccess v-if="submitMessage.type === 1" class="mr-4 my-auto" />
        <IconReject v-else class="mr-4 my-auto" />
        {{submitMessage.title}}
      </h3>
      <p class="mt-12 text-lg">{{submitMessage.body}}</p>
    </div>
  </Popup>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue';
import {defineProps} from '@vue/runtime-core';

import Popup from "../sub-components/popup.vue";
import IconSuccess from "../icons/icon-success.vue";
import IconReject from "../icons/icon-reject.vue";

defineProps(['isMobileAvailable', 'mobileNumber']);

const WEB3FORMS_ACCESS_KEY = 'cf2b2317-13d3-4e77-a3c9-3bdf1d77fc99';

const name = ref("");
const email = ref("");
const phone = ref("");
const reqDate = ref("");
const message = ref("");

const minDate = ref(null);
const showSubmitMessage = ref(false);
const submitMessage = ref(null);

onBeforeMount(() => {
  _setDefaultDate();
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
    name.value = '';
    email.value = '';
    phone.value = '';
    message.value = '';

    _setDefaultDate();
    _showSubmitMessage(result)
  }
};
</script>