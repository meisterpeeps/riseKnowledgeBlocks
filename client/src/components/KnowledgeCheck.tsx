import React, { useEffect, useState } from "react";
import axios from "axios";
import { KnowledgeCheckBlock } from "./KnowledgeCheckBlock";
import { KnowledgeCheckBlocks } from "../types";


export function KnowledgeCheck() {
  const [
    knowledgeCheckBlocks,
    setKnowledgeCheckBlocks,
  ] = useState<KnowledgeCheckBlocks>([]);
  useEffect(() => {
    const getKnowledgeCheckBlocks = async () => {
      try {
        const knowledgeCheckBlocks = (await axios.get<KnowledgeCheckBlocks>("/knowledge-check-blocks")).data;
        setKnowledgeCheckBlocks(knowledgeCheckBlocks);
      } catch (e) {
        if (e) console.error(e);
      }
    };
    getKnowledgeCheckBlocks();
  }, [setKnowledgeCheckBlocks]);

  return (
      <>
        {knowledgeCheckBlocks.map((block) => <KnowledgeCheckBlock {...block} key={block.id} />)}
      </>
  )
}
