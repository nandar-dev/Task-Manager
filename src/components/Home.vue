<!-- <template>
  <div id="visa">
    <h1>Create a New Vue Account</h1>
    <form @submit.prevent="handleSubmission()">
    <label for="full name">Full Name:</label>
    <input type="text" v-model="name" />
    <br />
    <label for="email">Email Address:</label>
    <input type="text" v-model="email" /> <br />
    <span v-if="msg.email">{{ msg.email }}</span>
    <label for="password">Password:</label>
    <input type="text" v-model="password" /><br />
    <span v-if="msg.password">{{ msg.password }}</span>
    <br />
    <label for="twitter">Twitter Handle:</label>
    <input type="text" v-model="twitter" />
    <input type="submit" >
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

let name = ref("");
let password = ref("");
let email = ref("");
let twitter = ref("");
let msg = ref([]);
let disabled = ref([true, true]);

watch(email, (curval, oldval) => {
  email.value = curval;
  validateEmail(email.value);
});

watch(password, (curval, oldval) => {
  password.value = curval;
  validatePassword(password.value);
});
function validateEmail(value) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    msg.value["email"] = "";
    disabled.value = [false, disabled.value[1]];
  } else {
    msg.value["email"] = "Invalid Email Address";
    disabled.value = [true, disabled.value[1]];
  }
}

function validatePassword(value) {
  let difference = 8 - value.length;
  if (value.length < 8) {
    msg.value["password"] =
      "Must be 8 characters! " + difference + " characters left";
    disabled.value = [disabled.value[0], true];
  } else {
    msg.value["password"] = "";
    disabled.value = [disabled.value[0], false];
  }
}

function handleSubmission() {
 
  if (msg.value.email === "" && msg.value.password === "") {
    alert(`Email: ${email.value} Password: ${password.value}`);
  } else {
    this.validateEmail(email.value);
    this.validatePassword(password.value);
    alert("Invalid form");
    console.log(msg.value)
  }
}
</script>

<style scoped>
#visa {
  margin: 20px auto;
  max-width: 700px;
  margin-bottom: 28px;
}
label {
  display: block;
  margin: 20px 0 10px;
}
span {
  padding-top: 0px;
  margin-top: 0px;
  font-size: 12px;
  color: red;
}
input {
  font-size: 30px;
  border: 1px double rgb(102, 97, 96);
  border-radius: 4px;
}
</style> -->

<template>
  <Assignments />
</template>

<script setup>
  import Assignments from './Assignments.vue'

</script>
