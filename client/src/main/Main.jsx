import ReactMarkdown from "react-markdown";
import Auth from '../utils/auth';

const Main = ({ activeNote, onUpdateNote }) => {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

 if (!activeNote) return <div className="no-active-note">No Active Note</div>;
 
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text" 
          id="title"
          placeholder="Note Title"
          value={activeNote.entryTitle}
          onChange={(e) => onEditField("entryTitle", e.target.value)}
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.entryContent}
          onChange={(e) => onEditField("entryContent", e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.entryTitle}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.entryContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
