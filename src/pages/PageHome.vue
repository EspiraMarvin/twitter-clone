<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-height full-width" :thumb-style="thumbStyle" :bar-style="barStyle">
      <div class="q-py-lg q-px-md row items-end  q-col-gutter-md">
        <div class="col">
          <q-input
            v-model="newQweetContent"
            class="new-qweet"
            placeholder="What's happening?"
            maxlength="280"
            bottom-slots
            counter
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img :src="avatar">
              </q-avatar>
            </template>
          </q-input>
        </div>

        <div class="col col-shrink">
          <q-btn
            @click="addNewQweet"
            ref="addButton"
            :disable="isDisabled"
            class="q-mb-lg"
            unelevated
            rounded
            color="primary"
            label="Tweet"
            no-caps
          />
        </div>
      </div>

      <q-separator
        size="10px"
        color="grey-2"
        class="divider"
      />

      <template v-if="!loading && qweets.length">
        <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item
          class="qweet q-py-md"
          v-for="qweet in qweets"
          :key="qweet.id"
        >
          <q-item-section avatar top>
            <q-avatar size="xl">
              <img :src="avatar">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle1">
              <div class="row justify-between">
                <div>
                  <strong>
                    Marvin Espira
                  </strong>
                  <span class="text-grey-7">
                @marvin_espira
                <br class="lt-sm">&bull; {{ qweet.date | relativeDate }}
                  </span>
                </div>
                <q-btn class="float-right" size="12px" flat dense color="grey" round icon="more_horiz" />
              </div>
            </q-item-label>
            <q-item-label class="qweet-content text-body1">
              {{ qweet.content }}
            </q-item-label>
            <q-item-label class="text-grey-6" v-if="qweet.operatingSys === 'win' && 'ios'">
              · Twitter for web
            </q-item-label>
            <q-item-label class="text-grey-6" v-if="qweet.operatingSys != 'win' && 'ios'">
              · Twitter for {{ qweet.operatingSys }}
            </q-item-label>
            <div class="qweeet-icons row justify-between q-mt-sm">
              <q-btn
                @click="clickComment"
                icon="far fa-comment" size="sm" color="grey" flat round
              />
              <q-btn
                @click="toggleRetweeted(qweet)"
                :icon="qweet.retweeted ? 'fas fa-retweet' : 'fa fa-retweet'"
                :color="qweet.retweeted ? 'green' : 'grey'"
                :label="qweet.retweeted ? 1 : ''"
                size="sm"
                flat round
              />
              <q-btn
                v-ripple
                @click="toggleLiked(qweet)"
                :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                :color="qweet.liked ? 'pink' : 'grey'"
                :label="qweet.liked ? 1 : ''"
                size="sm"
                style="max-width: 35px"
                flat
                round
              />
              <q-btn
                @click="deleteQweet(qweet)"
                icon="fas fa-trash" size="sm" color="grey" flat round
              />
            </div>
          </q-item-section>
        </q-item>
        </transition-group>

      </q-list>
      </template>

      <template v-else>
        <div v-for="item in numberOfSkeletons" :key="item.index">
          <Skeleton />
        </div>
      </template>

    </q-scroll-area>
    <q-dialog v-model="confirm" transition-show="fadeIn" transition-hide="fadeOut">
      <DeletePrompt :proceedDelete="proceedDelete" />
    </q-dialog>
  </q-page>
</template>

<script>
import { formatDistance } from 'date-fns'
import { Platform } from 'quasar'
import db from '../boot/firebase'
import commonMixins from '../mixins/commonMixins'
import DeletePrompt from '../components/DeletePrompt'
import Skeleton from '../components/Skeleton'
export default {
  name: 'PageHome',
  components: { Skeleton, DeletePrompt },
  mixins: [commonMixins],
  data () {
    return {
      loading: false,
      newQweetContent: '',
      avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
      confirm: false,
      qweetToBeDeleted: {},
      deviceType: [],
      numberOfSkeletons: 10,
      qweets: [
        // {
        //   id: 1,
        //   content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, asperiores autem cum dolor doloremque eos error exercitationem facere iure modi nulla, praesentium provident qui ratione voluptate. Dolores error excepturi vel!\n' +
        //     '\n' +
        //     '            Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        //   date: 1618459322555,
        //   retweeted: true,
        //   liked: false
        // }
      ]
    }
  },
  mounted () {
    this.loading = true
    this.firebaseFetchQweets()
    this.getDeviceTypeName()
    this.loading = false
  },
  filters: {
    relativeDate (value) {
      return formatDistance(value, new Date())
    }
  },
  methods: {
    addNewQweet () {
      // eslint-disable-next-line no-unused-vars
      const newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        retweeted: false,
        liked: false,
        platformName: this.deviceType[0],
        operatingSys: this.deviceType[1]
      }
      this.addTweetToFirebase(newQweet)
    },
    addTweetToFirebase (newQweet) {
      // Add a new document with a generated id.
      db.collection('qweets').add(newQweet)
        .then(docRef => {
          // console.log('Document written with ID: ', docRef.id)
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          // console.error('Error adding document: ', error)
        })
      this.newQweetContent = ''
      this.showNotifyAddTweet('Your Tweet was sent.')
    },
    deleteQweet (qweet) {
      this.confirm = true
      this.qweetToBeDeleted = qweet
    },
    proceedDelete () {
      this.confirm = false
      const qweet = this.qweetToBeDeleted
      db.collection('qweets').doc(qweet.id).delete().then(() => {
        // console.log('Document successfully deleted!')
        this.showNotifyDeleteTweet('Your Tweet was deleted')
        // eslint-disable-next-line handle-callback-err
      }).catch(error => {
        // console.error('Error removing document: ', error)
      })
    },
    toggleLiked (qweet) {
      db.collection('qweets').doc(qweet.id).update({
        liked: !qweet.liked
      })
        .then(() => {
          // console.log('Document successfully updated!')
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          // The document probably doesn't exist.
          // console.error('Error updating document: ', error)
        })
    },
    toggleRetweeted (qweet) {
      db.collection('qweets').doc(qweet.id).update({
        retweeted: !qweet.retweeted
      })
        .then(() => {
          // console.log('doc updated success')
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          // console.log('error updating doc', error)
        })
    },
    clickComment () {

    },
    firebaseFetchQweets () {
      db.collection('qweets').orderBy('date').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const qweetChange = change.doc.data()
          qweetChange.id = change.doc.id
          // add qweet
          if (change.type === 'added') {
            this.qweets.unshift(qweetChange)
          }
          // edit qweet
          if (change.type === 'modified') {
            const index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
            // Object.assign copies/assigns properties from one or more source Objects to a target Object
            // Object.assign copies/assigns properties from one or more source Objects to a target Object
            // In this case, we assign our local data, the Object (this.qweets) to qweetChange object to reflect changes to the UI (this.qweets) at the position Index
            Object.assign(this.qweets[index], qweetChange)
          }
          // delete qweet
          if (change.type === 'removed') {
            // console.log('Removed qweet: ', qweetChange)
            const index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
            this.qweets.splice(index, 1)
          }
        })
      })
    },
    getDeviceTypeName () {
      const platformName = Platform.is.name
      const operatingSys = Platform.is.platform
      this.deviceType.push(platformName, operatingSys)
    }
  },
  computed: {
    likedCount () {
      return this.qweets.filter(qweet => {
        qweet.lable = qweet.liked === true ? 'liked' : 'no'
        return qweet
      })
    },
    // used computed prop to check if newQweet typed in has only white space if it has only white spaces, disable the qweet button
    // regex to check if newQweet contains only white spaces - newQweet.replace(/\s/g, '')
    isDisabled () {
      return !this.newQweetContent.replace(/\s/g, '').length
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
  .qweet:not(:first-child)
    border-top: 1px solid rgba(0, 0, 0, 0.12)
  .qweet-content
    white-space: pre-line
  .qweeet-icons
    margin-left: -5px
</style>
