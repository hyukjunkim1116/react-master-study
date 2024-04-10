import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
import styled from "styled-components";


const Li = styled.li`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Button = styled.button`
  height: 30px;
	border: none;
	border-radius: 5px;
	margin-left: 5px;
`

const Span = styled.span`
  font-size: 30px;
  margin-right: 10px;
`

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldTodo = oldToDos[targetIndex]
      const newToDos = [...oldToDos]
      if ( name !=="deleteTodo") {
        const newTodo = {...oldTodo, category: name as IToDo["category"]}
        newToDos.splice(targetIndex,1,newTodo)
      }
      else {
        newToDos.splice(targetIndex,1);
      }
      return newToDos
    });
  };
  return (
    <Li>
      <Span>{text}</Span>
      {category !== Categories.DOING && (
        <Button name={Categories.DOING} onClick={onClick}>
          Doing
        </Button>
      )}
      {category !== Categories.TO_DO && (
        <Button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </Button>
      )}
      {category !== Categories.DONE && (
        <Button name={Categories.DONE} onClick={onClick}>
          Done
        </Button>
      )}
      
      <Button name="deleteTodo" onClick={onClick}>Delete Todo</Button>
    </Li>
  );
}

export default ToDo;
