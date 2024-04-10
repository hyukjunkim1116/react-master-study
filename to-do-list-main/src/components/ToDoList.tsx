import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	Categories,
	categoryState,
	toDoSelector,
	toDoState,
	selectCategoryState
} from "../atoms";
import CreateToDo from "./CreateToDo";
import CreateCategory from "./CreateCategory";
import ToDo from "./ToDo";
import styled from "styled-components";
import { Helmet } from "react-helmet";


const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const Header = styled.h1`
margin-top:30px;
font-size:60px;
`
const Select = styled.select`
	margin-top:20px;
	height: 30px;
	width: 70px;
	border: none;
	border-radius: 5px;
	margin-right: 10px;
		option {
		text-align: center;
		}
`
const CreateCategoryWrapper = styled.div`

	input {
		margin-top:20px;
	height: 30px;
	border: none;
	border-radius: 5px;
	}
	button {
		margin-top:20px;
	height: 30px;
	border: none;
	border-radius: 5px;
	margin-left: 5px;
	}
`
const ToDoWrapper = styled.ul`
display:flex;
flex-direction: column;
justify-content:space-evenly;
align-items:center;
height: 100%;
margin-top: 10px;
`










function ToDoList() {
	const allToDos = useRecoilValue(toDoState);
	const [category, setCategory] = useRecoilState(categoryState);
	const toDos = useRecoilValue(toDoSelector)
	const selectCategories = useRecoilValue(selectCategoryState)
	const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
		setCategory(event.currentTarget.value as any);
	};
	useEffect(()=> {
		localStorage.setItem("TODOS",JSON.stringify(allToDos))
	},[allToDos])

	return (
		<>
		<Helmet><title>My To Dos</title></Helmet>
		<Wrapper>
			<Header>To Dos</Header>
			<Select value={category} onInput={onInput}>
				<option value={Categories.TO_DO}>할 일</option>
				<option value={Categories.DOING}>진행 중</option>
				<option value={Categories.DONE}>끝낸 일</option>
				{selectCategories?.map((category) => (
					<option key={category.id} value={category.text}>
						{category.text}
					</option>
				))}
			</Select>
			<CreateCategoryWrapper>
				<CreateCategory/>
				<CreateToDo />
			</CreateCategoryWrapper>
			<ToDoWrapper>
			{toDos?.map((toDo) => (
				<ToDo key={toDo.id} {...toDo} />
			))}
			</ToDoWrapper>
		</Wrapper>
		</>
	);
}

export default ToDoList;
