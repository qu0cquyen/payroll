import { omit } from "lodash";
import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "#/utils/cn";

interface ControllerProps<T extends FieldValues> {
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  shouldUnregister?: boolean;
  name: FieldPath<T>;
}

type SelectControllerProps<T extends FieldValues> = ControllerProps<T> & {
  wrapperClassName?: string;
  className?: string;
  label: string;
  items: SelectControlItem[];
};

export type SelectControlItem = {
  name: string;
  value: string;
};

function SelectControl<T extends FieldValues>(props: SelectControllerProps<T>) {
  const rest = omit(
    props,
    "control",
    "rules",
    "defaultValue",
    "shouldUnregister",
    "name"
  );

  return (
    <div className={cn("w-full", props.wrapperClassName)}>
      <Controller
        control={props.control}
        name={props.name}
        defaultValue={props.defaultValue}
        rules={props.rules}
        render={({ field, fieldState }) => {
          return (
            <Select
              {...rest}
              onValueChange={field.onChange}
              name={field.name ?? props.name}
              defaultValue={field.value ?? props.defaultValue}
            >
              <SelectTrigger>
                <SelectValue placeholder={field.value ?? props.defaultValue} />
              </SelectTrigger>
              <SelectContent className={props.className}>
                {props.items.map((item, index) => {
                  return (
                    <SelectItem key={index} value={item.value}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          );
        }}
      />
    </div>
  );
}

export default SelectControl;
