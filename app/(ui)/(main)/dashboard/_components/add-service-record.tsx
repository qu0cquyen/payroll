import { Button } from "#/components/ui/button";
import { Form } from "#/components/ui/form";
import InputControl from "#/components/ui/input-control";
import useDialogState from "../_states/use-dialog-state";

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

          <p>Amount: </p>
          <InputControl control={form.control} name={"amount"} type="number" />

          <p>Tip: </p>
          <InputControl control={form.control} name={"tip"} type="number" />

          <Button
            type="submit"
            name="Add"
            className="w-full"
            onClick={() => {
              props.onClick && props.onClick();
              form.reset();
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
