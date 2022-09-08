<template>
  <q-page class="flex column flex-center">
    {{ $route.query.code ? "Code: " + $route.query.code : "No code" }}
  </q-page>
</template>

<script>
export default {
  beforeCreate() {
    if (!this.$route.query.code) {
      this.redirectToLoginPage();
    }
  },
  methods: {
    redirectToLoginPage() {
      window.location.href =
        "https://test.id.gov.ua/?response_type=code&client_id=86ffd88ba084f98b84955f7eb23ebc9a&auth_type=dig_sign&state=test_login&redirect_uri=https://uwallet.netlify.app/oauth/redirect";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
