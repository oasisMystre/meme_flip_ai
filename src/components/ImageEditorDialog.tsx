import { forwardRef, useImperativeHandle, useState } from "react";
import { ImageEditorComponent } from "@syncfusion/ej2-react-image-editor";

import Dialog from "./Dialog";

export type ImageEditorDialogElement = {
  toggle: (state?: boolean) => void;
};

export default forwardRef<ImageEditorDialogElement>(function ImageEditorDialog(
  _props,
  ref
) {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    toggle(state) {
      setVisible(!visible ?? state);
    },
  }));

  return (
    <Dialog
      visible={visible}
      setVisible={setVisible}
    >
      <ImageEditorComponent  width="256" height="256"/>
    </Dialog>
  );
});
