import { Question, QuestionVariant, StudentProfile } from '../types';

/**
 * Resolves a question with its specified variation (different phrasing, numbers, or contexts).
 * Preserves the core Kurikulum Merdeka competency and Capaian Pembelajaran.
 */
export function getResolvedQuestion(baseQuestion: Question, variantIndex: number = 0): Question {
  if (!baseQuestion.variants || baseQuestion.variants.length === 0 || variantIndex === 0) {
    return {
      ...baseQuestion,
      currentVariantIndex: 0,
      isVaried: false
    };
  }

  // Wrap around variants length
  const resolvedIdx = (variantIndex - 1) % baseQuestion.variants.length;
  const variant: QuestionVariant = baseQuestion.variants[resolvedIdx];

  return {
    ...baseQuestion,
    stimulusTitle: variant.stimulusTitle || baseQuestion.stimulusTitle,
    stimulus: variant.stimulus || baseQuestion.stimulus,
    question: variant.question,
    options: variant.options,
    correctAnswer: variant.correctAnswer,
    explanation: variant.explanation,
    currentVariantIndex: resolvedIdx + 1,
    isVaried: true
  };
}

/**
 * Procedural variation generator for numerical/contextual questions
 * Useful if infinite variants are requested
 */
export function getNextVariant(question: Question, currentIdx: number = 0): Question {
  const nextIdx = currentIdx + 1;
  return getResolvedQuestion(question, nextIdx);
}

export interface PreparedQuestionsResult {
  questions: Question[];
  totalCandidateCount: number;
  unseenCount: number;
  variedCount: number;
  skippedCompletedCount: number;
  isAllCompletedFallback: boolean;
}

/**
 * Selects and prepares questions based on user's progress and anti-memorization variation settings.
 */
export function prepareQuestionsForQuiz(
  allQuestions: Question[],
  profile: StudentProfile,
  subjectId?: string,
  difficulty?: string
): PreparedQuestionsResult {
  // 1. Filter by Level
  let pool = allQuestions.filter((q) => q.level === profile.selectedLevel);

  // 2. Filter by Subject
  if (subjectId) {
    pool = pool.filter((q) => q.subject === subjectId);
  }

  // 3. Filter by Difficulty
  if (difficulty && difficulty !== 'all') {
    pool = pool.filter((q) => q.difficulty === difficulty);
  }

  const totalCandidateCount = pool.length;
  const completedSet = new Set(profile.completedQuestionIds || []);

  let finalQuestions: Question[] = [];
  let skippedCompletedCount = 0;
  let isAllCompletedFallback = false;

  // Check how many are unseen
  const unseenPool = pool.filter((q) => !completedSet.has(q.id));
  const unseenCount = unseenPool.length;

  if (profile.hideCompletedQuestions) {
    if (unseenPool.length > 0) {
      finalQuestions = unseenPool;
      skippedCompletedCount = totalCandidateCount - unseenPool.length;
    } else {
      // If user has already finished all questions in this category, don't leave them with an empty screen.
      // Instead, use all questions and automatically apply fresh contextual variations!
      finalQuestions = pool;
      isAllCompletedFallback = true;
    }
  } else {
    // If not hiding completed questions, prioritize unseen questions first, then completed ones
    const seenPool = pool.filter((q) => completedSet.has(q.id));
    finalQuestions = [...unseenPool, ...seenPool];
  }

  // Apply automatic variation to completed questions if autoVaryCompletedQuestions is enabled
  let variedCount = 0;
  const resolvedList = finalQuestions.map((q) => {
    const isCompleted = completedSet.has(q.id);
    const hasVariants = q.variants && q.variants.length > 0;

    if (hasVariants && (profile.autoVaryCompletedQuestions || isAllCompletedFallback)) {
      if (isCompleted || isAllCompletedFallback) {
        // Retrieve rotation index (default to 1 so they get a fresh context!)
        const storedIndex = profile.questionVariantIndices[q.id] || 1;
        const resolved = getResolvedQuestion(q, storedIndex);
        if (resolved.isVaried) {
          variedCount += 1;
        }
        return resolved;
      }
    }
    return getResolvedQuestion(q, 0);
  });

  return {
    questions: resolvedList,
    totalCandidateCount,
    unseenCount,
    variedCount,
    skippedCompletedCount,
    isAllCompletedFallback
  };
}
