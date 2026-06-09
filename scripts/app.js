const interviewSections = [
  {
    title: "Abertura e contexto estratégico",
    focus: ["completo", "governanca", "futuro"],
    goal: "Alinhar a visão do C-level com a narrativa do Troféu ESG e entender o papel da liderança na transformação.",
    questions: [
      "Qual é a principal mensagem que você gostaria que o mercado associasse à {{company}} quando falamos de ESG?",
      "Que decisão estratégica recente melhor representa o compromisso da empresa com sustentabilidade, governança e impacto social?",
      "Como a pauta ESG aparece nas metas e nas conversas do board ou comitê executivo?",
      "Quais resultados de ESG você considera mais relevantes para serem destacados na entrevista?"
    ]
  },
  {
    title: "Governança e tomada de decisão",
    focus: ["completo", "governanca"],
    goal: "Mapear processos, controles e responsabilidades que dão credibilidade às iniciativas.",
    questions: [
      "Quem patrocina a agenda ESG no nível executivo e como as responsabilidades são distribuídas entre áreas?",
      "Quais indicadores são acompanhados periodicamente pela liderança para medir evolução ESG?",
      "Como riscos ambientais, sociais e de governança entram no planejamento corporativo?",
      "Existe algum caso em que uma decisão foi ajustada por causa de critérios ESG? O que aprendemos com isso?"
    ]
  },
  {
    title: "Impacto ambiental",
    focus: ["completo", "ambiental"],
    goal: "Coletar evidências objetivas sobre redução de impactos, eficiência operacional e inovação sustentável.",
    questions: [
      "Quais iniciativas ambientais tiveram maior impacto nos últimos 12 meses?",
      "Como a empresa mede consumo de recursos, emissões, resíduos ou eficiência energética?",
      "Que metas ambientais estão em andamento e qual é o prazo esperado para alcançá-las?",
      "Há parcerias, certificações ou auditorias que reforçam a credibilidade desses resultados?"
    ]
  },
  {
    title: "Pessoas, cultura e impacto social",
    focus: ["completo", "social"],
    goal: "Evidenciar ações relacionadas a colaboradores, diversidade, segurança, comunidade e cadeia de valor.",
    questions: [
      "Como a cultura da {{company}} incentiva práticas responsáveis no dia a dia dos times?",
      "Quais programas de diversidade, inclusão, saúde, segurança ou desenvolvimento merecem destaque?",
      "Que impactos positivos a empresa gerou nas comunidades, clientes, fornecedores ou parceiros?",
      "Como vocês escutam colaboradores e stakeholders para priorizar ações sociais?"
    ]
  },
  {
    title: "Inovação, diferenciais e provas",
    focus: ["completo", "ambiental", "social", "governanca"],
    goal: "Transformar respostas em narrativa forte, com exemplos, números e diferenciais competitivos.",
    questions: [
      "Qual iniciativa ESG vocês consideram mais inovadora ou diferenciada em relação ao mercado?",
      "Quais números, documentos, depoimentos ou evidências podemos usar para comprovar esse avanço?",
      "O que torna o case da {{company}} replicável, escalável ou inspirador para outras empresas?",
      "Se tivesse que escolher uma história real para representar essa jornada, qual seria?"
    ]
  },
  {
    title: "Fechamento e visão de futuro",
    focus: ["completo", "futuro"],
    goal: "Capturar compromissos futuros e uma fala final com tom institucional para o material do prêmio.",
    questions: [
      "Quais são as próximas prioridades ESG da {{company}} para os próximos 12 a 24 meses?",
      "Que legado a liderança quer deixar por meio dessa agenda?",
      "Qual mensagem final você deixaria para clientes, colaboradores e avaliadores do Troféu ESG?",
      "Há algum ponto essencial que Amanda costuma levantar nas reuniões e que ainda não cobrimos?"
    ]
  }
];

const meetingChecklist = [
  "Confirmar cargo, área e disponibilidade do executivo.",
  "Abrir explicando objetivo, tempo previsto e formato da entrevista.",
  "Pedir exemplos concretos, números e evidências sempre que possível.",
  "Registrar frases fortes que possam virar citação institucional.",
  "Validar próximos passos: materiais complementares, responsáveis e prazo de retorno."
];

const questionsContainer = document.querySelector("[data-questions]");
const checklistContainer = document.querySelector("[data-checklist]");
const totalQuestionsElement = document.querySelector("[data-total-questions]");
const totalSectionsElement = document.querySelector("[data-total-sections]");
const copyInterviewButton = document.querySelector("[data-copy-interview]");
const agendaForm = document.querySelector("[data-interview-form]");
const generatedAgenda = document.querySelector("[data-generated-agenda]");
const companyInput = document.querySelector('[name="company"]');

function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

function getCompanyName() {
  const company = companyInput.value.trim();

  return company || "empresa";
}

function personalizeText(text, companyName = getCompanyName()) {
  return text.replaceAll("{{company}}", companyName);
}

function createAnswerField(id, placeholder) {
  const label = createElement("label", "answer-field");
  const span = createElement("span", null, "Resposta");
  const textarea = createElement("textarea");

  textarea.id = id;
  textarea.name = id;
  textarea.rows = 4;
  textarea.placeholder = placeholder;

  label.append(span, textarea);

  return label;
}

function renderInterviewSections(companyName = getCompanyName()) {
  questionsContainer.replaceChildren();

  interviewSections.forEach((section, sectionIndex) => {
    const article = createElement("article", "question-card");
    const number = createElement("div", "card-number", String(sectionIndex + 1).padStart(2, "0"));
    const content = createElement("div");
    const eyebrow = createElement("p", "eyebrow", "Bloco de entrevista");
    const title = createElement("h2", null, section.title);
    const goal = createElement("p", "goal", section.goal);
    const list = createElement("ul");

    section.questions.forEach((question, questionIndex) => {
      const item = createElement("li");
      const questionText = createElement("p", "question-text", personalizeText(question, companyName));
      const answerField = createAnswerField(
        `resposta-${sectionIndex + 1}-${questionIndex + 1}`,
        "Digite aqui a resposta do executivo, evidências, números e responsáveis."
      );

      item.append(questionText, answerField);
      list.append(item);
    });

    content.append(eyebrow, title, goal, list);
    article.append(number, content);
    questionsContainer.append(article);
  });
}

function renderChecklist() {
  meetingChecklist.forEach((item) => {
    checklistContainer.append(createElement("li", null, item));
  });
}

function getTotalQuestions() {
  return interviewSections.reduce((total, section) => total + section.questions.length, 0);
}

function buildInterviewText(sections = interviewSections, companyName = getCompanyName()) {
  const header = `Roteiro de Entrevista C-Level | Troféu ESG | ${companyName}`;
  const blocks = sections.map((section, index) => {
    const questions = section.questions
      .map((question) => `  - ${personalizeText(question, companyName)}\n    Resposta:`)
      .join("\n");
    return `${index + 1}. ${section.title}\nObjetivo: ${section.goal}\n${questions}`;
  });

  return [header, ...blocks, "Checklist pré-reunião:", ...meetingChecklist.map((item) => `- ${item}`)].join("\n\n");
}

function filterSectionsByFocus(focus) {
  return interviewSections.filter((section) => section.focus.includes(focus));
}

async function copyInterview() {
  const text = buildInterviewText();

  if (!navigator.clipboard) {
    window.prompt("Copie o roteiro completo:", text);
    return;
  }

  await navigator.clipboard.writeText(text);
  copyInterviewButton.textContent = "Roteiro copiado";

  window.setTimeout(() => {
    copyInterviewButton.textContent = "Copiar roteiro completo";
  }, 2400);
}

function handleAgendaSubmit(event) {
  event.preventDefault();

  const formData = new FormData(agendaForm);
  const executive = String(formData.get("executive") || "C-level").trim() || "C-level";
  const company = String(formData.get("company") || "empresa").trim() || "empresa";
  const focus = formData.get("focus") || "completo";
  const selectedSections = filterSectionsByFocus(focus);
  const agendaQuestions = selectedSections.flatMap((section) => section.questions).slice(0, 8);

  renderInterviewSections(company);
  generatedAgenda.replaceChildren();

  const title = createElement("h3", null, `Pauta sugerida para ${executive} | ${company}`);
  const objective = createElement(
    "p",
    null,
    `Objetivo: coletar visão executiva, evidências e compromissos ESG da ${company} para o Troféu ESG.`
  );
  const subtitle = createElement("strong", null, "Perguntas prioritárias:");
  const list = createElement("ol", "generated-questions");
  const nextStep = createElement(
    "p",
    null,
    "Próximo passo: solicitar números, documentos e responsáveis por cada evidência citada."
  );

  agendaQuestions.forEach((question, index) => {
    const item = createElement("li");
    const questionText = createElement("p", "question-text", personalizeText(question, company));
    const answerField = createAnswerField(
      `pauta-resposta-${index + 1}`,
      "Digite a resposta prioritária, evidências e encaminhamentos."
    );

    item.append(questionText, answerField);
    list.append(item);
  });

  generatedAgenda.append(title, objective, subtitle, list, nextStep);
}

function handleCompanyInput() {
  renderInterviewSections();
}

renderInterviewSections();
renderChecklist();
totalQuestionsElement.textContent = String(getTotalQuestions());
totalSectionsElement.textContent = String(interviewSections.length);
copyInterviewButton.addEventListener("click", copyInterview);
agendaForm.addEventListener("submit", handleAgendaSubmit);
companyInput.addEventListener("input", handleCompanyInput);
