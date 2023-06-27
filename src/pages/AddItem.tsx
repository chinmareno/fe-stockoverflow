import Input from "@mui/material/Input";
import { Form } from "react-router-dom";
import { Button } from "@mui/material";

const AddItem = () => {
  //styles
  const form = "flex flex-col";
  const input = "my-9";
  return (
    <div>
      <Form method="post" className={form} action="/add-item">
        <Input
          name="color"
          placeholder="Warna"
          autoComplete="off"
          className={input}
          // required="true"
        />

        <Input
          name="length"
          placeholder="Panjang(M)"
          autoComplete="off"
          className={input}
          type="number"
          // required="true"
        />

        <Input
          name="quantity"
          placeholder="Jumlah"
          autoComplete="off"
          className={input}
          type="number"
          // required="true"
        />

        <Button type="submit">Enter</Button>
      </Form>
    </div>
  );
};

export const addItemAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = {
    color: formData.get("color"),
    length: formData.get("length"),
    quantity: formData.get("quantity"),
  };
  console.log(data);
};

export default AddItem;
