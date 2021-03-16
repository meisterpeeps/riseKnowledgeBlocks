import React from "react";
import ReactDOM from "react-dom";
import Helmet from "react-helmet";
import styled from "styled-components";
import './style/index.scss';
import { KnowledgeCheck } from './components/KnowledgeCheck';

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 100%;
  padding-top: 2.0rem;
`;

function Main() {
  return (
    <PageContainer>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rise Code Challenge</title>
      </Helmet>
      <KnowledgeCheck/>
    </PageContainer>
  );
}
ReactDOM.render(<Main />, document.getElementById("Root"));
