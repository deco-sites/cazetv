import { AppContext } from "site/apps/site.ts";
import { eventos } from "site/db/schema.ts";
import { sql } from "drizzle-orm";

interface Props {
  records: Record<string, unknown>[];
}

export default async function action(
  props: Props,
  req: Request,
  ctx: AppContext,
) {
  if (!ctx.passPhrase) {
    console.error("Pass phrase not found");
    return new Response(
      JSON.stringify({
        success: false,
        error: "Pass phrase not found",
      }),
      { status: 500 },
    );
  }

  const headers = req.headers;
  if (headers.get("X-Pass-Phrase") !== ctx.passPhrase?.get()) {
    console.error("Invalid pass phrase");
    return new Response(
      JSON.stringify({
        success: false,
        error: "Invalid pass phrase",
      }),
      { status: 401 },
    );
  }

  try {
    const drizzle = await ctx.invoke.records.loaders.drizzle();

    // Deletar todas as linhas da tabela eventos
    // @ts-ignore - ignore
    await drizzle.run(sql`DELETE FROM eventos`);

    // Inserir novos registros
    for (const record of props.records) {
      // @ts-ignore - ignore
      // deno-lint-ignore no-explicit-any
      await drizzle.insert(eventos).values(record as any);
    }

    console.log("Data updated successfully");

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 },
    );
  }
}
