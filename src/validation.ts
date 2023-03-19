import { z } from 'zod'

function schemaForType<Type, Schema = z.ZodType<Partial<Type>>>(schema: Schema) {
  return schema
}

/** zod定義 - Task */
export const TaskSchema = schemaForType<{ task: string; id: number }>(
  z.object({
    task: z.string().min(1, '文字を入力してください'),
  }),
)

/** zod定義 - Task配列 */
export const TasksSchema = TaskSchema.array()

/** zod定義 - Memo配列 */
export const MemosSchema = z.string().array().max(2, 'メモの最大は2件です')

/** zod定義 - Account */
export const AccountSchema = z.object({
  name: z.string().trim().min(1, '文字を入力してください'),
  memos: MemosSchema,
  tasks: TasksSchema,
})

/** zod定義 - Account tasks除外 */
export const AccountWithoutTaskSchema = AccountSchema.omit({ tasks: true })

/** zod定義 - State */
export const StateSchema = z.object({
  account: AccountSchema,
})

/** エラー定義 - State */
export type StateError = z.inferFormattedError<typeof StateSchema>

/** エラー定義 - Account */
export type AccountError = z.inferFormattedError<typeof AccountSchema>

/** State仮定義 */
type CustomState = { id: number; memos: string[] }

/** Stateからエラー定義 */
export type CustomStateError = z.inferFormattedError<z.ZodType<CustomState>>
