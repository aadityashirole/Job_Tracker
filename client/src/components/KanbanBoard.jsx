import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

const columns = [
  { id: "applied", label: "Applied", color: "#9ca3af" },
  { id: "shortlisted", label: "Shortlisted", color: "#f59e0b" },
  { id: "interview", label: "Interview", color: "#3b82f6" },
  { id: "offer", label: "Offer", color: "#22c55e" },
  { id: "rejected", label: "Rejected", color: "#ef4444" },
]

function KanbanBoard({ jobs, onStatusUpdate }) {

  function handleDragEnd(result) {
    if (!result.destination) return
    const jobId = result.draggableId
    const newStatus = result.destination.droppableId
    onStatusUpdate(jobId, newStatus)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "16px"}}>
        
        {columns.map(column => {
          const columnJobs = jobs.filter(job => job.status === column.id)
          
          return (
            <div key={column.id} style={{minWidth: "220px", flex: "1"}}>
              
              {/* Column Header */}
              <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px"}}>
                <div style={{width: "10px", height: "10px", borderRadius: "50%", backgroundColor: column.color}}></div>
                <span style={{color: "#9ca3af", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em"}}>{column.label}</span>
                <span style={{backgroundColor: "#1f2937", color: "#6b7280", fontSize: "11px", padding: "1px 7px", borderRadius: "10px", marginLeft: "auto"}}>{columnJobs.length}</span>
              </div>

              {/* Droppable Column */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      minHeight: "200px",
                      backgroundColor: snapshot.isDraggingOver ? "#1f2937" : "#0f172a",
                      borderRadius: "8px",
                      padding: "8px",
                      border: `1px solid ${snapshot.isDraggingOver ? "#374151" : "#1f2937"}`,
                      transition: "background-color 0.2s"
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
                              backgroundColor: snapshot.isDragging ? "#2d3748" : "#111827",
                              border: "1px solid #1f2937",
                              borderRadius: "8px",
                              padding: "12px",
                              marginBottom: "8px",
                              cursor: "grab",
                              boxShadow: snapshot.isDragging ? "0 4px 12px rgba(0,0,0,0.5)" : "none",
                              ...provided.draggableProps.style
                            }}
                          >
                            <p style={{fontWeight: "600", fontSize: "14px", margin: "0 0 4px 0", color: "white"}}>{job.company_name}</p>
                            <p style={{color: "#6b7280", fontSize: "12px", margin: 0}}>{job.role_title}</p>
                            {job.applied_date && (
                              <p style={{color: "#4b5563", fontSize: "11px", margin: "6px 0 0 0"}}>{job.applied_date}</p>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
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