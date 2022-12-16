import type {
  infer as zInfer} from "zod";
import {
  string as zString,
  object as zObject,
  array as zArray
} from "zod";

const JokeListItemSchema = zObject({
  id: zString(),
  name: zString(),
});

const JokeListSchema = zArray(JokeListItemSchema);

type JokeListItem = zInfer<typeof JokeListItemSchema>;
type JokeList = zInfer<typeof JokeListSchema>

export type { JokeListItem, JokeList };
export { JokeListItemSchema, JokeListSchema };
