import { defineStore } from "pinia";
import api from "../services/api";
import { useAuthStore } from "./auth";

export const useBoards = defineStore("boards", {
  state() {
    return {
      boards: [
        {
          id: 0,
          name: "Platform Launch",
          columns: [
            {
              id: "col-1-todo-abc",
              name: "Todo",
              tasks: [
                {
                  title: "Build UI for onboarding flow",
                  description: "",
                  status: "Todo",
                  subtasks: [
                    {
                      title: "Sign up page",
                      isCompleted: true,
                    },
                    {
                      title: "Sign in page",
                      isCompleted: false,
                    },
                    {
                      title: "Welcome page",
                      isCompleted: false,
                    },
                  ],
                },
                {
                  title: "Build UI for search",
                  description: "",
                  status: "Todo",
                  subtasks: [
                    {
                      title: "Search page",
                      isCompleted: false,
                    },
                  ],
                },
                {
                  title: "Build settings UI",
                  description: "",
                  status: "Todo",
                  subtasks: [
                    {
                      title: "Account page",
                      isCompleted: false,
                    },
                    {
                      title: "Billing page",
                      isCompleted: false,
                    },
                  ],
                },
                {
                  title: "QA and test all major user journeys",
                  description:
                    "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
                  status: "Todo",
                  subtasks: [
                    {
                      title: "Internal testing",
                      isCompleted: false,
                    },
                    {
                      title: "External testing",
                      isCompleted: false,
                    },
                  ],
                },
              ],
            },
            {
              id: "col-1-doing-def",
              name: "Doing",
              tasks: [
                {
                  title: "Design settings and search pages",
                  description: "",
                  status: "Doing",
                  subtasks: [
                    {
                      title: "Settings - Account page",
                      isCompleted: true,
                    },
                    {
                      title: "Settings - Billing page",
                      isCompleted: true,
                    },
                    {
                      title: "Search page",
                      isCompleted: false,
                    },
                  ],
                },
                {
                  title: "Add account management endpoints",
                  description: "",
                  status: "Doing",
                  subtasks: [
                    {
                      title: "Upgrade plan",
                      isCompleted: true,
                    },
                    {
                      title: "Cancel plan",
                      isCompleted: true,
                    },
                    {
                      title: "Update payment method",
                      isCompleted: false,
                    },
                  ],
                },
                {
                  title: "Design onboarding flow",
                  description: "",
                  status: "Doing",
                  subtasks: [
                    {
                      title: "Sign up page",
                      isCompleted: true,
                    },
                    {
                      title: "Sign in page",
                      isCompleted: false,
                    },
                    {
                      title: "Welcome page",
                      isCompleted: false,
                    },
                  ],
                },
                {
                  title: "Add search enpoints",
                  description: "",
                  status: "Doing",
                  subtasks: [
                    {
                      title: "Add search endpoint",
                      isCompleted: true,
                    },
                    {
                      title: "Define search filters",
                      isCompleted: false,
                    },
                  ],
                },
                {
                  title: "Add authentication endpoints",
                  description: "",
                  status: "Doing",
                  subtasks: [
                    {
                      title: "Define user model",
                      isCompleted: true,
                    },
                    {
                      title: "Add auth endpoints",
                      isCompleted: false,
                    },
                  ],
                },
                {
                  title:
                    "Research pricing points of various competitors and trial different business models",
                  description:
                    "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                  status: "Doing",
                  subtasks: [
                    {
                      title: "Research competitor pricing and business models",
                      isCompleted: true,
                    },
                    {
                      title:
                        "Outline a business model that works for our solution",
                      isCompleted: false,
                    },
                    {
                      title:
                        "Talk to potential customers about our proposed solution and ask for fair price expectancy",
                      isCompleted: false,
                    },
                  ],
                },
              ],
            },
            {
              id: "col-1-done-ghi",
              name: "Done",
              tasks: [
                {
                  title: "Conduct 5 wireframe tests",
                  description:
                    "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
                  status: "Done",
                  subtasks: [
                    {
                      title: "Complete 5 wireframe prototype tests",
                      isCompleted: true,
                    },
                  ],
                },
                {
                  title: "Create wireframe prototype",
                  description:
                    "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
                  status: "Done",
                  subtasks: [
                    {
                      title: "Create clickable wireframe prototype in Balsamiq",
                      isCompleted: true,
                    },
                  ],
                },
                {
                  title: "Review results of usability tests and iterate",
                  description:
                    "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
                  status: "Done",
                  subtasks: [
                    {
                      title:
                        "Meet to review notes from previous tests and plan changes",
                      isCompleted: true,
                    },
                    {
                      title: "Make changes to paper prototypes",
                      isCompleted: true,
                    },
                    {
                      title: "Conduct 5 usability tests",
                      isCompleted: true,
                    },
                  ],
                },
                {
                  title:
                    "Create paper prototypes and conduct 10 usability tests with potential customers",
                  description: "",
                  status: "Done",
                  subtasks: [
                    {
                      title: "Create paper prototypes for version one",
                      isCompleted: true,
                    },
                    {
                      title: "Complete 10 usability tests",
                      isCompleted: true,
                    },
                  ],
                },
                {
                  title: "Market discovery",
                  description:
                    "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
                  status: "Done",
                  subtasks: [
                    {
                      title: "Interview 10 prospective customers",
                      isCompleted: true,
                    },
                  ],
                },
                {
                  title: "Competitor analysis",
                  description: "",
                  status: "Done",
                  subtasks: [
                    {
                      title: "Find direct and indirect competitors",
                      isCompleted: true,
                    },
                    {
                      title: "SWOT analysis for each competitor",
                      isCompleted: true,
                    },
                  ],
                },
                {
                  title: "Research the market",
                  description:
                    "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
                  status: "Done",
                  subtasks: [
                    {
                      title: "Write up research analysis",
                      isCompleted: true,
                    },
                    {
                      title: "Calculate TAM",
                      isCompleted: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 1,
          name: "Marketing Plan",
          columns: [
            {
              id: "col-2-todo-abc",
              name: "Todo",
              tasks: [
                {
                  title: "Plan Product Hunt launch",
                  description: "",
                  status: "Todo",
                  subtasks: [
                    {
                      title: "Find hunter",
                      isCompleted: false,
                    },
                    {
                      title: "Gather assets",
                      isCompleted: false,
                    },
                    {
                      title: "Draft product page",
                      isCompleted: false,
                    },
                    {
                      title: "Notify customers",
                      isCompleted: false,
                    },
                    {
                      title: "Notify network",
                      isCompleted: false,
                    },
                    {
                      title: "Launch!",
                      isCompleted: false,
                    },
                  ],
                },
                {
                  title: "Share on Show HN",
                  description: "",
                  status: "",
                  subtasks: [
                    {
                      title: "Draft out HN post",
                      isCompleted: false,
                    },
                    {
                      title: "Get feedback and refine",
                      isCompleted: false,
                    },
                    {
                      title: "Publish post",
                      isCompleted: false,
                    },
                  ],
                },
                {
                  title: "Write launch article to publish on multiple channels",
                  description: "",
                  status: "",
                  subtasks: [
                    {
                      title: "Write article",
                      isCompleted: false,
                    },
                    {
                      title: "Publish on LinkedIn",
                      isCompleted: false,
                    },
                    {
                      title: "Publish on Inndie Hackers",
                      isCompleted: false,
                    },
                    {
                      title: "Publish on Medium",
                      isCompleted: false,
                    },
                  ],
                },
              ],
            },
            {
              id: "col-2-doing-def",
              name: "Doing",
              tasks: [],
            },
            {
              id: "col-2-done-ghi",
              name: "Done",
              tasks: [],
            },
          ],
        },
        {
          id: 2,
          name: "Roadmap",
          columns: [
            {
              id: "col-now-abc",
              name: "Now",
              tasks: [
                {
                  title: "Launch version one",
                  description: "",
                  status: "",
                  subtasks: [
                    {
                      title: "Launch privately to our waitlist",
                      isCompleted: false,
                    },
                    {
                      title: "Launch publicly on PH, HN, etc.",
                      isCompleted: false,
                    },
                  ],
                },
                {
                  title:
                    "Review early feedback and plan next steps for roadmap",
                  description:
                    "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
                  status: "",
                  subtasks: [
                    {
                      title: "Interview 10 customers",
                      isCompleted: false,
                    },
                    {
                      title:
                        "Review common customer pain points and suggestions",
                      isCompleted: false,
                    },
                    {
                      title: "Outline next steps for our roadmap",
                      isCompleted: false,
                    },
                  ],
                },
              ],
            },
            {
              id: "col-next-def",
              name: "Next",
              tasks: [],
            },
            {
              id: "col-later-ghi",
              name: "Later",
              tasks: [],
            },
          ],
        },
      ],
    };
  },

  actions: {
    /**
     * Adds a new task to a specific board and column.
     * @param {number} boardId - The ID of the board to add the task to.
     * @param {object} newTaskData - The task object containing title, description, status, subtasks.
     */
    async addTask(boardId, newTaskData) {
      const board = this.boards.find((b) => b.id === boardId);
      const authStore = useAuthStore();

      if (board) {
        const column = board.columns.find(
          (col) => col.name === newTaskData.status
        );

        if (column) {
          // Extract column ID from the format "col-123"
          // Make sure we're getting a clean numeric ID
          const columnId = parseInt(column.id.replace("col-", ""));

          // Validate that we have a valid column ID
          if (isNaN(columnId)) {
            console.error("Invalid column ID format:", column.id);
            throw new Error(`Invalid column ID: ${column.id}`);
          }

          console.log(
            `Using column ID: ${columnId} from column with name: ${column.name}`
          );

          if (authStore.isAuthenticated) {
            try {
              console.group("Task Creation Process");
              console.log("Creating new task via API...");

              // Format task data for API
              const taskToCreate = {
                title: newTaskData.title,
                description: newTaskData.description || "",
                status: newTaskData.status,
                column: columnId, // API needs column ID
                subtasks: Array.isArray(newTaskData.subtasks)
                  ? newTaskData.subtasks.map((subtask) => ({
                      title: subtask.title,
                      is_completed: subtask.isCompleted || false, // Convert camelCase to snake_case
                    }))
                  : [],
              };

              console.log("Full task data:", newTaskData);
              console.log("Processed subtasks:", taskToCreate.subtasks);

              console.log("Sending task data to API:", taskToCreate);

              // Validate data before sending to API
              if (!columnId) {
                throw new Error("Column ID is required but missing");
              }

              // First create the task
              const response = await api.post("/tasks/", {
                title: taskToCreate.title,
                description: taskToCreate.description,
                status: taskToCreate.status,
                column: columnId,
              });

              console.log("API task response:", response.data);

              // Then create subtasks for the new task
              if (taskToCreate.subtasks && taskToCreate.subtasks.length > 0) {
                console.log(
                  `About to create ${taskToCreate.subtasks.length} subtasks for task ID ${response.data.id}`
                );

                for (const subtask of taskToCreate.subtasks) {
                  console.log(
                    `Creating subtask: title=${subtask.title}, is_completed=${subtask.is_completed}`
                  );

                  try {
                    // Ensure we're using the correct properties
                    // The key issue here: using snake_case for backend (is_completed) but camelCase from frontend (isCompleted)
                    const subtaskData = {
                      task: response.data.id,
                      title: subtask.title,
                      is_completed:
                        typeof subtask.isCompleted !== "undefined"
                          ? subtask.isCompleted
                          : subtask.is_completed,
                    };

                    console.log("Sending subtask data to API:", subtaskData);

                    const subtaskResponse = await api.post(
                      "/subtasks/",
                      subtaskData
                    );
                    console.log(
                      "Created subtask successfully:",
                      subtaskResponse.data
                    );
                  } catch (subtaskError) {
                    console.error("Error creating subtask:", subtaskError);
                    if (subtaskError.response) {
                      console.error(
                        "Subtask error data:",
                        subtaskError.response.data
                      );
                      console.error(
                        "Subtask error status:",
                        subtaskError.response.status
                      );
                    }
                  }
                }
                console.log("Finished creating all subtasks");
              } else {
                console.log("No subtasks to create");
              }

              // Refresh board data to get the complete structure with the new task
              await this.fetchUserBoards();

              console.log(
                `Task "${newTaskData.title}" added to board "${board.title}" via API.`
              );
              console.groupEnd();
            } catch (error) {
              console.error("Error creating task:", error);

              // Enhanced error handling
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);

                // Format the error message based on the response data
                let errorMessage = `Server error (${error.response.status})`;
                if (error.response.data) {
                  if (typeof error.response.data === "object") {
                    // Format object errors
                    errorMessage = Object.entries(error.response.data)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(", ");
                  } else if (typeof error.response.data === "string") {
                    errorMessage = error.response.data;
                  }
                }
                throw new Error(`Failed to create task: ${errorMessage}`);
              } else {
                throw new Error(`Failed to create task: ${error.message}`);
              }
            }
          } else {
            // Local task creation for non-authenticated users
            const taskId = Date.now(); // Simple unique ID generation for tasks
            column.tasks.push({
              id: taskId,
              title: newTaskData.title,
              description: newTaskData.description,
              status: newTaskData.status,
              subtasks: newTaskData.subtasks,
            });
            console.log(
              `Task "${newTaskData.title}" added locally to board "${board.name}" in column "${column.name}".`
            );
          }
        } else {
          console.warn(
            `Column "${newTaskData.status}" not found in board "${board.name}". Task not added.`
          );
          throw new Error(
            `Column "${newTaskData.status}" not found in board "${board.name}".`
          );
        }
      } else {
        console.warn(`Board with ID ${boardId} not found. Task not added.`);
        throw new Error(`Board with ID ${boardId} not found.`);
      }
    },

    /**
     * Deletes a board from the application state.
     * @param {number} boardId - The ID of the board to be deleted.
     */
    async deleteBoard(boardId) {
      const authStore = useAuthStore();

      if (authStore.isAuthenticated) {
        try {
          console.log(`Deleting board with ID ${boardId} via API...`);
          // Make API call to delete board
          await api.delete(`/boards/${boardId}/`);
          console.log(`Board with ID ${boardId} deleted from API.`);

          // Update local state after successful API call
          this.boards = this.boards.filter((board) => board.id !== boardId);
          console.log(`Board with ID ${boardId} removed from local state.`);
        } catch (error) {
          console.error(`Error deleting board with ID ${boardId}:`, error);
          if (error.response) {
            console.error("API error details:", error.response.data);
            console.error("Status code:", error.response.status);
            throw new Error(
              `Failed to delete board: ${
                error.response.status
              } ${JSON.stringify(error.response.data)}`
            );
          } else {
            throw new Error(`Failed to delete board: ${error.message}`);
          }
        }
      } else {
        // Handle local deletion for non-authenticated users
        const initialLength = this.boards.length;
        this.boards = this.boards.filter((board) => board.id !== boardId);

        if (this.boards.length < initialLength) {
          console.log(`Board with ID ${boardId} deleted locally.`);
        } else {
          console.warn(`Board with ID ${boardId} not found for deletion.`);
        }
      }
    },

    /**
     * Edits an existing board in the application state.
     * @param {object} updatedBoardData - The board object with updated properties (must contain 'id').
     */
    async editBoard(updatedBoardData) {
      const authStore = useAuthStore();
      const boardIndex = this.boards.findIndex(
        (b) => b.id === updatedBoardData.id
      );

      if (boardIndex === -1) {
        console.warn(
          `Board with ID ${updatedBoardData.id} not found for editing.`
        );
        return;
      }

      if (authStore.isAuthenticated) {
        try {
          console.log(
            `Updating board with ID ${updatedBoardData.id} via API...`
          );

          // Format the data for the API
          const boardToUpdate = {
            title: updatedBoardData.name,
            // For the API update, we only need the column names for now
            // The API will handle updating columns separately if needed
          };

          console.log("Sending board update to API:", boardToUpdate);

          // Update the board in the API
          await api.patch(`/boards/${updatedBoardData.id}/`, boardToUpdate);

          // Handle column updates - first get existing columns
          const existingColumns = this.boards[boardIndex].columns.map(
            (col) => ({
              id: col.id?.replace("col-", ""), // Extract ID
              name: col.name,
            })
          );

          // For each updated column
          for (const updatedColumn of updatedBoardData.columns) {
            const existingColumn = existingColumns.find(
              (col) => col.name === updatedColumn.name
            );

            if (existingColumn) {
              // Update existing column
              await api.patch(`/columns/${existingColumn.id}/`, {
                name: updatedColumn.name,
              });
            } else {
              // Create new column
              await api.post("/columns/", {
                name: updatedColumn.name,
                board: updatedBoardData.id,
                order: updatedBoardData.columns.indexOf(updatedColumn),
              });
            }
          }

          // Remove columns that no longer exist
          for (const existingCol of existingColumns) {
            const stillExists = updatedBoardData.columns.some(
              (col) => col.name === existingCol.name
            );
            if (!stillExists && existingCol.id) {
              // Delete column from API
              await api.delete(`/columns/${existingCol.id}/`);
            }
          }

          // Fetch fresh board data to ensure local state matches server state
          await this.fetchUserBoards();

          console.log(
            `Board "${updatedBoardData.name}" (ID: ${updatedBoardData.id}) updated via API.`
          );
        } catch (error) {
          console.error(
            `Error updating board with ID ${updatedBoardData.id}:`,
            error
          );
          if (error.response) {
            console.error("API error details:", error.response.data);
            console.error("Status code:", error.response.status);
            throw new Error(
              `Failed to update board: ${
                error.response.status
              } ${JSON.stringify(error.response.data)}`
            );
          } else {
            throw new Error(`Failed to update board: ${error.message}`);
          }
        }
      } else {
        // Local update for non-authenticated users
        Object.assign(this.boards[boardIndex], {
          name: updatedBoardData.name,
          columns: updatedBoardData.columns.map((col) => {
            // Find existing column to preserve tasks, or create new if not found
            const existingColumn = this.boards[boardIndex].columns.find(
              (eCol) => eCol.name === col.name
            );
            return {
              id: existingColumn
                ? existingColumn.id
                : `col-local-${Date.now()}-${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
              name: col.name,
              tasks: existingColumn ? existingColumn.tasks : [], // Preserve tasks if column existed, else empty
            };
          }),
        });
        console.log(
          `Board "${updatedBoardData.name}" (ID: ${updatedBoardData.id}) updated locally.`
        );
      }
    },

    /**
     * Adds a new board to the application state.
     * @param {object} newBoardData - The new board object containing name and columns.
     * Example: { name: 'New Board Name', columns: [{ name: 'Todo', tasks: [] }] }
     */
    async addBoard(newBoardData) {
      const authStore = useAuthStore();

      // Only attempt API creation if user is authenticated
      if (authStore.isAuthenticated) {
        try {
          console.log("Creating new board via API...");

          // Format the board data according to what the backend expects
          const boardToCreate = {
            title: newBoardData.name,
            // We only send column names initially
            columns: newBoardData.columns.map((col) => ({
              name: col.name,
            })),
          };

          console.log("Sending data to API:", boardToCreate);

          // Make API call to create board
          const response = await api.post("/boards/", boardToCreate);
          console.log("API response:", response.data);

          // Add the returned board (with server-generated ID) to the store
          if (response.data) {
            // Convert the API response to our frontend format
            const newBoard = {
              id: response.data.id,
              name: response.data.title,
              columns: Array.isArray(response.data.columns)
                ? response.data.columns.map((col) => ({
                    id: `col-${col.id}`,
                    name: col.name,
                    tasks: [],
                  }))
                : [],
            };

            console.log("Created new board:", newBoard);

            // Add the new board to our store
            this.boards.push(newBoard);
            return newBoard.id;
          } else {
            throw new Error("API returned no data");
          }
        } catch (error) {
          console.error("Error creating board:", error);

          // Show more detailed error information
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("API error response:", error.response.data);
            console.error("Status code:", error.response.status);

            // Throw the error instead of falling back to local creation
            throw new Error(
              `Failed to create board: ${
                error.response.status
              } ${JSON.stringify(error.response.data)}`
            );
          } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
            throw new Error("Failed to create board: No response from server");
          } else {
            // Something happened in setting up the request
            throw new Error(`Failed to create board: ${error.message}`);
          }
        }
      } else {
        console.log("User not authenticated, creating board locally only");

        // Local creation for unauthenticated users
        const newBoardId =
          this.boards.length > 0
            ? Math.max(...this.boards.map((b) => b.id)) + 1
            : 1;

        // Construct the full board object
        const boardToAdd = {
          id: newBoardId,
          name: newBoardData.name,
          columns: newBoardData.columns.map((col) => ({
            name: col.name,
            tasks: [],
          })),
        };

        // Add the new board to the store
        this.boards.push(boardToAdd);
        console.log(
          `New board "${boardToAdd.name}" (ID: ${boardToAdd.id}) added locally.`
        );
        return newBoardId;
      }
    },

    /**
     * Deletes a task from a specific board.
     * @param {number} boardId - The ID of the board containing the task.
     * @param {string} taskTitle - The title of the task to be deleted.
     */
    async deleteTask(boardId, taskTitle) {
      const authStore = useAuthStore();
      const board = this.boards.find((b) => b.id === boardId);

      if (!board) {
        console.warn(`Board with ID ${boardId} not found for task deletion.`);
        return;
      }

      // Find the task in the board
      let taskId = null;
      let columnWithTask = null;
      let taskIndex = -1;

      // Iterate through columns to find the task
      for (const column of board.columns) {
        const index = column.tasks.findIndex((t) => t.title === taskTitle);
        if (index !== -1) {
          taskId = column.tasks[index].id;
          columnWithTask = column;
          taskIndex = index;
          break;
        }
      }

      if (!taskId) {
        console.warn(`Task "${taskTitle}" not found in board ${boardId}.`);
        return;
      }

      if (authStore.isAuthenticated) {
        try {
          console.log(
            `Deleting task "${taskTitle}" (ID: ${taskId}) via API...`
          );

          // Make API call to delete task
          await api.delete(`/tasks/${taskId}/`);
          console.log(`Task "${taskTitle}" deleted from API.`);

          // Update local state after successful API call
          if (columnWithTask && taskIndex !== -1) {
            columnWithTask.tasks.splice(taskIndex, 1); // Remove the task from the array
            console.log(
              `Task "${taskTitle}" deleted from column "${columnWithTask.name}" in local state.`
            );
          }
        } catch (error) {
          console.error(`Error deleting task "${taskTitle}":`, error);
          if (error.response) {
            console.error("API error details:", error.response.data);
            console.error("Status code:", error.response.status);
            throw new Error(
              `Failed to delete task: ${error.response.status} ${JSON.stringify(
                error.response.data
              )}`
            );
          } else {
            throw new Error(`Failed to delete task: ${error.message}`);
          }
        }
      } else {
        // Local deletion for non-authenticated users
        if (columnWithTask && taskIndex !== -1) {
          columnWithTask.tasks.splice(taskIndex, 1); // Remove the task from the array
          console.log(
            `Task "${taskTitle}" deleted locally from column "${columnWithTask.name}" in board ${boardId}.`
          );
        }
      }

      if (!taskFoundAndDeleted) {
        console.warn(
          `Task "${taskTitle}" not found for deletion in board ${boardId}.`
        );
      }
    },

    /**
     * Edits an existing task within a board.
     * Updates task properties and moves the task to a different column if its status has changed.
     * @param {number} boardId - The ID of the board containing the task.
     * @param {string} originalTaskTitle - The original title of the task to be identified.
     * @param {object} updatedTask - The new task object with updated properties.
     */
    async editTask(boardId, originalTaskTitle, updatedTask) {
      const authStore = useAuthStore();
      const board = this.boards.find((b) => b.id === boardId);

      if (!board) {
        console.warn(`Board with ID ${boardId} not found.`);
        return;
      }

      let foundTask = null;
      let oldColumn = null;
      let oldTaskIndex = -1;
      let taskId = null;

      // 1. Find the task in its current column and store its reference and location
      for (const column of board.columns) {
        const taskIndex = column.tasks.findIndex(
          (t) => t.title === originalTaskTitle
        );
        if (taskIndex !== -1) {
          foundTask = column.tasks[taskIndex];
          taskId = foundTask.id;
          oldColumn = column;
          oldTaskIndex = taskIndex;
          break; // Task found, no need to check other columns
        }
      }

      if (!foundTask) {
        console.warn(
          `Task "${originalTaskTitle}" not found for editing in board ${boardId}.`
        );
        return;
      }

      // Check if we need to change columns
      const statusChanged = oldColumn.name !== updatedTask.status;

      if (authStore.isAuthenticated && taskId) {
        try {
          console.log(
            `Updating task "${originalTaskTitle}" (ID: ${taskId}) via API...`
          );

          // Find the new column if status changed
          let newColumnId = null;
          if (statusChanged) {
            const newColumn = board.columns.find(
              (col) => col.name === updatedTask.status
            );
            if (!newColumn) {
              console.warn(
                `New status column "${updatedTask.status}" not found.`
              );
              return;
            }
            newColumnId = newColumn.id.replace("col-", "");
          }

          // Build the update object
          const taskUpdate = {
            title: updatedTask.title,
            description: updatedTask.description || "",
            status: updatedTask.status,
          };

          // Include column ID if it changed
          if (statusChanged) {
            taskUpdate.column = newColumnId;
          }

          console.log("Sending task update to API:", taskUpdate);

          // Update task in API
          await api.patch(`/tasks/${taskId}/`, taskUpdate);

          // Handle subtasks - first get existing subtasks
          // For each updated subtask
          for (const updatedSubtask of updatedTask.subtasks) {
            // Find the existing subtask by title
            const existingSubtask = foundTask.subtasks.find(
              (s) => s.title === updatedSubtask.title
            );

            if (existingSubtask) {
              // Update existing subtask
              await api.patch(`/subtasks/${existingSubtask.id}/`, {
                title: updatedSubtask.title,
                is_completed: updatedSubtask.isCompleted,
              });
            } else {
              // Create new subtask
              await api.post("/subtasks/", {
                title: updatedSubtask.title,
                is_completed: updatedSubtask.isCompleted,
                task: taskId,
              });
            }
          }

          // Remove subtasks that no longer exist
          for (const existingSubtask of foundTask.subtasks) {
            const stillExists = updatedTask.subtasks.some(
              (s) => s.title === existingSubtask.title
            );
            if (!stillExists && existingSubtask.id) {
              await api.delete(`/subtasks/${existingSubtask.id}/`);
            }
          }

          // Fetch fresh data to ensure local state matches server state
          await this.fetchUserBoards();

          console.log(
            `Task "${originalTaskTitle}" updated via API to "${updatedTask.title}".`
          );
        } catch (error) {
          console.error(`Error updating task "${originalTaskTitle}":`, error);
          if (error.response) {
            console.error("API error details:", error.response.data);
            console.error("Status code:", error.response.status);
            throw new Error(
              `Failed to update task: ${error.response.status} ${JSON.stringify(
                error.response.data
              )}`
            );
          } else {
            throw new Error(`Failed to update task: ${error.message}`);
          }
        }
      } else {
        // Local update for non-authenticated users
        if (statusChanged) {
          // Remove the task from its old column
          oldColumn.tasks.splice(oldTaskIndex, 1);

          // Find the new column object
          const newColumn = board.columns.find(
            (col) => col.name === updatedTask.status
          );

          if (newColumn) {
            // Update all properties of the foundTask with the new data
            Object.assign(foundTask, updatedTask);
            // Add the updated task to the new column
            newColumn.tasks.push(foundTask);
            console.log(
              `Task "${originalTaskTitle}" moved locally from "${oldColumn.name}" to "${updatedTask.status}" and updated.`
            );
          } else {
            console.warn(
              `New status column "${updatedTask.status}" not found for task "${originalTaskTitle}". Reverting task position.`
            );
            // If the new column doesn't exist, put the task back in its old column
            oldColumn.tasks.splice(oldTaskIndex, 0, foundTask);
          }
        } else {
          // The task's status (column) has NOT changed, so just update its properties in place
          Object.assign(foundTask, updatedTask);
          console.log(
            `Task "${originalTaskTitle}" updated locally in place within "${oldColumn.name}".`
          );
        }
      }
    },

    async toggleSubtask(payload) {
      const authStore = useAuthStore();

      // 1. Find the specific board
      const board = this.boards.find((b) => b.id === payload.boardId);

      // If board not found, exit
      if (!board) {
        console.warn(`Board with ID ${payload.boardId} not found.`);
        return;
      }

      // 2. Iterate through columns to find the task
      let subtaskId = null;
      let foundSubtask = null;

      for (const column of board.columns) {
        const task = column.tasks.find((t) => t.title === payload.taskTitle);

        // If task is found in the current column
        if (task) {
          // 3. Find the specific subtask within that task
          const subtask = task.subtasks.find(
            (s) => s.title === payload.subtaskTitle
          );

          // If subtask is found
          if (subtask) {
            subtaskId = subtask.id;
            foundSubtask = subtask;
            break;
          }
        }
      }

      if (!foundSubtask) {
        console.warn(
          `Task "${payload.taskTitle}" or subtask "${payload.subtaskTitle}" not found in board ${payload.boardId}.`
        );
        return;
      }

      if (authStore.isAuthenticated && subtaskId) {
        try {
          console.log(
            `Updating subtask "${payload.subtaskTitle}" (ID: ${subtaskId}) via API...`
          );

          // Update subtask in API
          await api.patch(`/subtasks/${subtaskId}/`, {
            is_completed: payload.isCompleted,
          });

          console.log(
            `Subtask "${payload.subtaskTitle}" updated in API to ${payload.isCompleted}`
          );

          // Update local state
          foundSubtask.isCompleted = payload.isCompleted;
        } catch (error) {
          console.error(
            `Error updating subtask "${payload.subtaskTitle}":`,
            error
          );
          if (error.response) {
            console.error("API error details:", error.response.data);
            console.error("Status code:", error.response.status);
            throw new Error(
              `Failed to update subtask: ${
                error.response.status
              } ${JSON.stringify(error.response.data)}`
            );
          } else {
            throw new Error(`Failed to update subtask: ${error.message}`);
          }
        }
      } else {
        // Local update for non-authenticated users
        foundSubtask.isCompleted = payload.isCompleted;
        console.log(
          `Subtask "${payload.subtaskTitle}" for task "${payload.taskTitle}" in board ${payload.boardId} updated locally to ${payload.isCompleted}`
        );
      }
    },

    async updateTaskStatus(boardId, taskTitle, newStatus) {
      const authStore = useAuthStore();
      const board = this.boards.find((b) => b.id === boardId);
      if (!board) return;

      // Find the task in its current column and remove it
      let foundTask = null;
      let oldColumn = null;
      let taskId = null;

      for (const column of board.columns) {
        const taskIndex = column.tasks.findIndex((t) => t.title === taskTitle);
        if (taskIndex !== -1) {
          foundTask = column.tasks[taskIndex];
          taskId = foundTask.id;
          oldColumn = column;
          // IMPORTANT: Remove the task from its old column FIRST
          column.tasks.splice(taskIndex, 1);
          break; // Task found and removed, exit loop
        }
      }

      if (!foundTask) {
        console.warn(`Task "${taskTitle}" not found in board ${boardId}.`);
        return;
      }

      // Find the new column and add the task
      const newColumn = board.columns.find((col) => col.name === newStatus);
      if (!newColumn) {
        console.warn(
          `Column with status "${newStatus}" not found. Task "${taskTitle}" not moved.`
        );
        // Re-add task to old column if new column doesn't exist
        if (oldColumn && foundTask) {
          oldColumn.tasks.push(foundTask); // Put it back if no valid new column
        }
        return;
      }

      // Extract column ID from the format "col-123"
      const newColumnId = newColumn.id.replace("col-", "");

      if (authStore.isAuthenticated && taskId) {
        try {
          console.log(
            `Updating task status "${taskTitle}" (ID: ${taskId}) via API...`
          );

          // Update task in API
          await api.patch(`/tasks/${taskId}/`, {
            status: newStatus,
            column: newColumnId,
          });

          console.log(
            `Task "${taskTitle}" updated in API, new status: ${newStatus}`
          );

          // Update local state
          foundTask.status = newStatus; // Update the task's status property
          newColumn.tasks.push(foundTask); // Add the task to the new column
          console.log(
            `Task "${taskTitle}" moved from "${
              oldColumn ? oldColumn.name : "N/A"
            }" to "${newStatus}" in local state`
          );
        } catch (error) {
          console.error(`Error updating task "${taskTitle}" status:`, error);

          // If API call fails, revert local changes
          if (oldColumn) {
            oldColumn.tasks.push(foundTask);
          }

          if (error.response) {
            console.error("API error details:", error.response.data);
            console.error("Status code:", error.response.status);
            throw new Error(
              `Failed to update task status: ${
                error.response.status
              } ${JSON.stringify(error.response.data)}`
            );
          } else {
            throw new Error(`Failed to update task status: ${error.message}`);
          }
        }
      } else {
        // Local update for non-authenticated users
        foundTask.status = newStatus; // Update the task's status property
        newColumn.tasks.push(foundTask); // Add the task to the new column
        console.log(
          `Task "${taskTitle}" moved locally from "${
            oldColumn ? oldColumn.name : "N/A"
          }" to "${newStatus}"`
        );
      }
    },

    async fetchUserBoards() {
      const authStore = useAuthStore();

      // Only fetch if user is authenticated
      if (authStore.isAuthenticated) {
        try {
          console.log("Fetching user boards...");
          const response = await api.get("/boards/");
          console.log("API response:", response.data);

          // Check if we have board data
          if (response.data && Array.isArray(response.data)) {
            if (response.data.length > 0) {
              // Map backend board format to our frontend format
              const userBoards = response.data.map((board) => {
                return {
                  id: board.id,
                  name: board.title,
                  columns: Array.isArray(board.columns)
                    ? board.columns.map((col) => ({
                        id: `col-${col.id}`,
                        name: col.name,
                        tasks: Array.isArray(col.tasks)
                          ? col.tasks.map((task) => ({
                              title: task.title,
                              description: task.description || "",
                              status: task.status,
                              subtasks: Array.isArray(task.subtasks)
                                ? task.subtasks.map((subtask) => ({
                                    title: subtask.title,
                                    isCompleted: subtask.is_completed,
                                  }))
                                : [],
                            }))
                          : [],
                      }))
                    : [],
                };
              });

              console.log("Mapped user boards:", userBoards);
              // Replace the dummy boards with the user's boards
              this.boards = userBoards;
              return true;
            } else {
              console.log("No boards found for user, using empty array");
              // Set boards to an empty array when the user has no boards
              this.boards = [];
              return true;
            }
          } else {
            console.log("Invalid response format:", response.data);
            throw new Error("Invalid board data format received from API");
          }
        } catch (error) {
          console.error("Error fetching user boards:", error);

          // Provide more detailed error information
          if (error.response) {
            console.error("API error details:", error.response.data);
            console.error("Status code:", error.response.status);
            throw new Error(
              `Failed to fetch boards: ${
                error.response.status
              } ${JSON.stringify(error.response.data)}`
            );
          } else if (error.request) {
            console.error("No response received:", error.request);
            throw new Error("Failed to fetch boards: No response from server");
          } else {
            throw new Error(`Failed to fetch boards: ${error.message}`);
          }
        }
      } else {
        console.log("User not authenticated, using dummy boards");
      }
      // If not authenticated, just keep using the dummy data
      return false;
      return false;
    },
  },

  getters: {
    getBoards(state) {
      return state.boards;
    },
  },
});
