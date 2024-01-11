import { Button } from "#/components/ui/button";
import { Form, FormControl, FormField } from "#/components/ui/form";
import InputControl from "#/components/ui/input-control";
import SelectControl from "#/components/ui/select-control";
import useDialogState from "../_states/use-dialog-state";

const payments = [
  {
    name: "Cash",
    value: "Cash",
  },
  {
    name: "Card",
    value: "Card",
  },
];

interface AddServiceRecordProps {
  onClick?: () => void;
}

const AddServiceRecord = (props: AddServiceRecordProps) => {
  const { form, onSubmit } = useDialogState();

  const { handleSubmit } = form;

  return (
    <div className="flex flex-col ">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Customer name: </p>
          <InputControl control={form.control} name={"customer_name"} />

          <p>Service: </p>
          <InputControl control={form.control} name={"service"} />

          <div className="flex justify-between gap-2">
            <div className="w-1/2">
              <p>Amount: </p>
              <InputControl
                className="h-fit py-[7px]"
                control={form.control}
                name={"amount"}
                type="number"
              />
            </div>
            <div className="w-1/2">
              <p>Type: </p>
              <SelectControl
                control={form.control}
                className="bg-white"
                name={"payment_type"}
                label={"Type"}
                items={payments}
              />
            </div>
          </div>

          <p>Tip: </p>
          <InputControl control={form.control} name={"tip"} type="number" />

          <Button
            type="submit"
            name="Add"
            className="w-full"
            disable={!form.formState.isValid ? "default" : null}
            onClick={() => {
              props.onClick && props.onClick();
            }}
          >
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddServiceRecord;
