# skill-master-scene

> Knowledge engine para formatação, validação, lint e conversão de roteiros
> no padrão **Master Scene** (a.k.a. "spec format" / formato padrão de
> roteiro cinematográfico), pronto para ser usado como *skill* por um
> agente de IA.

[![License: GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](LICENSE.md)
![version](https://img.shields.io/badge/version-1.0.0-informational)

Este pacote **não é um roteiro** — é uma base de conhecimento estruturada
(YAML + Markdown + scripts JS sem dependências) que ensina um agente a:

- formatar um roteiro no padrão Master Scene;
- validar geometria de página, gramática de elementos e regras de quebra
  de página;
- fazer lint de estilo (parágrafos longos, "wrylies", excesso de "WE SEE");
- converter entre texto puro, [Fountain](https://fountain.io) e (como alvo
  documentado) `.fdx`;
- estimar duração de tela a partir da contagem de páginas;
- reconhecer perfis culturais/de mercado (EUA, Reino Unido, Brasil, Índia,
  Japão, drama de áudio, quadrinhos) e arquétipos de escritor/diretor.

## Sumário

- [O que é "Master Scene"](#o-que-é-master-scene)
- [Estrutura do pacote](#estrutura-do-pacote)
- [Os 3 módulos](#os-3-módulos)
- [Como usar](#como-usar)
- [Perfis culturais/de mercado](#perfis-culturaisde-mercado)
- [Arquétipos de escritor/diretor](#arquétipos-de-escritordiretor)
- [Severidade das regras](#severidade-das-regras)
- [Scripts](#scripts)
- [Limites e avisos de verificação](#limites-e-avisos-de-verificação)
- [Licença e referências](#licença-e-referências)

## O que é "Master Scene"

Master Scene (ou "standard/spec format") é o layout padrão internacional
de roteiros, batizado a partir do **cabeçalho de cena mestra** (slugline)
que abre cada cena. É uma gramática estrita de tipos de elemento e
posições de página, calibrada para que **1 página ≈ 1 minuto** de tela.

Ground truth completo em:
- `references/01-element-grammar.md`
- `references/02-page-geometry.md`
- `format-profile.yaml`

## Estrutura do pacote
