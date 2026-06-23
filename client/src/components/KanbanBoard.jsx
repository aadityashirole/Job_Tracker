import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

const columns = [
  { id: "applied", label: "Applied", color: "#94A3B8" },
  { id: "shortlisted", label: "Shortlisted", color: "#f59e0b" },
  { id: "interview", label: "Interview", color: "#60A5FA" },
  { id: "offer", label: "Offer", color: "#00ED64" },
  { id: "rejected", label: "Rejected", color: "#EF4444" },
]

function KanbanBoard({
  jobs,
  onStatusUpdate,
  onDeleteJob
}) {
  function handleDragEnd(result) {
    if (!result.destination) return
    const jobId = result.draggableId
    const newStatus = result.destination.droppableId
    onStatusUpdate(jobId, newStatus)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "20px", alignItems: "flex-start" }}>
        {columns.map((column) => {
          const columnJobs = jobs.filter((job) => job.status === column.id)

          return (
            <div key={column.id} style={{ minWidth: "320px", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "14px", gap: "10px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: column.color }} />
                <span style={{ fontWeight: "700", fontSize: "14px", color: "#CBD5E1", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {column.label}
                </span>
                <span style={{ marginLeft: "auto", background: "rgba(255,255,255,0.08)", color: "#94A3B8", padding: "4px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: "600" }}>
                  {columnJobs.length}
                </span>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      minHeight: "450px",
                      background: snapshot.isDraggingOver ? "rgba(0,237,100,0.04)" : "rgba(15,23,42,0.4)",
                      border: snapshot.isDraggingOver ? "2px dashed #00ED64" : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "18px",
                      padding: "14px",
                      transition: "0.2s",
                    }}
                  >
                    {columnJobs.map((job, index) => (
                      <Draggable key={job.id} draggableId={job.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              background: "#111827",
                              border: "1px solid rgba(255,255,255,0.08)",
                              borderRadius: "16px",
                              padding: "16px",
                              marginBottom: "12px",
                              cursor: "grab",
                              boxShadow: snapshot.isDragging
                                ? "0 15px 35px rgba(0,0,0,0.4)"
                                : "0 2px 8px rgba(0,0,0,0.2)",
                              transition: "0.2s",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginBottom: "12px",
                              }}
                            >
                              <div style={{ display: "flex", gap: "10px" }}>
                                <div
                                  style={{
                                    width: "34px",
                                    height: "34px",
                                    borderRadius: "10px",
                                    background: "#00ED64",
                                    color: "#071018",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "700",
                                  }}
                                >
                                  {job.company_name?.charAt(0)}
                                </div>

                                <div>
                                  <h4
                                    style={{
                                      margin: 0,
                                      color: "#F8FAFC",
                                      fontSize: "15px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    {job.company_name}
                                  </h4>

                                  <p
                                    style={{
                                      margin: "6px 0 0",
                                      color: "#94A3B8",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {job.role_title}
                                  </p>
                                </div>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  gap: "6px"
                                }}
                              >
                                <button
                                  onClick={() =>
                                    window.location.href = `/edit-job/${job.id}`
                                  }
                                  style={{
                                    background: "rgba(96,165,250,0.12)",
                                    border: "1px solid rgba(96,165,250,0.25)",
                                    color: "#60A5FA",
                                    borderRadius: "8px",
                                    padding: "4px 8px",
                                    cursor: "pointer",
                                    fontSize: "12px"
                                  }}
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() => onDeleteJob(job.id)}
                                  style={{
                                    background: "rgba(239,68,68,0.12)",
                                    border: "1px solid rgba(239,68,68,0.25)",
                                    color: "#EF4444",
                                    borderRadius: "8px",
                                    padding: "4px 8px",
                                    cursor: "pointer",
                                    fontSize: "12px"
                                  }}
                                >
                                  ✕
                                </button>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "inline-block",
                                background: `${column.color}20`,
                                color: column.color,
                                padding: "5px 10px",
                                borderRadius: "999px",
                                fontSize: "11px",
                                fontWeight: "700",
                                marginBottom: "12px",
                              }}
                            >
                              {column.label}
                            </div>

                            <br />

                            {job.applied_date && (
                              <div
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  background: "rgba(255,255,255,0.05)",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                  borderRadius: "999px",
                                  padding: "6px 10px",
                                  fontSize: "12px",
                                  color: "#94A3B8",
                                }}
                              >
                                📅 {new Date(job.applied_date).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {columnJobs.length === 0 && (
                      <div
                        style={{
                          textAlign: "center",
                          color: "#64748B",
                          fontSize: "13px",
                          padding: "20px",
                        }}
                      >
                        No jobs here
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard