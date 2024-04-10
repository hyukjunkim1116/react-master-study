import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}
export interface ISelectCategory {
  text: string;
  id: number;
}
export const selectCategoryState = atom<ISelectCategory[]>({
  key: "selectCategory",
  default: [],
});
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  //로컬스토리지 저장
  default: JSON.parse(localStorage.getItem("TODOS")||"[]"),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
//주석처리#3
// export const categorySelector = selector({
//   key: "categorySelector",
//   get: ({ get }) => {
//     const categories = get(selectCategoryState);
//     return categories
//   },
// });
