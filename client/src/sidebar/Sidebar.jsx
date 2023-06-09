import Auth from '../utils/auth';

const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const sortedNotes = [...notes].sort((a, b) => b.lastModified - a.lastModified);
  console.log("INSIDESIDEBAR", sortedNotes);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
        <button onClick={Auth.logout}>Logout</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ _id, entryTitle, entryContent, createdAt }, i) => (
          <div
            className={`app-sidebar-note ${_id === activeNote && "active"}`}
            onClick={() => setActiveNote(_id)}
            key={_id}
          >
            <div className="sidebar-note-title">
              <strong>{entryTitle}</strong>
              <button onClick={(e) => onDeleteNote(_id)}>Delete</button>
            </div>

            <p>{entryContent && entryContent.substr(0, 100) + "..."}</p>
            <small className="note-meta">
              Last Modified{" "}
              {new Date(createdAt).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
