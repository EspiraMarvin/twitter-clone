<template>
      <q-card class="confirm-card">
        <q-card-section class="row items-center">
          <div class="text-h6 text-weight-bold q-ml-xl q-py-sm">Delete Tweet?</div>
          <span class="q-ml-sm q-px-md">
            This can’t be undone and it will be removed from your profile,
            the timeline of any accounts that follow you, and from Twitter search results.
          </span>
        </q-card-section>

        <q-card-actions class="row justify-evenly q-mb-md">
          <q-btn unelevated rounded label="Cancel" padding="sm xl" no-caps color="grey-3" class="text-black text-weight-bold" v-close-popup />
          <q-btn unelevated rounded label="Delete" padding="sm xl" no-caps color="pink" class="text-weight-bold" @click="proceedDelete" />
        </q-card-actions>
      </q-card>
</template>

<script>
export default {
  name: 'DeletePrompt',
  props: {
    proceedDelete: {
      type: Function
    }
  }
}
</script>

<style lang="sass">
  .confirm-card
    width: 330px !important
    border-radius: 10% !important
</style>
