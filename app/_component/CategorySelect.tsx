import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { changeCategory } from "../_lib/features/gameSlice/gameSlice";
import { ListIcon } from "lucide-react";

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
  const { timeStarter } = useAppSelector((state) => state.gameState);

  const handleSetCategory = (name: string) => {
    dispatch(changeCategory(name));
  };

  return (
    <div className="flex flex-row items-center justify-center gap-x-5">
      <div className="text-lg font-bold flex flex-row gap-x-2 items-center">
        <ListIcon />
        <span>Category: </span>
      </div>
      <Select
        disabled={timeStarter}
        onValueChange={handleSetCategory}
        defaultValue={categoriesArray[0].name}
      >
        <SelectTrigger className="w-[180px] h-14 font-bold border-blackBlue">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent className="font-bold ">
          <SelectGroup>
            {categoriesArray.map((category) => {
              return (
                <SelectItem
                  className="h-12"
                  key={category.id}
                  value={category.name}
                >
                  {category.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
export default CategorySelect;
