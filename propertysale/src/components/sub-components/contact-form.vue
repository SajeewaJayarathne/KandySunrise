<template>
  <form class="contact-form" @submit.prevent="submitForm">
    <div>
      <input type="text" name="name" placeholder="Name" v-model="name" required/>
    </div>
    <div>
      <input type="email" name="email" placeholder="Email" v-model="email" required/>
    </div>
    <div>
      <input type="text" name="phone" placeholder="Phone #" v-model="phone" required/>
    </div>
    <div>
      <input type="date" name="reqDate" placeholder="Requested Date" v-model="reqDate" :min="minDate"/>
    </div>
    <div>
      <textarea name="message" placeholder="Other Requests" v-model="message"></textarea>
    </div>

    <div class="items-center">
      <button type="submit" class="button-secondary">Send Message</button>
    </div>

    <div v-if="isMobileAvailable" class="w-full text-center">
      <span class="text-white">Or call on: {{mobileNumber}}</span>
    </div>
  </form>
</template>

<script>
import {ref, onBeforeMount} from 'vue';

const WEB3FORMS_ACCESS_KEY = 'cf2b2317-13d3-4e77-a3c9-3bdf1d77fc99';

export default {
  props: {
    isMobileAvailable: Boolean,
    mobileNumber: String
  },
  setup() {
    const name = ref("");
    const email = ref("");
    const phone = ref("");
    const reqDate = ref("");
    const message = ref("");

    const minDate = ref(null);

    onBeforeMount(() => {
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
    });

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
      if (result.success) {
        console.log(result);
      }
    };

    return {
      name,
      email,
      phone,
      reqDate,
      message,
      minDate,
      submitForm
    };
  }
};
</script>