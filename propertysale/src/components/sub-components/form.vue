<template xmlns="http://www.w3.org/1999/html">
  <form class="contact-form" @submit.prevent="submitForm">
    <div class="form-content" :class="formType === Constants.FORM_TYPES.SCHEDULE ? 'grid-cols-2' : 'grid-cols-3'">
      <div>
        <label class="required">{{ localCurrentLang.form.name }}</label>
        <input type="text" name="name" v-model="name" required/>
      </div>

      <div>
        <label class="required">{{ localCurrentLang.form.email }}</label>
        <input type="email" name="email" v-model="email" required/>
      </div>

      <div>
        <label>{{ localCurrentLang.form.phone }}</label>
        <input type="text" name="phone" v-model="phone"/>
      </div>

      <div v-if="formType === Constants.FORM_TYPES.SCHEDULE">
        <label class="required">{{ localCurrentLang.form.date }}</label>
        <input type="date" name="reqDate" required v-model="reqDate" :min="minDate"/>
      </div>

      <div v-if="formType === Constants.FORM_TYPES.BOOK">
        <label class="required">{{ localCurrentLang.form.checkin_date }}</label>
        <input type="date" name="checkinDate" required v-model="checkinDate" :min="minDate"/>
      </div>

      <div v-if="formType === Constants.FORM_TYPES.BOOK">
        <label class="required">{{ localCurrentLang.form.checkout_date }}</label>
        <input type="date" name="checkoutDate" required v-model="checkoutDate" :min="checkinDate || minDate"/>
      </div>

      <div v-if="formType === Constants.FORM_TYPES.BOOK">
        <label class="required">{{ localCurrentLang.form.no_of_guests }}</label>

        <div class="dropdown">
          <input type="number" name="guests" id="guests" class="dropdown-button" :value="noOfGuests" disabled/>

          <div class="dropdown-content">
            <div class="form-group">
              <label class="control-label">{{ localCurrentLang.form.adult }}</label>
              <div class="input-group">
                <button @click="decrement($event, GUEST_TYPES.ADULT)"><IconMinus/></button>
                <input type="text" disabled name="adult" id="adult" class="form-control text-center" :value="noOfAdults" max=9 min=1 />
                <button @click="increment($event, GUEST_TYPES.ADULT)"><IconPlus/></button>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label text-sm font-bold">{{ localCurrentLang.form.child }}</label>
              <div class="input-group">
                <button @click="decrement($event, GUEST_TYPES.CHILD)"><IconMinus/></button>
                <input type="text" disabled name="child" id="child" class="form-control text-center" :value="noOfChildren" max=9 min=1 />
                <button @click="increment($event, GUEST_TYPES.CHILD)"><IconPlus/></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div :class="formType === Constants.FORM_TYPES.SCHEDULE ? 'col-span-2' : 'col-span-3'">
        <label>{{ localCurrentLang.form.other_requests }}</label>
        <textarea name="message" v-model="message"></textarea>
      </div>
    </div>

    <div class="items-center justify-between mt-6 flex">
      <button type="submit" class="button button-secondary" ref="submitBtn" :disabled="inProgress">
        <div v-if="inProgress" class="loader" />
        <div v-else>{{ btnLabel }}</div>
      </button>

      <span v-if="isMobileAvailable" class="pt-3 lg:pt-0 text-center lg:text-right">{{ localCurrentLang.form.or_call }}
        <a :href="'tel:' + mobileNumber" class="lg:ml-4 underline underline-offset-4 inline-block">{{mobileNumber }}</a>
      </span>
    </div>
  </form>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue';
import {Constants} from '../utils/constants';
import {getCurrentLangFile} from '../utils/state.vue';
import {defineProps} from '@vue/runtime-core';

import IconMinus from '../icons/icon-minus.vue';
import IconPlus from '../icons/icon-plus.vue';

const props = defineProps(['isMobileAvailable', 'mobileNumber', 'onSubmit', 'btnLabel', 'formType']);

// const WEB3FORMS_ACCESS_KEY = 'cf2b2317-13d3-4e77-a3c9-3bdf1d77fc99'; //Web3Forms - TESTING
const WEB3FORMS_ACCESS_KEY = 'bb9307d9-0e65-4962-bea3-f8a67a0451d8'; //Web3Forms
const GUEST_TYPES = {
  ADULT: 0,
  CHILD: 1
}

const localCurrentLang = ref(getCurrentLangFile());

const name = ref("");
const email = ref("");
const phone = ref("");
const reqDate = ref("");
const checkinDate = ref("");
const checkoutDate = ref("");
const message = ref("");

const noOfGuests = ref(1);
const noOfAdults = ref(1);
const noOfChildren = ref(0);

const minDate = ref(null);
const submitBtn = ref(null);

const inProgress = ref(false);

onBeforeMount(() => _setDefaultDate());

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

const _resetInputs = () => {
  name.value = '';
  email.value = '';
  phone.value = '';
  message.value = '';
  noOfGuests.value = 1;
  noOfAdults.value = 1;
  noOfChildren.value = 0;
  reqDate.value = '';
  checkinDate.value = '';
  checkoutDate.value = '';
}

const _getBookingReqBody = () => {
  return {
    checkinDate: checkinDate.value,
    checkoutDate: checkoutDate.value,
    noOfGuests: noOfGuests.value,
    noOfAdults: noOfAdults.value,
    noOfChildren: noOfChildren.value,
    message: message.value
  }
}

const _getScheduleReqBody = () => {
  return {
    reqDate: reqDate.value,
    message: message.value
  }
}

const submitForm = async () => {
  inProgress.value = true;

  const commonReqBody = {
    access_key: WEB3FORMS_ACCESS_KEY,
    requestType: props.formType === Constants.FORM_TYPES.BOOK ? localCurrentLang.value.form.booking_req : localCurrentLang.value.form.buying_req,
    name: name.value,
    email: email.value,
    phone: phone.value
  }

  const formReqBody = {...commonReqBody, ...props.formType === Constants.FORM_TYPES.BOOK ? _getBookingReqBody() : _getScheduleReqBody()};

  const response = await fetch('https://api.web3forms.com/submit', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formReqBody),
  });

  const result = await response.json();

  if (result) {
    inProgress.value = false;

    _resetInputs();
    _setDefaultDate();

    if (props.onSubmit) {
      props.onSubmit(result);
    }
  }
};

const decrement = (event, guestType) => {
  event.preventDefault();

  if (guestType === GUEST_TYPES.ADULT && noOfAdults.value > 0 && noOfGuests.value > 1) {
    noOfAdults.value--;
    noOfGuests.value--;
  }

  if (guestType === GUEST_TYPES.CHILD && noOfChildren.value > 0 && noOfGuests.value > 1) {
    noOfChildren.value--;
    noOfGuests.value--;
  }
};

const increment = (event, guestType) => {
  event.preventDefault();

  if (guestType === GUEST_TYPES.ADULT && noOfAdults.value < 9 && noOfGuests.value < 9) {
    noOfAdults.value++;
    noOfGuests.value++;
  }

  if (guestType === GUEST_TYPES.CHILD && noOfChildren.value < 9 && noOfGuests.value < 9) {
    noOfChildren.value++;
    noOfGuests.value++;
  }
};
</script>