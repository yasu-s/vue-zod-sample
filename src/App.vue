<script setup lang="ts">
import { reactive } from 'vue'
import { StateSchema, StateError } from './validation'

/** 入力Form */
const state = reactive({
  account: {
    id: 1,
    name: 'Goto',
    memos: ['memo1', 'memo2'],
    tasks: [{ id: 1, task: '' }],
  },
})

/** エラー状態 */
const errorState = reactive<StateError>({
  _errors: [],
})

/** バリデーション */
function validate() {
  const result = StateSchema.safeParse(state)
  console.log(result)

  if (result.success) {
    errorState._errors = []
  } else {
    const error = result.error.format()
    errorState.account = error.account
  }
}

/** メモ追加 */
function addMemo() {
  state.account.memos = [...state.account.memos, 'aaaa']
}

/** メモ削除 */
function removeMemo() {
  const memos = [...state.account.memos]
  memos.shift()
  state.account.memos = memos
}

/** issue追加 */
function addIssue() {
  const result = StateSchema.safeParse(state)
  if (!result.success) {
    result.error.addIssues([
      {
        code: 'custom',
        path: ['account'],
        message: 'account',
      },
      {
        code: 'custom',
        path: ['account', 'memos', 0],
        message: 'memos',
      },
      {
        code: 'custom',
        path: ['account', 'tasks', '0', 'task'],
        message: 'task',
      },
    ])
    const error = result.error.format()
    error.account?.memos?._errors
    console.log(error)
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
      <button @click="addMemo()">addMemo</button>
      <button @click="removeMemo()">removeMemo</button>
      <button @click="addIssue()">addIssue</button>
    </div>
  </div>
</template>

<style scoped>
.App__ErrorMessages {
  color: red;
}
</style>
