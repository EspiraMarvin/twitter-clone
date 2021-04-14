<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end  q-col-gutter-md">
      <div class="col">
        <q-input
          bottom-slots
          v-model="newQweetContent"
          class="new-qweet"
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
        </q-input>
      </div>

      <div class="col col-shrink">
        <q-btn
          :disable="!newQweetContent"
          class="q-mb-lg"
          unelevated
          rounded
          color="primary"
          label="Qweet"
          no-caps
        />
      </div>
    </div>

    <q-separator
      size="10px"
      color="grey-2"
      class="divider"
    />

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

<style lang="sass">
  .new-qweet
    textarea
      font-size: 19px
      line-height: 1.4 !important
  .divider
    border-top: 1px solid
    border-bottom: 1px solid
    border-color: $grey-4
</style>
