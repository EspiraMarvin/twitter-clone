<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-height full-width">
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
                <img :src="avatar">
              </q-avatar>
            </template>
          </q-input>
        </div>

        <div class="col col-shrink">
          <q-btn
            @click="addNewQweet"
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
              <strong>
                Marvin Espira
              </strong>
              <span class="text-grey-7">
                @marvin_espira
                <br class="lt-sm">&bull; {{ qweet.date | relativeDate }}
              </span>
            </q-item-label>
            <q-item-label class="qweet-content text-body2">
              {{ qweet.content }}
            </q-item-label>
            <div class="qweeet-icons row justify-between q-mt-sm">
              <q-btn icon="far fa-comment" size="sm" color="grey" flat round/>
              <q-btn
                :icon="qweet.retweet ? 'fas fa-retweet' : 'fa fa-retweet'"
                :color="qweet.retweet ? 'green' : 'grey'"
                :label="qweet.retweet ? 1 : ''"
                size="sm"
                flat round
              />
              <q-btn
                @click="toggleLiked(qweet)"
                :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                :color="qweet.liked ? 'pink' : 'grey'"
                :label="qweet.liked ? 1 : ''"
                size="sm"
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
    </q-scroll-area>
  </q-page>
</template>

<script>
import { formatDistance } from 'date-fns'
import db from '../boot/firebase'
export default {
  name: 'PageHome',
  data () {
    return {
      newQweetContent: '',
      avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
      qweets: [
        {
          id: 1,
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, asperiores autem cum dolor doloremque eos error exercitationem facere iure modi nulla, praesentium provident qui ratione voluptate. Dolores error excepturi vel!\n' +
            '\n' +
            '            Lorem ipsum dolor sit amet, consectetur adipisicing elit',
          date: 1618459322555,
          retweet: true,
          liked: false
        },
        {
          id: 2,
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi aut autem consequatur doloremque doloribus ducimus, eaque eum explicabo fugiat in ipsum iste nemo provident quo quos reprehenderit saepe voluptates.',
          date: 1618459352896,
          retweet: false,
          liked: true
        }
      ]
    }
  },
  filters: {
    relativeDate (value) {
      return formatDistance(value, new Date())
    }
  },
  methods: {
    addNewQweet () {
      const newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        retweet: false,
        liked: false
      }
      // this.qweets.unshift(newQweet)
      // Add a new document with a generated id.
      db.collection('qweets').add(newQweet)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
      this.newQweetContent = ''
    },
    deleteQweet (qweet) {
      db.collection('qweets').doc(qweet.id).delete().then(() => {
        console.log('Document successfully deleted!')
      }).catch((error) => {
        console.error('Error removing document: ', error)
      })
    },
    toggleLiked (qweet) {
      db.collection('qweets').doc(qweet.id).update({
        liked: !qweet.liked
      })
        .then(() => {
          console.log('Document successfully updated!')
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error)
        })
    }
  },
  // mounted () {
  //   db.collection('qweets').orderBy('date').onSnapshot((snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       const qweetChange = change.doc.data()
  //       qweetChange.id = change.doc.id
  //       if (change.type === 'added') {
  //         console.log('New qweet: ', qweetChange)
  //         this.qweets.unshift(qweetChange)
  //       }
  //       if (change.type === 'modified') {
  //         const index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
  //         // Object.assign copies/assigns properties from one or more source Objects to a target Object
  //         // In this case, we assign our local data, the Object (this.qweets) to qweetChange object to reflect changes to the UI (this.qweets) at the position Index
  //         Object.assign(this.qweets[index], qweetChange)
  //         console.log('Modified qweet: ', qweetChange)
  //       }
  //       if (change.type === 'removed') {
  //         console.log('Removed qweet: ', qweetChange)
  //         const index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
  //         this.qweets.splice(index, 1)
  //       }
  //     })
  //   })
  // },
  computed: {
    likedCount () {
      // return this.qweets.map(qweet => {
      //   qweet = this.qweet.liked === true ? qweet.liked.length : ''
      //   return qweet
      // })
      return this.qweets.filter(qweet => {
        // console.log('qweet', qweet)
        qweet.lable = qweet.liked === true ? 'liked' : 'no'
        // console.log('like count', qweet)
        return qweet
      })
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
