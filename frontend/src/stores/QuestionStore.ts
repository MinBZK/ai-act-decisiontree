import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', () => {
  const initialLabelsByCategoryNTB = `{
    "Soort toepassing": ["nader te bepalen"],
    "Open-source": ["nader te bepalen"],
    "Publicatiecategorie": ["nader te bepalen"],
    "Systeemrisico": ["nader te bepalen"],
    "Transparantieverplichtingen": ["nader te bepalen"],
    "Rol": ["nader te bepalen"]
  }`

  const initialAcceptedDisclaimer = sessionStorage.getItem('acceptedDisclaimer') ?? '0'
  const initialAnswers = JSON.parse(localStorage.getItem('answers') ?? '[]')
  const initialLabels = JSON.parse(localStorage.getItem('labels') ?? '{}')
  const initialLabelsByCategory = JSON.parse(localStorage.getItem('labelsbycategory') ?? initialLabelsByCategoryNTB)
  const initialQuestionId = localStorage.getItem('currentquestion') ?? '0'
  const initialConclusionId = localStorage.getItem('currentconclusion') ?? ''

  const AcceptedDisclaimer = ref(String(initialAcceptedDisclaimer))
  const QuestionId = ref<any>(initialQuestionId)
  const ConclusionId = ref(String(initialConclusionId))
  const answers = ref(initialAnswers)
  const labels = ref(initialLabels)
  const LabelsByCategory = ref(initialLabelsByCategory)

  function setQuestionId(id: string | null) {
    QuestionId.value = id
    localStorage.setItem('currentquestion', QuestionId.value)
  }

  function setConclusionId(id: string) {
    ConclusionId.value = id
    localStorage.setItem('currentconclusion', ConclusionId.value)
  }

  function getLabelsByCategory() {
    // TODO: Research whether this variable can be access directly through refs
    return LabelsByCategory.value
  }


  function getJsonLabels() {
    const label_dict = JSON.parse(localStorage.getItem('labels') ?? '{}')
    const label_list = Object.values(label_dict).map(String)
    return label_list
  }

  function addLabel(label: string, question_id: string) {
    if (!labels.value[question_id]) {
      labels.value[question_id] = []
    }
    labels.value[question_id].push(label)
    localStorage.setItem('labels', JSON.stringify(labels.value))
  }

  function addLabelByCategory(label: string, category: string | undefined) {
    if (category) {
      if (JSON.stringify(LabelsByCategory.value[category]) === JSON.stringify(['nader te bepalen'])) {
        LabelsByCategory.value[category] = []
      }
      LabelsByCategory.value[category].push(label)
      localStorage.setItem('labelsbycategory', JSON.stringify(LabelsByCategory.value))
    }
  }

  function updateLabelsAtConclusion() {
    /**
     * This function will change all the "nader te bepalen" labels to "niet van toepassing" when
     * the conclusion of the decision tree has been reached.
     */
    for (let key in LabelsByCategory.value) {
      if (JSON.stringify(LabelsByCategory.value[key]) === JSON.stringify(['nader te bepalen'])) {
        LabelsByCategory.value[key] = ['niet van toepassing']
      }
    }
    localStorage.setItem('labelsbycategory', JSON.stringify(LabelsByCategory.value))
  }

  function revertLabelsAtConclusion() {
    /**
     * This function will change all the "niet van toepassing" labels to "nader te bepalen" when
     * the back button has been clicked at the conclusion of the decision tree.
     */
    for (let key in LabelsByCategory.value) {
      if (JSON.stringify(LabelsByCategory.value[key]) === JSON.stringify(['niet van toepassing'])) {
        LabelsByCategory.value[key] = ['nader te bepalen']
      }
    }
    localStorage.setItem('labelsbycategory', JSON.stringify(LabelsByCategory.value))
  }

  function addAnswer(id: string) {
    answers.value.push(id)
    localStorage.setItem('answers', JSON.stringify(answers.value))
  }

  function revertAnswer(previousCategory: string) {
    QuestionId.value = answers.value[answers.value.length - 1]
    answers.value.pop()
    if (labels.value[QuestionId.value]) {
      const label: string = labels.value[QuestionId.value]
      LabelsByCategory.value[previousCategory].pop(label)
      if (LabelsByCategory.value[previousCategory].length === 0) {
        LabelsByCategory.value[previousCategory].push('nader te bepalen')
      }
      delete labels.value[QuestionId.value]
    }
    localStorage.setItem('answers', JSON.stringify(answers.value))
    localStorage.setItem('currentquestion', QuestionId.value)
    localStorage.setItem('labels', JSON.stringify(labels.value))
    localStorage.setItem('labelsbycategory', JSON.stringify(LabelsByCategory.value))
  }

  function reset() {
    answers.value = []
    QuestionId.value = '0'
    labels.value = {}
    LabelsByCategory.value = JSON.parse(initialLabelsByCategoryNTB)
    ConclusionId.value = ''
    localStorage.setItem('answers', JSON.stringify(answers.value))
    localStorage.setItem('currentquestion', QuestionId.value)
    localStorage.setItem('currentconclusion', ConclusionId.value)
    localStorage.setItem('labels', JSON.stringify(labels.value))
    localStorage.setItem('labelsbycategory', JSON.stringify(LabelsByCategory.value))
  }

  function acceptDisclaimer() {
    AcceptedDisclaimer.value = '1'
    sessionStorage.setItem('acceptedDisclaimer', '1')
  }

  return {
    AcceptedDisclaimer,
    initialLabelsByCategoryNTB,
    QuestionId,
    ConclusionId,
    answers,
    LabelsByCategory,
    getLabelsByCategory,
    setQuestionId,
    setConclusionId,
    addAnswer,
    getJsonLabels,
    addLabel,
    addLabelByCategory,
    updateLabelsAtConclusion,
    revertLabelsAtConclusion,
    revertAnswer,
    reset,
    acceptDisclaimer
  }
})
