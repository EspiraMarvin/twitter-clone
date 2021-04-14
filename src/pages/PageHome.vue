<template>
  <q-page>
    <div class="q-py-lg q-px-md">
      <q-input
        bottom-slots
        v-model="newQweetContent"
        placeholder="What's happening?"
        maxlength="280"
        counter
        autogrow
      >
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </template>

        <template v-slot:hint>
          Field hint
        </template>

        <template v-slot:after>
          <q-btn
            :disable="!newQweetContent"
            unelevated
            rounded
            color="primary"
            label="Qweet"
            no-caps
          />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageHome',
  data () {
    return {
      newQweetContent: ''
    }
  }
}
</script>
