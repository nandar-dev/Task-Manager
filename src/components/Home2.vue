<template>
  <div id="visa">
    <h1>Create a New Vue Account</h1>
    <form @submit.prevent="handleSubmission">
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
      <!-- <input type="submit" :disabled="!disabled.every((i) => i === false)" /> -->
      <input type="submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      name: "",
      password: "",
      email: "",
      msg: [],
      twitter: "",
      disabled: [true, true],
    };
  },
  watch: {
    email(value) {
      // binding this to the data value in the email input
      this.email = value;
      this.validateEmail(value);
    },
    password(value) {
      this.password = value;
      this.validatePassword(value);
    },
  },
  methods: {
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
        this.disabled = [false, this.disabled[1]];
      } else {
        this.msg["email"] = "Invalid Email Address";
        this.disabled = [true, this.disabled[1]];
      }
    },
    validatePassword(value) {
      let difference = 8 - value.length;
      if (value.length < 8) {
        this.msg["password"] =
          "Must be 8 characters! " + difference + " characters left";
        this.disabled = [this.disabled[0], true];
      } else {
        this.msg["password"] = "";
        this.disabled = [this.disabled[0], false];
      }
    },
    handleSubmission() {
      if (this.msg.email == "" && this.msg.password == "") {
        alert(`Email: ${this.email} Password: ${this.password}`);
      } else {
        this.validateEmail(this.email);
        this.validatePassword(this.password);
        alert("Invalid form");
      }
    },
  },
};
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
</style>
