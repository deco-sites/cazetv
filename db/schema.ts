// -- Esquema de Banco de Dados baseado no registro do Airtable
// -- Tabela principal de jogos/eventos

// CREATE TABLE eventos (
//   id VARCHAR(50) PRIMARY KEY, -- "recDFfoxCYfMlHJSw"

//   -- Informações do campeonato
//   nome_campeonato VARCHAR(255), -- "Bundesliga 2024/2025" (from "Competição (from Competição)")
//   logo_campeonato_url TEXT, -- URL do logo (from "Campeonato logo" -> url)
//   rodada_fase VARCHAR(100), -- "Rodada 10" (from "Rodada")

//   -- Informações do jogo
//   data_jogo DATETIME, -- "2025-08-22T18:30:00.000Z" (from "Início do Evento BRT")
//   data_jogo_formatada VARCHAR(50), -- "22/8/2025 15:30" (from "Data String")
//   horario_ko VARCHAR(10), -- "15:30" (from "Horário KO")

//   -- Times
//   time_mandante VARCHAR(255), -- "Bayern de Munique" (from "Time1")
//   time_visitante VARCHAR(255), -- "RB Leipzig" (from "Time2")
//   logo_mandante_url TEXT, -- URL do escudo (from "Escudos (from Mandante)" -> url)
//   logo_visitante_url TEXT, -- URL do escudo (from "Escudos (from Visitante)" -> url)

//   -- Links e recursos
//   url_ficha_jogo TEXT, -- "https://airtable.com/..." (from "URL Ficha do Jogo" -> url)
//   url_record TEXT, -- "https://airtable.com/..." (from "URL Record")
//   hero_art_url TEXT, -- "https://drive.google.com/..." (from "Hero Art no Drive")

//   -- Informações de transmissão
//   plataformas_nomes TEXT, -- "Youtube - CazéTV, Amazon Prime Video, Samsung - Fast, Disney, Sky+" (from "[LOOKUP] Plataformas" - array join)
//   detentor_plataforma VARCHAR(500), -- "CazéTV | Youtube - CazéTV, Amazon Prime Video, Samsung - Fast, Disney, Sky+" (from "Detentor X Plataforma")

//   -- Metadados
//   status VARCHAR(50), -- "Confirmado" (from "Status")
//   titulo_evento VARCHAR(500), -- "Ao Vivo: Bundesliga | Bayern de Munique X RB Leipzig" (from "Title (para usarmos no evento)")
//   descricao TEXT, -- "Curta Ao Vivo Bundesliga | Bayern de Munique X RB Leipzig" (from "Descrição")

//   created_time DATETIME, -- "2025-04-10T17:41:57.000Z" (from "Created time")
//   last_modified DATETIME -- "2025-08-04T21:12:39.000Z" (from "Last Modified Time (Automação)")
// );

// -- Tabela separada para plataformas (normalizada)
// CREATE TABLE plataformas (
//   id INT PRIMARY KEY AUTO_INCREMENT,
//   evento_id VARCHAR(50),
//   nome_plataforma VARCHAR(255),
//   url_plataforma TEXT, -- Este campo não está presente no JSON atual
//   FOREIGN KEY (evento_id) REFERENCES eventos(id)
// );

// -- Mapeamento dos campos do JSON para o banco:

// /*
// CAMPOS DISPONÍVEIS NO JSON:

// ✅ id: "recDFfoxCYfMlHJSw"
// ✅ logo_campeonato: "Campeonato logo" array -> [0].url
// ✅ nome_campeonato: "Competição (from Competição)" -> [0]
// ✅ rodada_fase: "Rodada"
// ✅ data_jogo: "Início do Evento BRT"
// ✅ horario: "Horário KO" ou "Data String"
// ✅ url_tabela: "URL Record" ou "URL Ficha do Jogo"
// ✅ plataformas: "[LOOKUP] Plataformas" (array) ou "Detentor X Plataforma"
// ❌ links_plataformas: NÃO DISPONÍVEL no JSON atual
// ✅ logos_equipes: "Escudos (from Mandante)" e "Escudos (from Visitante)"
// ✅ imagem_background: "Hero Art no Drive"

// CAMPOS EXTRAS INTERESSANTES:
// - "Match ID": identificação do jogo
// - "Cor Mandante" / "Cor Visitante": cores dos times
// - "Jogador Destaque": jogadores em destaque
// - "Rating": classificação indicativa
// - "Duration": duração do evento
// */

import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const eventos = sqliteTable("eventos", {
  id: text("id").primaryKey(),

  // -- Informações do campeonato
  nome_campeonato: text("nome_campeonato"),
  logo_campeonato_url: text("logo_campeonato_url"),
  rodada: text("rodada"),

  // -- Informações do jogo
  data_jogo: text("data_jogo"),
  data_jogo_formatada: text("data_jogo_formatada"),
  horario: text("horario"),
  data_finalizacao: text("data_finalizacao"),

  // -- Times
  nome_time_mandante: text("nome_time_mandante"),
  nome_time_visitante: text("nome_time_visitante"),
  logo_time_mandante_url: text("logo_time_mandante_url"),
  logo_time_visitante_url: text("logo_time_visitante_url"),

  // -- Links e recursos
  // url_ficha_jogo: text("url_ficha_jogo"),
  // url_record: text("url_record"),
  hero_art_url: text("hero_art_url"),

  // -- Informações de transmissão
  plataformas_nomes: text("plataformas_nomes"),
  // detentor_plataforma: text("detentor_plataforma"),

  // -- Metadados
  status: text("status"),
  titulo_evento: text("titulo_evento"),
  descricao: text("descricao"),

  // -- Metadados
  created_time: text("created_time"),
  last_modified: text("last_modified"),
});
