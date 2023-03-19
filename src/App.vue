<script setup lang="ts">
import { reactive } from 'vue'
import { StateSchema, StateError } from './validation'

/** 入力Form */
const state = reactive({
  account: {
    id: 1,
    name: 'Goto',
    memos: ['memo1', 'memo2'],
  },
})

const errorState = reactive<StateError>({
  _errors: [],
})

/** バリデーション */
function validate() {
  const result = StateSchema.safeParse(state)

  if (result.success) {
    errorState._errors = []
  } else {
    const error = result.error.format()
    errorState.account = error.account
    console.log(result.error)
  }
}
</script>

<template>
  <div class="App">
    <div class="App__Form">
      <input v-model="state.account.name" type="text" />
      <div>
        <template v-for="(item, index) of state.account.memos" :key="index">
          <span>{{ item }}</span>
        </template>
      </div>
      <div class="App__ErrorMessages">
        <template v-for="(item, index) of errorState.account?.name?._errors" :key="index">
          <span>{{ item }}</span>
        </template>
      </div>
    </div>
    <div class="App__ButtonPanel">
      <button @click="validate()">validate</button>
    </div>
  </div>
</template>

<style scoped>
.App__ErrorMessages {
  color: red;
}
</style>
