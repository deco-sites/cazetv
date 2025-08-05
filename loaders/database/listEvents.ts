import { gt, InferModelFromColumns } from "drizzle-orm";
import { AppContext } from "site/apps/site.ts";
import { eventos } from "site/db/schema.ts";

interface Props {
  date?: string;
}

// @ts-ignore - ignore
export type Event = InferModelFromColumns<typeof eventos>;

export default async function action(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const { date } = props;

  const drizzle = await ctx.invoke.records.loaders.drizzle();

  // @ts-ignore - ignore
  const query = drizzle.select().from(eventos);

  if (date) {
    // @ts-ignore - ignore
    query.where(gt(eventos.data_jogo, date));
  }

  // @ts-ignore - ignore
  const events = await query.orderBy(eventos.data_jogo);

  return {
    events: events as Event[],
  };
}

export const cache = "stale-while-revalidate";
export const cacheKey = (props: Props) => {
  return `events-${props.date}`;
};
