import { omit } from "lodash";
import React from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

import InputPurity, { InputProps as InputPurityProps } from "./input";

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

type InputControlProps<T extends FieldValues> = ControllerProps<T> &
  InputPurityProps & {
    normalize?: (e: React.ChangeEvent<HTMLInputElement>) => string;
  };

function InputControl<T extends FieldValues>(props: InputControlProps<T>) {
  const rest = omit(
    props,
    "control",
    "rules",
    "defaultValue",
    "shouldUnregister",
    "name",
    "normalize"
  );
  return (
    <div className={`w-full ${props.wrapperClassName}`}>
      <Controller
        control={props.control}
        defaultValue={props.defaultValue}
        name={props.name}
        rules={props.rules}
        render={({ field, fieldState }) => {
          return (
            <div className={`relative h-full w-full `}>
              <InputPurity
                {...field}
                {...rest}
                onBlur={(e) => {
                  props.onBlur && props.onBlur(e);
                  field.onBlur();
                }}
                onChange={(e) => {
                  props.onChange && props.onChange(e);
                  const normalizeValue = props.normalize && props.normalize(e);
                  field.onChange(
                    props.normalize ? `${normalizeValue}` : e.target.value
                  );
                }}
                onKeyDown={(e) => {
                  props.onKeyDown && props.onKeyDown(e);
                }}
                value={props.value ?? field.value}
                error={fieldState.error?.message}
              />
            </div>
          );
        }}
      />
    </div>
  );
}

export default InputControl;
