import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Todo } from "../types/types";
import { addTodo, editTodo, removeTodo } from "../features/todos/todoSlice";
const TodoComponent = () => {
  const { todos } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const [input, setInput] = useState<string>("");

  const [currentTodo, setCurrentTodo] = useState<Todo | undefined>();
  const generatRandomNumber = (): number => {
    return Math.floor(Math.random() * 10000000);
  };
  const handleAddTodo = () => {
    if (input == "") {
      return;
    }
    const todooo: Todo = {
      id: generatRandomNumber(),
      title: input,
    };

    dispatch(addTodo(todooo));
    setInput("");
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleEditTodo = () => {
    dispatch(editTodo(currentTodo!));
    setCurrentTodo(undefined);
  };

  return (
    <div>
      {todos.map((e) => {
        return (
          <div key={e.id}>
            <span>{e.title}</span>
            <button onClick={() => handleRemoveTodo(e.id)}>Remove</button>
            <button
              onClick={() => {
                setCurrentTodo(e);
              }}
            >
              Edit
            </button>
          </div>
        );
      })}

      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button type="button" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      {currentTodo && (
        <div>
          <input
            type="text"
            value={currentTodo.title}
            onChange={(e) => {
              setCurrentTodo({ ...currentTodo, title: e.target.value });
            }}
          />
          <button type="button" onClick={handleEditTodo}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoComponent;
