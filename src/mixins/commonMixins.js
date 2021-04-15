const commonMixins = {

  methods: {
    showNotifyAddTweet (message) {
      this.$q.notify({
        message: message,
        actions: [
          { label: 'Dismiss', color: 'white' }
        ]
      })
    },
    showNotifyDeleteTweet (message) {
      this.$q.notify({
        message: message
      })
    },
    deleteDialog () {
      this.$q.dialog({
        title: 'Delete Tweet?',
        message: 'This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results. ',
        ok: {
          push: true
        },
        cancel: {
          push: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.showNotifyDeleteTweet()
        // console.log('>>>> OK')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}

export default commonMixins
