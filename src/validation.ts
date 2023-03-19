import { z } from 'zod'

/** zod定義 - Memo */
export const MemoArraySchema = z.string().array().max(1)

/** zod定義 - Account */
export const AccountSchema = z.object({
  name: z.string().trim().min(1, '文字を入力してください'),
  memos: MemoArraySchema,
})

/** zod定義 - State */
export const StateSchema = z.object({
  account: AccountSchema,
})

/** エラー定義 - State */
export type StateError = z.inferFormattedError<typeof StateSchema>
