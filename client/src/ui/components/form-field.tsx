export const FormField = (props: {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  value: string | number | undefined;
  onChange: (e: InputEvent & { currentTarget: HTMLInputElement }) => void;
}) => (
  <div>
    <label class='label-text' for={props.id}>
      {props.label}
    </label>
    <input
      id={props.id}
      type={props.type}
      class='input'
      placeholder={props.placeholder}
      required={props.required}
      value={props.value}
      onInput={props.onChange}
    />
  </div>
);
