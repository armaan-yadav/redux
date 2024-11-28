import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types/types";

export interface TodoInterface {
  todos: Todo[];
  something: string;
}

const initialState = {
  todos: [
    { id: 1, title: "React" },
    { id: 2, title: "Tanstack Query" },
    { id: 3, title: "Redux" },
  ],
  something: "I am something ",
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((e) => e.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const { id, title } = action.payload;
      state.todos.map((e) => {
        if (e.id == id) {
          e.title = title;
        }
      });
    },
  },
});

export const { addTodo, editTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
