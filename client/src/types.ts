export interface KnowledgeBlockState { 
    answerState: AnswerState;
    isSubmitted: boolean
}

export interface KnowledgeBlock {
    id: number;
    userState: KnowledgeBlockState;
    question: {
      text: string;
      media: {
        type: string;
        url: string;
      };
    };
    answers: {
      text: string;
      isCorrect: boolean;
    }[];
    feedback: string;
}

export interface KnowledgeBlockUpdate {
    id: number;
    userState: KnowledgeBlockState;
}

export type KnowledgeCheckBlocks = KnowledgeBlock[];

export interface AnswerState {
    [answer: string] : boolean;
}