import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "../hooks/hook";
import { changeCategory } from "../_lib/features/gameSlice/gameSlice";

const categoriesArray = [
  {
    id: 1,
    name: "Animal",
  },
  {
    id: 2,
    name: "Food",
  },
];

function CategorySelect() {
  const dispatch = useAppDispatch();

  const handleSetCategory = (name: string) => {
    dispatch(changeCategory(name));
  };

  return (
    <Select
      onValueChange={handleSetCategory}
      defaultValue={categoriesArray[0].name}
    >
      <SelectTrigger className="w-[180px] h-14 font-bold ">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent className="font-bold">
        <SelectGroup>
          {categoriesArray.map((category) => {
            return (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default CategorySelect;
