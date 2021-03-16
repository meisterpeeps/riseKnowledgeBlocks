import styled, { css } from "styled-components";

interface Selected{
    isSelected: boolean;
}

interface Submitted{
    isSubmitted: boolean;
}

type SubmitButton = Selected & Submitted;
  
export const Block = styled.div`
    display: flex;
    flex-direction: column;
    padding: 6.5rem 6rem 4rem;
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0.4rem 1.2rem 0.2rem rgb(0 0 0 / 5%);
    color: #313537;
    max-width: 76.2rem;
    font-family: 'Merriweather';
    margin-bottom: 20px;
`;

export const Card = styled.div`
    padding: 0;
    margin-bottom: 1.5rem;
    min-height: 0;
`;

export const Answer = styled.button<Submitted>`
    all: unset;
    cursor: ${props => props.isSubmitted ? 'initial' : 'pointer'};
    display: flex;
    height: 8rem;
    font-size: 1.5rem;
    align-items: center;
    position: relative;
    width: 100%;
    &:focus {
        background-color: #f7f7f8;
    }
`

export const AnswerBorder = styled.div<Submitted & Selected>`
    position: absolute;
    transition: width .45s .3s;
    height: 8rem;
    ${props => props.isSubmitted && props.isSelected
            ? css` width: 100%;`
            : css` width: 0;`
    }
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        border: 0 solid transparent;
        transition: opacity .25s,border .25s .25s,right .25s .25s;
        ${props => props.isSubmitted && props.isSelected
            ? css` border: 2px solid #707070; right: 0; opacity: 1;`
            : css` border: 0 solid transparent; right: -.2rem; opacity: 0;`
        }
    }
`

export const RadioContainer = styled.div`
    margin-right: 6rem;
    padding-left: 2rem;
`

export const Radio = styled.div`
    align-self: center;
    width: 2rem;
    height: 2rem;
    border: .1rem solid #8a8c8d;
    border-radius: 50%;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    svg {
        fill: #313537;
    }
`

export const Actions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const SubmitButton = styled.button<SubmitButton>`
    cursor: pointer;
    outline: none;
    padding-left: 1rem;
    padding-right: 1rem;
    width: 100%;
    min-width: 10rem;
    max-width: 17rem;
    font-weight: 700;
    letter-spacing: .04em;
    font-size: 1.2rem;
    color: #fff;
    border-radius: 2rem;
    height: 4rem; 
    padding-left: 1rem; 
    padding-right: 1rem;
    border: 2px solid transparent;
    ${props => props.isSelected
        ? css`background-color: #747a7e; cursor: pointer;`
        : css`background-color: silver; cursor: initial;`
    };
    ${props => props.isSubmitted
        ? css`
            opacity: 0; 
            outline: none;
            pointer-events: none;
            transition: opacity 2s;`
        : css`
            opacity: 1
            transition: background .3s,color .3s,opacity .3s;            
            `
            
    };
    &:hover {
        ${props => props.isSelected
            ? css`opacity: .8;`
            : css`opacity: 1;`
        };
    }
    &:focus {
        opacity: .8;
    }
`

export const SubmitButtonContainer = styled.div<Submitted>`
    min-width: 10rem;
    max-width: 17rem;
    width: 100%;
    opacity: 1;
    outline: none;
    ${props => props.isSubmitted
        ? css` height: 0; opacity: 0; transition: opacity .3s, height .3s .3s;`
        : css` height: 4rem; opacity: 1; transition: opacity .3s 1s, height .3s 1s;`
    }
`

export const EvaluationContainer = styled.div<Submitted>`
    transition: max-height 1s .3s linear;
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${props => props.isSubmitted 
        ? css` max-height: 100rem;` 
        : css` max-height: 0;`}
`

export const AnswerEvaluation = styled.div<Submitted>`
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
    width: 100%;
    align-items: center;
    background-color: #f8f8f8;
    transition: opacity .6s .6s;
    ${props => props.isSubmitted 
        ? css` opacity: 1;` 
        : css` opacity: 0;`}    
`

export const EvaluationRadio = styled.div<Submitted>`
    align-self: center;
    width: 6rem;
    height: 6rem;
    border: .2rem solid #8a8c8d;
    border-radius: 50%;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    transition: opacity .6s .9s, transform .6s .9s;
    svg {
        height: 1.5rem;
        width: 1.5rem;
        fill: #313537;
    }
    ${props => props.isSubmitted 
        ? css`opacity:1; transform: scale(1);`
        : css`opacity:0; transform: scale(1.1);`
    }
`

export const EvaluationText = styled.div<Submitted>`
    margin-top: .5rem;
    margin-bottom: 2rem;
    font-size: 1.2rem;
    font-weight: 700;
    transition: opacity .6s 1.05s, transform .6s 1.05s;
    ${props => props.isSubmitted 
        ? css`opacity:1; transform: scale(1);`
        : css`opacity:0; transform: scale(1.1);`
    }
`

export const FeedbackText = styled.div<Submitted>`
    font-weight: 300;
    font-size: 1.4rem;
    word-wrap: break-word;
    color: #707070;
    transition: opacity .6s 1.05s,transform .6s 1.05s;
    ${props => props.isSubmitted 
        ? css`opacity:1; transform: translateZ(0);`
        : css`opacity:0; transform: translate3d(0,2rem,0);`
    }
`

export const TakeAgainContainer = styled.button<Submitted>`
    all: unset;
    display: flex;
    flex-direction: column;
    max-width: 17rem;
    max-height: 5rem;
    align-items: center;
    font-size: 1rem;
    font-weight: 900;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
        color: #747a7e;
        svg {
           fill: #747a7e; 
        }   
    }
    ${props => props.isSubmitted 
        ? css` opacity: 1; transition: opacity .6s .9s;` 
        : css` opacity: 0; transition: opacity .6s;`} 
    & :first-child {
        margin-bottom: 1rem;
    } 
    svg {
        height: 2.2rem;
        transform: rotate(-90deg);
        fill: #313537;
    }
    &:focus {
        color: #747a7e;
        svg {
           fill: #747a7e; 
        }   
    }
`

export const QuestionText = styled.p `
    font-size: 1.7rem;
`

export const QuestionMedia = styled.div`
    img {
        height: auto;
        width: 100%;
        cursor: zoom-in;
    }
`

export const Answers = styled.div`
    margin: 1.5rem 0 1.5rem;
    padding: 1rem 0;
    border-top: 1px solid #eaeaeb;
`

export const RadioDot = styled.div<Selected>`
    width: .8rem;
    height: .8rem;
    background: rgba(49,53,55,.8);
    border-radius: 50%;
    transition: all .3s;
    ${props => props.isSelected
        ? css`opacity:  1; transform: scale(.9);`
        : css`opacity:  0; transform: scale(0);`
    };
`

export const MarkContainer = styled.div<Submitted>`
    transition: all .3s;
    ${props => props.isSubmitted
        ? css`opacity:  1; transform: scale(.9);`
        : css`opacity:  0; transform: scale(0);`
    };
    position: absolute;
    text-align: center;
`