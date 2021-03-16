import React, { useEffect, useState } from 'react';
import CheckMark from '../svg/checkmark.svg';
import XMark from '../svg/xmark.svg';
import Reload from '../svg/reload.svg';
import mediumZoom from '../util/mediumZoom';
import ImageZoom from './ImageZoom';
import {
  Block,
  Card,
  QuestionText,
  QuestionMedia,
  Answers,
  Answer,
  RadioContainer,
  Radio,
  RadioDot,
  MarkContainer,
  Actions,
  SubmitButton,
  AnswerEvaluation,
  TakeAgainContainer,
  SubmitButtonContainer,
  EvaluationText,
  EvaluationContainer,
  EvaluationRadio,
  FeedbackText,
  AnswerBorder,
} from '../styled/knowledgeCheckBlock.styles';
import { AnswerState, KnowledgeBlock, KnowledgeBlockUpdate } from '../types';
import axios from 'axios';

export const KnowledgeCheckBlock: React.FC<KnowledgeBlock> = (props) => {
    const { answers, feedback, id, question, userState } = props;

    // example: if not using persisted user data, function will return {'Cookies and coffee': false, 'Donuts and cider': false}
    const getInitialAnswerState = () => {
      const {answerState } = userState;      
      return answers.reduce((acc, answer) => {
        acc[answer.text] = answerState[answer.text] || false;        
        return acc;
      }, {} as AnswerState)
    }

    const [answerState, setAnswerState ] = useState<AnswerState>(getInitialAnswerState())
    const [isSubmitted, setSubmit ] = useState<boolean>(userState?.isSubmitted || false);
    const [isFirstRender, setFirstRender ] = useState<boolean>(true);

    // Used so submit button doesn't show as enabled after animation but before reset answer state
    const [isResetting, setResetting ] = useState<boolean>(false);

    const zoom = React.useRef(mediumZoom())

    useEffect(()=> {
      // Only post new user state after initial render
      if(isFirstRender){
        setFirstRender(false);
        return;
      }
      const postUserState = async () => {
        let status : number | null = null;
        try {
          status = (await axios.post<KnowledgeBlockUpdate>(
            '/knowledge-check-blocks',
            {id, userState: {answerState, isSubmitted}}
          )).status
        } catch(e) {
          if(e) {
            console.error('Userstate post request failure', e);
          }
        }
        console.log('Status', status);
      }
      postUserState();
    }, [answerState, isSubmitted, isFirstRender])    

    const getRadioState = (answer: string) => {
        if(!isSubmitted && answerState[answer]){
            return true
        }
        return false
    }

    // example: {'Cookies and Coffee': true, 'Donuts and cider': false} -> {'Cookies and Coffee': false, 'Donuts and cider': true}
    const updateAnswerState = (userSelection: string) => {
      const newAnswerState = answers.reduce((acc, answer) => {
        if(answer.text === userSelection){
          acc[answer.text] = true 
        } else {
          acc[answer.text] = false;
        }
        return acc;
      }, {} as AnswerState)
      setAnswerState(newAnswerState);
    }
    
    const submitAnswer = () => {
        if(!Object.values(answerState).includes(true)) return;
        setSubmit(true);
    }

    const checkAnswer = () => {
      const correctAnswer = answers.find((answer) => answer.isCorrect)?.text;
      if(correctAnswer){
        return answerState[correctAnswer];
      } 
      return false;
    }

    const takeAgain = (event: React.TransitionEvent<HTMLDivElement>) => {
      if((event?.target as HTMLElement)?.id === 'AnswerEvaluation' && !isSubmitted){
        const resetAnswers = answers.reduce((acc, answer) => {
          acc[answer.text] = false        
          return acc;
        }, {} as AnswerState)
        setAnswerState(resetAnswers);
        setResetting(false); 
      }
    }
    
    return (
      <Block aria-label={'Knowledge Check'}>
        <Card>
          <QuestionText>{question.text}</QuestionText>
          <QuestionMedia>
            <ImageZoom
              src={question.media.url}
              alt='Question Image'
              zoom={zoom.current}
              background='#fff'
            />
          </QuestionMedia>
          <Answers role='radiogroup'>
            {answers.map(({ text, isCorrect }) => (
              <Answer
                tabIndex={isSubmitted ? -1 : 1}
                role='radio'
                aria-checked={answerState[text]}
                aria-labelledby={`${id}${text}`}
                isSubmitted={isSubmitted}
                onClick={() => {
                  if (answerState[text] || isSubmitted) return;
                  updateAnswerState(text);
                }}
                key={text}
              >
                <AnswerBorder
                  isSubmitted={isSubmitted}
                  isSelected={answerState[text]}
                />
                <RadioContainer>
                  <Radio>
                    <RadioDot isSelected={getRadioState(text)} />
                  {isCorrect && <MarkContainer isSubmitted={isSubmitted}><CheckMark /></MarkContainer>}
                  {!isCorrect && <MarkContainer isSubmitted={isSubmitted}><XMark /></MarkContainer>}
                  </Radio>
                </RadioContainer>
                <div id={`${id}${text}`}>{text}</div>
              </Answer>
            ))}
          </Answers>
          <Actions>
            <SubmitButtonContainer isSubmitted={isSubmitted}>
              <SubmitButton
                tabIndex={!Object.values(answerState).includes(true) || isSubmitted || isResetting ? -1 : 1}
                isSelected={Object.values(answerState).includes(true) && !isResetting}
                isSubmitted={isSubmitted}
                onClick={submitAnswer}
              >
                SUBMIT
              </SubmitButton>
            </SubmitButtonContainer>
            <EvaluationContainer isSubmitted={isSubmitted}>
              <AnswerEvaluation id = 'AnswerEvaluation' isSubmitted={isSubmitted} onTransitionEnd = {takeAgain}>
                <EvaluationRadio isSubmitted={isSubmitted}>
                  {checkAnswer() ? <CheckMark /> : <XMark />}
                </EvaluationRadio>
                <EvaluationText isSubmitted={isSubmitted}>
                  {checkAnswer() ? 'Correct' : 'Incorrect'}
                </EvaluationText>
                <FeedbackText isSubmitted={isSubmitted}>
                  {feedback}
                </FeedbackText>
              </AnswerEvaluation>
              <TakeAgainContainer isSubmitted={isSubmitted} onClick={() => {
                setSubmit(false);
                setResetting(true);
              }}>
                <div>Take Again</div>
                <Reload />
              </TakeAgainContainer>
            </EvaluationContainer>
          </Actions>
        </Card>
      </Block>
    );
}