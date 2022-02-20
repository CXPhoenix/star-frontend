<template>
  <transition name="signin">
    <Modal :isShow="isShow">
      <SignInForm :logo="imgSrc" :haveCloseTag="false" class="bg-white" />
    </Modal>
  </transition>
</template>

<script>
import SignInForm from "../components/SignInForm.vue";
import Modal from "../components/Modal.vue";
export default {
  components: {
    SignInForm,
    Modal,
  },
  props: {
    imgSrc: String,
    isShow: Boolean,
  },
  setup(props) {
    const imgSrc = props.imgSrc ? props.imgSrc : null;
    const isShow = props.isShow;
    return {
      imgSrc,
      isShow,
    };
  },
};
</script>

<style scoped>
.signin-leave-active {
  @apply duration-200;
}

.signin-leave-from {
  @apply opacity-100;
}

.signin-leave-to {
  @apply opacity-0;
}
</style>
