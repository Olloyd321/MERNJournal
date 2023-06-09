import ReactMarkdown from "react-markdown";
import {useState} from "react";
import Auth from '../utils/auth';

const Main = ({ activeNote, onUpdateNote }) => {
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  
  const onEditField = (field, value) => {
    onUpdateNote({
      activeNote,
      entryTitle: title,
      entryContent: content,
      lastModified: Date.now(),
    });
  };

 // console.log("activenote",activeNote.entryTitle);

 if (!activeNote) return <div className="no-active-note">No Active Note</div>;
 
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text" 
          id="title"
          placeholder="Note Title"
          value={activeNote.entryTitle || title}
          //ref={titleRef}
          onChange={(e) => {
            
            setTitle(e.target.value)
            //onEditField("entryTitle", e.target.value)
          }}
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.entryContent || content}

          onChange={(e) => setContent(e.target.value)}
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
