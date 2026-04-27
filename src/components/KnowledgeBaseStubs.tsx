interface KnowledgeBaseStubsProps {
  id: string;
  title: string;
}

export function KnowledgeBaseStubs({ title }: KnowledgeBaseStubsProps) {
  const truncated = title.toUpperCase().slice(0, 22);
  return (
    <div className="kb-section">
      <div className="detail-rel-label">Knowledge entries</div>
      <div className="kb-row">
        <span className="kb-glyph">¶</span>
        <span><i>Notes —</i> add longer commentary, anecdotes, or your own synthesis here.</span>
      </div>
      <div className="kb-row">
        <span className="kb-glyph">⌘</span>
        <span><i>Primary sources —</i> link translated texts (e.g. Sima Qian, Records of the Grand Historian).</span>
      </div>
      <div className="kb-row">
        <span className="kb-glyph">◧</span>
        <span><i>Images —</i> attach maps, paintings, photographs, museum plates.</span>
      </div>
      <div className="kb-row">
        <span className="kb-glyph">↗</span>
        <span><i>External links —</i> Wikipedia, ChinaKnowledge, JSTOR articles, your own blog posts.</span>
      </div>
      <button className="kb-add" disabled>
        + ADD ENTRY TO {truncated}
      </button>
    </div>
  );
}
