import { useForm } from "react-hook-form";
import {useSetRecoilState } from "recoil";
import {selectCategoryState} from "../atoms";

interface ICategoryForm {
  Category: string;
}

function CreateCategory() {
    const setCategories=useSetRecoilState(selectCategoryState)
    const { register, handleSubmit, setValue } = useForm<ICategoryForm>();
    const handleValid = ({ Category }: ICategoryForm) => {
        setCategories((oldCategory) => [
        { text: Category,id:Date.now()},
        ...oldCategory,
        ]);
        // console.log(category)
        setValue("Category", "");
        
  };
  
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("Category", {
          required: "Please write a Category",
        })}
        placeholder="Write a Category"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;
