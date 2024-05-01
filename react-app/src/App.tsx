import { Heading } from "./libs/Heading";
import { Text } from "./libs/Text";
import { Button } from "./libs/Button";
import { Textarea } from "./libs/Textarea";

export const App = () => {
  return (
    <>
      <Text text="text"></Text>
      <Heading tag="h2">
        <span>見出し</span>
      </Heading>
      <Button
        onClick={() => console.log("clicked")}
        title="Button"
        type="primary"
        width={96}
      ></Button>
      <Button
        onClick={() => console.warn("clicked")}
        title="Button"
        type="secondary"
      ></Button>
      <Button
        onClick={() => console.error("clicked")}
        title="Button"
        type="error"
      ></Button>
      <Textarea width={600} maxLength={3} />
    </>
  );
};
