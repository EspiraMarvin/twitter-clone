<template>
  <div class="q-mt-xs">
    <q-card flat>
      <q-item style="margin-bottom: -10px">
        <q-item-section avatar>
          <q-skeleton type="QAvatar" size="3.2em" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" height="35px" />
          </q-item-label>
          <q-item-label class="small-screen-only" caption style="margin-top: -10px">
            <q-skeleton type="text" height="25px" width="40%" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar />

        <q-item-section class="q-pl-sm">
          <q-skeleton height="70px" class="q-mb-sm" />

          <div class="row items-center justify-between no-wrap">
            <div class="row items-center">
              <q-icon name="far fa-comment" color="grey-4" class="q-mr-sm" size="1.3em" />
              <q-skeleton type="text" width="15px" />
            </div>

            <div class="row items-center">
              <q-icon name="fas fa-retweet" color="grey-4" class="q-mr-sm" size="1.3em" />
              <q-skeleton type="text" width="15px" />
            </div>

            <div class="row items-center">
              <q-icon name="fas fa-heart" color="grey-4" class="q-mr-sm" size="1.3em" />
              <q-skeleton type="text" width="15px" />
            </div>

            <div class="row items-center">
              <q-icon name="fas fa-trash" color="grey-4" class="q-mr-sm" size="1.3em" />
<!--              <q-skeleton type="text" width="15px" />-->
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-card>
    <q-separator />
  </div>
</template>

<script>
export default {
  name: 'Skeleton'
}
</script>

<style scoped>

</style>
