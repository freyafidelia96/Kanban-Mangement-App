import { defineStore } from "pinia";

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
    addTask(boardId, newTaskData) {
      const board = this.boards.find((b) => b.id === boardId);

      if (board) {
        const column = board.columns.find(
          (col) => col.name === newTaskData.status
        );

        if (column) {
          const taskId = Date.now(); // Simple unique ID generation for tasks
          column.tasks.push({
            id: taskId, // Add an ID to the task for future operations (edit, delete)
            title: newTaskData.title,
            description: newTaskData.description,
            status: newTaskData.status, // The column name
            subtasks: newTaskData.subtasks,
          });
          console.log(
            `Task "${newTaskData.title}" added to board "${board.name}" in column "${column.name}".`
          );
        } else {
          console.warn(
            `Column "${newTaskData.status}" not found in board "${board.name}". Task not added.`
          );
        }
      } else {
        console.warn(`Board with ID ${boardId} not found. Task not added.`);
      }
    },

    /**
     * Deletes a board from the application state.
     * @param {number} boardId - The ID of the board to be deleted.
     */
    deleteBoard(boardId) {
      const initialLength = this.boards.length;
      this.boards = this.boards.filter((board) => board.id !== boardId);

      if (this.boards.length < initialLength) {
        console.log(`Board with ID ${boardId} deleted.`);
      } else {
        console.warn(`Board with ID ${boardId} not found for deletion.`);
      }
    },

    /**
     * Edits an existing board in the application state.
     * @param {object} updatedBoardData - The board object with updated properties (must contain 'id').
     */
    editBoard(updatedBoardData) {
      const boardIndex = this.boards.findIndex(
        (b) => b.id === updatedBoardData.id
      );

      if (boardIndex !== -1) {
        // Update the board's properties in place
        // Object.assign is good for merging properties
        Object.assign(this.boards[boardIndex], {
          name: updatedBoardData.name,
          // Ensure columns are also updated. If column structure changes,
          // you might need more complex logic here (e.g., matching by name, handling new/removed tasks)
          // For now, we'll assume tasks within columns are preserved unless explicitly handled.
          columns: updatedBoardData.columns.map((col) => {
            // Find existing column to preserve tasks, or create new if not found
            const existingColumn = this.boards[boardIndex].columns.find(
              (eCol) => eCol.name === col.name
            );
            return {
              name: col.name,
              tasks: existingColumn ? existingColumn.tasks : [], // Preserve tasks if column existed, else empty
            };
          }),
        });
        console.log(
          `Board "${updatedBoardData.name}" (ID: ${updatedBoardData.id}) updated.`
        );
      } else {
        console.warn(
          `Board with ID ${updatedBoardData.id} not found for editing.`
        );
      }
    },

    /**
     * Adds a new board to the application state.
     * @param {object} newBoardData - The new board object containing name and columns.
     * Example: { name: 'New Board Name', columns: [{ name: 'Todo', tasks: [] }] }
     */
    addBoard(newBoardData) {
      // Generate a simple unique ID for the new board.
      // In a real app, this might come from a backend or a more robust ID generator.
      const newBoardId =
        this.boards.length > 0
          ? Math.max(...this.boards.map((b) => b.id)) + 1
          : 1; // If no boards, start with ID 1

      // Construct the full board object to be added
      const boardToAdd = {
        id: newBoardId,
        name: newBoardData.name,
        // Map over the columns to ensure each new column has an empty 'tasks' array
        columns: newBoardData.columns.map((col) => ({
          name: col.name,
          tasks: [],
        })),
      };

      // Add the new board to the 'boards' array in the store's state
      this.boards.push(boardToAdd);
      console.log(
        `New board "${boardToAdd.name}" (ID: ${boardToAdd.id}) added to store.`
      );

      // Optional: If you have a router, you might want to navigate to the new board
      // Example: this.router.push(`/board/${newBoardId}`);
    },

    /**
     * Deletes a task from a specific board.
     * @param {number} boardId - The ID of the board containing the task.
     * @param {string} taskTitle - The title of the task to be deleted.
     */
    deleteTask(boardId, taskTitle) {
      const board = this.boards.find((b) => b.id === boardId);
      if (!board) {
        console.warn(`Board with ID ${boardId} not found for task deletion.`);
        return;
      }

      let taskFoundAndDeleted = false;
      // Iterate through columns to find and delete the task
      for (const column of board.columns) {
        const taskIndex = column.tasks.findIndex((t) => t.title === taskTitle);
        if (taskIndex !== -1) {
          column.tasks.splice(taskIndex, 1); // Remove the task from the array
          taskFoundAndDeleted = true;
          console.log(
            `Task "${taskTitle}" deleted from column "${column.name}" in board ${boardId}.`
          );
          break; // Task found and deleted, exit loop
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
    editTask(boardId, originalTaskTitle, updatedTask) {
      const board = this.boards.find((b) => b.id === boardId);
      if (!board) {
        console.warn(`Board with ID ${boardId} not found.`);
        return;
      }

      let foundTask = null;
      let oldColumn = null;
      let oldTaskIndex = -1;

      // 1. Find the task in its current column and store its reference and location
      for (const column of board.columns) {
        const taskIndex = column.tasks.findIndex(
          (t) => t.title === originalTaskTitle
        );
        if (taskIndex !== -1) {
          foundTask = column.tasks[taskIndex];
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

      // 2. Check if the task's status (i.e., its column) has changed
      if (oldColumn.name !== updatedTask.status) {
        // The task needs to be moved to a a new column

        // Remove the task from its old column
        oldColumn.tasks.splice(oldTaskIndex, 1);

        // Find the new column object
        const newColumn = board.columns.find(
          (col) => col.name === updatedTask.status
        );

        if (newColumn) {
          // Update all properties of the foundTask with the new data
          // Object.assign safely merges properties from updatedTask into foundTask
          Object.assign(foundTask, updatedTask);
          // Add the updated task to the new column
          newColumn.tasks.push(foundTask);
          console.log(
            `Task "${originalTaskTitle}" moved from "${oldColumn.name}" to "${updatedTask.status}" and updated.`
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
          `Task "${originalTaskTitle}" updated in place within "${oldColumn.name}".`
        );
      }
    },

    toggleSubtask(payload) {
      // 1. Find the specific board
      const board = this.boards.find((b) => b.id === payload.boardId);

      // If board not found, exit
      if (!board) {
        console.warn(`Board with ID ${payload.boardId} not found.`);
        return;
      }

      // 2. Iterate through columns to find the task
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
            // 4. Update its isCompleted status
            subtask.isCompleted = payload.isCompleted;
            console.log(
              `Subtask "${payload.subtaskTitle}" for task "${payload.taskTitle}" in board ${payload.boardId} updated to ${payload.isCompleted}`
            );
            return; // Exit once found and updated
          }
        }
      }
      // If we reach here, either the task or subtask was not found
      console.warn(
        `Task "${payload.taskTitle}" or subtask "${payload.subtaskTitle}" not found in board ${payload.boardId}.`
      );
    },

    updateTaskStatus(boardId, taskTitle, newStatus) {
      const board = this.boards.find((b) => b.id === boardId);
      if (!board) return;

      // Find the task in its current column and remove it
      let foundTask = null;
      let oldColumn = null;
      for (const column of board.columns) {
        const taskIndex = column.tasks.findIndex((t) => t.title === taskTitle);
        if (taskIndex !== -1) {
          foundTask = column.tasks[taskIndex];
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
      if (newColumn) {
        foundTask.status = newStatus; // Update the task's status property
        newColumn.tasks.push(foundTask); // Add the task to the new column
        console.log(
          `Task "${taskTitle}" moved from "${
            oldColumn ? oldColumn.name : "N/A"
          }" to "${newStatus}"`
        );
      } else {
        console.warn(
          `Column with status "${newStatus}" not found. Task "${taskTitle}" not moved.`
        );
        // Optional: Re-add task to old column if new column doesn't exist, or handle error
        if (oldColumn && foundTask) {
          oldColumn.tasks.push(foundTask); // Put it back if no valid new column
        }
      }
    },
  },

  getters: {
    getBoards(state) {
      return state.boards;
    },
  },
});
