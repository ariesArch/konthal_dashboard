<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8" />
      <div class="col-md-4">
        <v-card class="mx-auto mt-10">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <validation-observer
              ref="observer"
            >
              <v-form @submit.prevent="Login">
                <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <v-text-field v-model="email" outlined label="Email" :error-messages="errors" />
                </validation-provider>
                <validation-provider v-slot="{errors}" name="Password" rules="required">
                  <v-text-field
                    v-model="password"
                    :type="`${showPassword?'text':'password'}`"
                    outlined
                    label="Password"
                    :error-messages="errors"
                    :append-icon="`${showPassword?'visibility':'visibility_off'}`"
                    @click:append="showPassword=!showPassword"
                  />
                </validation-provider>
                <v-btn color="primary" block type="submit" :disabled="isSubmitting">
                  {{ `${isSubmitting ? 'Please Wait...': 'Login'}` }}
                </v-btn>
              </v-form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
// import localforage from 'localforage'
export default {
  auth: 'guest',
  data: () => ({
    email: '',
    password: '',
    isSubmitting: false,
    showPassword: false
  }),
  methods: {
    loginTest () {
      console.log('Red')
      this.$router.push({ path: '/' })
    },
    async Login () {
      this.$nuxt.$loading.start()
      try {
        // const formData = new FormData(this.$refs.loginform)
        const payload = { email: this.email, password: this.password }

        // const { status, owner } = (await this.$auth.loginWith('laravelSanctum', { data: payload })).data
        // const { status, owner } = await this.$auth.loginWith('local', { data: payload })
        // if (status === 1) {
        //   console.log('user login')
        //   console.log(owner)
        //   // this.$auth.strategy.token.set(owner.access_token)
        //   this.$router.push({
        //     name: 'management-branches'
        //   })
        // }
        await this.$auth.loginWith('local', { data: payload })

        // const { data, status } = (await this.$axios.get('/initial_fetch')).data
        // if (status === 1) {
        // localforage.setItem('stored:regions', data.regions)
        // localforage.setItem('stored:cities', data.cities)
        // localforage.setItem('stored:townships', data.townships)
        // }
        // this.$router.push({
        //   name: 'index'
        // })
      } catch (err) {
        console.log(err)
      }
      this.$nuxt.$loading.finish()
    }
  }
}
</script>
